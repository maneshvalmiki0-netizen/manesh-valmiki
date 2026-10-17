import React from 'react';
import { X, Trash2, ArrowRight, Bookmark, MapPin } from 'lucide-react';

export interface BookmarkItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  subtitle: string;
}

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  onClearBookmarks: () => void;
  onSelectBookmark: (slug: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onClearBookmarks,
  onSelectBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs animate-in fade-in" onClick={onClose}>
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col animate-in slide-in-from-right"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center">
                <Bookmark className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-stone-900">Saved Heritage</h3>
                <p className="text-xs text-stone-500">{bookmarks.length} places & topics saved</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
            {bookmarks.length > 0 ? (
              bookmarks.map((item) => (
                <div key={item.id} className="py-3 flex items-start justify-between gap-3 group">
                  <button
                    onClick={() => {
                      onSelectBookmark(item.slug);
                      onClose();
                    }}
                    className="text-left flex-1 space-y-1"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span className="text-[#C85A32] font-medium">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {item.subtitle}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 group-hover:text-[#C85A32] transition-colors">
                      {item.title}
                    </h4>
                  </button>

                  <div className="flex items-center gap-1 shrink-0 pt-1">
                    <button
                      onClick={() => onRemoveBookmark(item.id)}
                      aria-label={`Remove ${item.title}`}
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectBookmark(item.slug);
                        onClose();
                      }}
                      className="p-1.5 text-stone-400 hover:text-stone-900 rounded-md transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <Bookmark className="w-10 h-10 mx-auto text-stone-300 stroke-[1.5]" />
                <p className="text-sm font-medium text-stone-800">Your collection is empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the bookmark icon on any state, monument, or festival to save it for your journey.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {bookmarks.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
              <button
                onClick={onClearBookmarks}
                className="text-xs font-medium text-stone-600 hover:text-rose-600 transition-colors"
              >
                Clear all saved
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
