import React, { useState } from 'react';
import { BookOpen, Calendar, User, ArrowLeft, ArrowRight, Share2, Printer } from 'lucide-react';
import { culturalArticles } from '../data/categoriesData.ts';
import { CulturalArticle } from '../types/heritage.ts';

interface ArticlesViewProps {
  onNavigateToState: (slug: string) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({ onNavigateToState }) => {
  const [selectedArticle, setSelectedArticle] = useState<CulturalArticle | null>(null);

  if (selectedArticle) {
    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Cultural Essays</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4 border-b border-stone-200 pb-8">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-[#C85A32] uppercase tracking-wider">{selectedArticle.category}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedArticle.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>Published {selectedArticle.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-[1.2]">
            {selectedArticle.title}
          </h1>

          <p className="text-base sm:text-lg font-serif italic text-stone-600 leading-relaxed">
            {selectedArticle.summary}
          </p>

          <div className="flex items-center justify-between pt-4 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              By {selectedArticle.author}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors flex items-center gap-1"
              >
                <Printer className="w-3 h-3" />
                <span>Print Essay</span>
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Body with Drop-Cap on First Paragraph */}
        <div className="prose prose-stone max-w-none text-stone-800 space-y-6 leading-relaxed font-sans text-base sm:text-lg">
          {selectedArticle.content.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#C85A32]'
                  : ''
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Related States */}
        <div className="pt-8 border-t border-stone-200 space-y-3">
          <span className="text-xs font-semibold text-stone-700 block uppercase tracking-wider">
            Explore Associated Regions:
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedArticle.relatedStates.map((st, i) => (
              <button
                key={i}
                onClick={() => onNavigateToState(st.toLowerCase().replace(/\s+/g, '-'))}
                className="px-3.5 py-1.5 bg-white border border-stone-200 hover:border-stone-400 rounded-lg text-xs font-medium text-stone-800 transition-colors flex items-center gap-1.5"
              >
                <span>{st}</span>
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </button>
            ))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">Curatorial Monographic Essays</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          Cultural Stories & Research Papers
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Deep-dive scholarly essays exploring the architectural mathematics, living botanical bridges, and double-ikat textile traditions of India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {culturalArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 hover:border-stone-400 transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="text-[#C85A32] font-semibold">{article.category}</span>
                <span>{article.readTime}</span>
              </div>

              <h2 className="text-xl font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors leading-snug">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>{article.author}</span>
              <span className="font-semibold text-[#C85A32] flex items-center gap-1">
                Read Essay <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
