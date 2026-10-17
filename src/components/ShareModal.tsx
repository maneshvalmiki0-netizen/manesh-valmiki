import React, { useState } from 'react';
import { X, Copy, Check, Share2, Mail } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, url }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} — Explore on Heritage Hub of India: ${url}`)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Discover ${title} on Heritage Hub of India:\n${url}`)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 p-6 space-y-5 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-900 font-semibold">
            <Share2 className="w-5 h-5 text-[#C85A32]" />
            <h3>Share Heritage Profile</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <p className="text-xs text-stone-500 mb-2">Sharing</p>
          <p className="text-sm font-serif font-bold text-stone-900 line-clamp-1">{title}</p>
        </div>

        {/* Copy Link input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-hidden"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-2 bg-[#C85A32] text-white text-xs font-medium rounded-lg hover:bg-[#A5431E] transition-colors flex items-center gap-1.5 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Social Links */}
        <div className="pt-2 border-t border-stone-100 flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 border border-stone-200 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50 text-center flex items-center justify-center gap-2 transition-colors"
          >
            <span>WhatsApp</span>
          </a>
          <a
            href={mailUrl}
            className="flex-1 py-2 px-3 border border-stone-200 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50 text-center flex items-center justify-center gap-2 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-stone-500" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};
