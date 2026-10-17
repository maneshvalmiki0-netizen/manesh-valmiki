import React, { useState } from 'react';
import { ShieldCheck, BookOpen, AlertCircle, CheckCircle, Mail, Send } from 'lucide-react';

export const AboutView: React.FC = () => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [reportState, setReportState] = useState('');
  const [reportTopic, setReportTopic] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [reportEmail, setReportEmail] = useState('');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTopic || !reportDetails) return;
    setFeedbackSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center">
        <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">Editorial Integrity & Purpose</span>
        <h1 className="text-4xl font-serif font-bold text-stone-900">About Heritage Hub of India</h1>
        <p className="text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          A dedicated digital encyclopedia bridging the knowledge gap by assembling verified cultural monographs, historical timelines, and responsible tourism guides for all 28 states and 8 Union Territories.
        </p>
      </div>

      {/* Core Mission */}
      <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Curatorial Mission</h2>
        <p className="text-sm text-stone-700 leading-relaxed">
          Currently, researchers, students, domestic travelers, and global visitors are forced to navigate fragmented, incomplete, or commercialized websites to understand India’s living heritage. 
          Heritage Hub of India serves as a unified, non-commercial public repository celebrating India's extraordinary diversity while adhering to strict historical accuracy.
        </p>
      </div>

      {/* Authoritative Sources */}
      <div className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Authoritative Sources & Methodologies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-stone-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Archaeological Survey of India (ASI)</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Monuments, protected rock shelters, excavations (such as Keeladi and Kalibangan), and architectural timelines are verified against official ASI epigraphical records.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-stone-900 text-sm">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>UNESCO World Heritage Centre</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Inscriptions on both the World Cultural Heritage List and the Representative List of the Intangible Cultural Heritage of Humanity (e.g. Kolkata Durga Puja, Garba, Yoga).
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-stone-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Geographical Indications (GI) Registry</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Authentic handlooms, textiles, and traditional crafts (Patan Patola, Kanchipuram Silk, Aranmula Kannadi, Bidriware) are verified against intellectual property gazettes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-stone-900 text-sm">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>State Cultural Departments & Gazettes</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Official state tourism departments, state gazetteers, and tribal research institutes across all 28 states and 8 Union Territories.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Correction Form */}
      <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#C85A32] font-semibold">Community Peer Review</span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">Report Inaccuracy or Suggest Correction</h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            We are committed to absolute accuracy. If you notice an error in a historical date, linguistic distinction, recipe, or citation, submit it directly to our editorial board.
          </p>
        </div>

        {feedbackSent ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Thank you. Your peer review submission has been received by our editorial council and queued for archival verification.</span>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">State / Territory</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Karnataka"
                  value={reportState}
                  onChange={(e) => setReportState(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Topic / Monument / Entry</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Vittala Temple Stone Chariot date"
                  value={reportTopic}
                  onChange={(e) => setReportTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Correction Details & Authoritative Citation</label>
              <textarea
                required
                rows={3}
                placeholder="Describe the discrepancy and provide a credible reference or academic source..."
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Your Email (optional, for follow-up)</label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={reportEmail}
                onChange={(e) => setReportEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#A5431E] text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit to Editorial Review</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
