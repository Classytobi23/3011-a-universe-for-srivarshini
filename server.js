import express from 'express';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'universe_srivarshini_3011_default_dev_secret_key';
const COOKIE_NAME = 'srivarshini_session';

app.use(express.json());
app.use(cookieParser());

// Rate limiter for authentication attempts (5 per minute)
const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many attempts. The cosmic gates have paused for 60 seconds.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper: Sign session token
function createToken(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

// Helper: Verify session token
function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [data, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');

  try {
    const isSigValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
    if (!isSigValid) return null;

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch (err) {
    return null;
  }
}

// Middleware: Check authentication
function requireAuth(req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  const session = verifyToken(token);
  if (!session) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Access restricted. Please unlock your universe.'
    });
  }
  req.user = session;
  next();
}

// Auth API: Login
app.post('/api/auth/login', loginLimiter, (req, res) => {
  const { password } = req.body;
  const expectedPassword = process.env.BIRTHDAY_PASSWORD || 'srivarshini3011';

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Password is required to enter.'
    });
  }

  // Safe timing comparison
  const passBuf = Buffer.from(password.trim());
  const expBuf = Buffer.from(expectedPassword.trim());
  const isMatch = passBuf.length === expBuf.length && crypto.timingSafeEqual(passBuf, expBuf);

  if (isMatch) {
    const token = createToken({
      sub: 'srivarshini',
      createdAt: Date.now(),
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    });

    return res.json({
      success: true,
      message: 'Welcome to your universe, Srivarshini.'
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'The constellations did not align. Incorrect password.'
    });
  }
});

// Auth API: Verify Status
app.get('/api/auth/verify', (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  const session = verifyToken(token);
  res.json({
    authenticated: Boolean(session),
    expiresAt: session ? session.exp : null
  });
});

// Auth API: Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Protect direct access to /memories directory
app.use('/memories', requireAuth, (req, res, next) => {
  next();
});

// Authenticated Media Streaming Endpoint
// Gating photos and music behind session authentication
const ALLOWED_MEDIA = {
  'image1.jpeg': { path: path.join(__dirname, 'public', 'memories', 'image1.jpeg'), type: 'image/jpeg' },
  'image2.jpeg': { path: path.join(__dirname, 'public', 'memories', 'image2.jpeg'), type: 'image/jpeg' },
  'image3.jpeg': { path: path.join(__dirname, 'public', 'memories', 'image3.jpeg'), type: 'image/jpeg' },
  'image4.jpeg': { path: path.join(__dirname, 'public', 'memories', 'image4.jpeg'), type: 'image/jpeg' },
  'image5.jpeg': { path: path.join(__dirname, 'public', 'memories', 'image5.jpeg'), type: 'image/jpeg' },
  'birthday.mpeg': { path: path.join(__dirname, 'birthday', 'birthday.mpeg'), type: 'audio/mpeg' },
  'me.jpeg': { path: path.join(__dirname, 'public', 'friendship', 'me.jpeg'), type: 'image/jpeg' },
  'me.jpg': { path: path.join(__dirname, 'public', 'friendship', 'me.jpeg'), type: 'image/jpeg' },
  'srivarshini.jpeg': { path: path.join(__dirname, 'public', 'friendship', 'srivarshini.jpeg'), type: 'image/jpeg' },
  'srivarshini.jpg': { path: path.join(__dirname, 'public', 'friendship', 'srivarshini.jpeg'), type: 'image/jpeg' },
};

app.get('/api/media/:filename', requireAuth, (req, res) => {
  const filename = req.params.filename;
  const media = ALLOWED_MEDIA[filename];

  if (!media) {
    console.log(`[Media Request] File not in ALLOWED_MEDIA: "${filename}". Keys:`, Object.keys(ALLOWED_MEDIA));
    return res.status(404).json({ error: 'Media file not found' });
  }

  const filePath = media.path;
  if (!fs.existsSync(filePath)) {
    console.log(`[Media Request] File path does not exist: "${filePath}"`);
    return res.status(404).json({ error: 'File missing from storage' });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  // Support HTTP range for smooth audio streaming & seeking
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
      return;
    }

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': media.type,
      'Cache-Control': 'private, max-age=86400'
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': media.type,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'private, max-age=86400'
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// Environment / Dev vs Prod static serving setup
export async function setupServer() {
  const isProduction = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist'));

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('🌌 Vite development server mounted with cosmic middleware');
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
    console.log('🌌 Serving optimized production build from dist/');
  }

  return new Promise((resolve) => {
    const server = app.listen(PORT, '127.0.0.1', () => {
      console.log(`✨ Srivarshini's Universe is alive at: http://127.0.0.1:${PORT}`);
      resolve({ app, server });
    });
  });
}

export { app, ALLOWED_MEDIA };

if (process.argv[1] && path.basename(process.argv[1]) === 'server.js') {
  setupServer().catch(err => {
    console.error('Failed to launch celestial server:', err);
  });
}

