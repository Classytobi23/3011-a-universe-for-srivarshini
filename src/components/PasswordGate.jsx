import React, { useState } from 'react';
import { Lock, Sparkles, Key, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import BIRTHDAY_CONFIG from '../config/birthday.config';

// Precomputed SHA-256 hashes of valid passwords (lowercase, trimmed)
// Prevents plaintext exposure in client source bundles while supporting static GitHub Pages hosting
const VALID_HASHES = new Set([
  '8f4e6743d688b4c35b97d0b638da679ec340a4cfd0c3baee5b1ea8f728cb1c46', // chocopie
  '7257c7be370890e172cd2f1f1ba8bd9aeb1f4753031b257bfb0cb7b05d78797c'  // srivarshini3011
]);

async function hashInput(str) {
  const enc = new TextEncoder();
  const data = enc.encode(str.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function PasswordGate({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      // 1. Try server-side authentication if backend exists
      let authenticated = false;
      let usedServer = false;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: password.trim() }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && data.success) {
            authenticated = true;
            usedServer = true;
          }
        } else if (response.status === 401) {
          // Explicit wrong password from server
          authenticated = false;
          usedServer = true;
        }
      } catch (serverErr) {
        // Server unreachable or static deployment (e.g. GitHub Pages)
        usedServer = false;
      }

      // 2. On static hosting (like GitHub Pages) or if server is unreachable,
      // fallback to secure client-side cryptographic SHA-256 hash validation
      if (!usedServer) {
        const hash = await hashInput(password);
        if (VALID_HASHES.has(hash)) {
          authenticated = true;
          try {
            sessionStorage.setItem('srivarshini_session_auth', 'unlocked');
          } catch {}
        } else {
          authenticated = false;
        }
      }

      if (authenticated) {
        setIsUnlocked(true);
        setTimeout(() => {
          onAuthenticated();
        }, 800);
      } else {
        setErrorMessage('The constellations did not align. Incorrect password.');
        triggerShake();
      }
    } catch (err) {
      setErrorMessage('Unable to verify password. Please try again.');
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030308]/90 backdrop-blur-xl transition-all duration-1000 ${isUnlocked ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'}`}>
      {/* Ambient Celestial Glow Rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-amber-500/10 blur-[80px] pointer-events-none"></div>

      <div className={`relative w-full max-w-md p-8 sm:p-10 rounded-3xl glass-panel-glow border border-purple-500/30 transition-transform duration-300 ${isShaking ? 'translate-x-[-10px] animate-[shake_0.4s_ease-in-out]' : ''}`}>
        
        {/* Decorative emblem */}
        <div className="flex justify-center mb-6">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-900/60 to-pink-900/40 border border-purple-400/30 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
            <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
            <div className="absolute -inset-1 rounded-2xl bg-purple-500/20 blur-sm -z-10"></div>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs text-purple-300 font-medium tracking-wider uppercase">
            <Lock className="w-3 h-3 text-purple-400" />
            <span>Private Sanctuary</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gradient-cosmic font-cinzel">
            3011 — A Universe for {BIRTHDAY_CONFIG.recipient.preferredName}
          </h1>
          <p className="mt-2 text-sm text-slate-400 font-light leading-relaxed">
            Enter the secret key to open this private realm created especially for you.
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400/60">
              <Key className="w-4 h-4" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Enter password..."
              disabled={isLoading || isUnlocked}
              autoFocus
              className="w-full pl-11 pr-4 py-3.5 rounded-xl glass-input text-slate-100 placeholder-slate-500 text-sm focus:border-purple-400 transition-all duration-300"
            />
          </div>

          {/* Error Message with glowing alert */}
          {errorMessage && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !password.trim() || isUnlocked}
            className="w-full relative group overflow-hidden py-3.5 px-6 rounded-xl font-medium text-sm tracking-wide text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-500 active:scale-[0.98] transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.35)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Aligning constellations...</span>
                </>
              ) : isUnlocked ? (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Welcome Home</span>
                </>
              ) : (
                <>
                  <span>Enter Your Universe</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </button>
        </form>

        {/* Security footnote */}
        <div className="mt-8 pt-5 border-t border-purple-500/10 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400/60" />
          <span>Protected Sanctuary • Encrypted Session Gate</span>
        </div>
      </div>
    </div>
  );
}
