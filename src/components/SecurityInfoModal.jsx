import React, { useState } from 'react';
import { Shield, Lock, EyeOff, Server, X } from 'lucide-react';

export default function SecurityInfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Discreet Security Badge in Header / Footer */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-purple-500/20 text-[11px] text-purple-300/80 hover:text-purple-200 hover:border-purple-400 transition-all cursor-pointer"
        title="View Security & Privacy Architecture"
      >
        <Shield className="w-3.5 h-3.5 text-purple-400" />
        <span className="hidden sm:inline">Protected Space</span>
      </button>

      {/* Security Architecture Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-panel-glow border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-scale-up text-left">
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-900/60 border border-purple-500/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-400/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-cinzel text-slate-100">
                  Security & Privacy Architecture
                </h3>
                <p className="text-xs text-purple-400 font-mono">
                  Private sanctuary for Srivarshini
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20">
                <strong className="block text-purple-200 font-medium mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-purple-400" /> Server-Side Authentication
                </strong>
                The secret password is encrypted and verified strictly on the Node.js server. It is never exposed in client JavaScript, HTML, or public repositories.
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20">
                <strong className="block text-purple-200 font-medium mb-1 flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-purple-400" /> Gated Media Streaming
                </strong>
                Photographs and music are served via <code>/api/media/:file</code> which mandates an active signed session cookie. Direct unauthenticated requests return 401 Unauthorized.
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20">
                <strong className="block text-purple-200 font-medium mb-1 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-purple-400" /> Rate Limiting & Privacy Controls
                </strong>
                Brute-force protection limits login attempts to 5 per minute per IP. The website features strict <code>noindex, nofollow</code> robot directives with zero external tracking.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/20 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
