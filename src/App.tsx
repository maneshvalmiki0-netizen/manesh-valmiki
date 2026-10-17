import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { BookmarksDrawer, BookmarkItem } from './components/BookmarksDrawer.tsx';
import { DestinationModal } from './components/DestinationModal.tsx';
import { CulturalBackgroundProvider } from './components/CulturalBackground.tsx';
import { CulturalThemeSelector } from './components/CulturalThemeSelector.tsx';

import { HomeView } from './views/HomeView.tsx';
import { StateDetailView } from './views/StateDetailView.tsx';
import { DestinationsView } from './views/DestinationsView.tsx';
import { MultilingualExplorerView } from './views/MultilingualExplorerView.tsx';
import { ItineraryPlannerView } from './views/ItineraryPlannerView.tsx';
import { CompareView } from './views/CompareView.tsx';
import { ThematicCategoryView } from './views/ThematicCategoryView.tsx';
import { ArticlesView } from './views/ArticlesView.tsx';
import { AdminView } from './views/AdminView.tsx';
import { AboutView } from './views/AboutView.tsx';

import { getStateBySlug, getAllEntitiesSummary } from './data/statesData.ts';
import { getDestinationById } from './data/destinationsDatabase.ts';
import { DestinationDetail } from './types/heritage.ts';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedStateSlug, setSelectedStateSlug] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [itineraryStops, setItineraryStops] = useState<DestinationDetail[]>([]);
  const [inspectingGlobalDest, setInspectingGlobalDest] = useState<DestinationDetail | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load bookmarks & itinerary from localStorage on mount
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('heritage_hub_bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (e) {
      console.warn('Could not read bookmarks from storage', e);
    }

    try {
      const savedItinerary = localStorage.getItem('heritage_hub_itinerary');
      if (savedItinerary) {
        setItineraryStops(JSON.parse(savedItinerary));
      }
    } catch (e) {
      console.warn('Could not read itinerary from storage', e);
    }
  }, []);

  // Sync hash routing with window location
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '').trim();
      const [routePart, queryPart] = rawHash.split('?');
      const params = new URLSearchParams(queryPart || '');

      const destId = params.get('id');
      if (destId) {
        const found = getDestinationById(destId);
        if (found) setInspectingGlobalDest(found);
      }

      if (routePart.startsWith('states/')) {
        const slug = routePart.replace('states/', '');
        setSelectedStateSlug(slug);
        setCurrentRoute('state-detail');
      } else if (routePart) {
        setCurrentRoute(routePart);
        setSelectedStateSlug(null);
      } else {
        setCurrentRoute('home');
        setSelectedStateSlug(null);
      }
      setSearchModalOpen(false);
      setBookmarksDrawerOpen(false);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    setSelectedStateSlug(null);
    window.location.hash = route === 'home' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openStateDetail = (slug: string) => {
    setSelectedStateSlug(slug);
    setCurrentRoute('state-detail');
    window.location.hash = `states/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (item: BookmarkItem) => {
    const exists = bookmarks.some((b) => b.id === item.id);
    let updated: BookmarkItem[];
    if (exists) {
      updated = bookmarks.filter((b) => b.id !== item.id);
    } else {
      updated = [item, ...bookmarks];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem('heritage_hub_bookmarks', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save bookmark', e);
    }
  };

  const handleRemoveBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    try {
      localStorage.setItem('heritage_hub_bookmarks', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save bookmark', e);
    }
  };

  const handleClearBookmarks = () => {
    setBookmarks([]);
    try {
      localStorage.removeItem('heritage_hub_bookmarks');
    } catch (e) {
      console.warn('Could not clear bookmarks', e);
    }
  };

  // Itinerary planner handlers
  const handleAddToItinerary = (dest: DestinationDetail) => {
    setItineraryStops((prev) => {
      const exists = prev.some((item) => item.id === dest.id);
      let updated: DestinationDetail[];
      if (exists) {
        updated = prev.filter((item) => item.id !== dest.id);
      } else {
        updated = [...prev, dest];
      }
      try {
        localStorage.setItem('heritage_hub_itinerary', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save itinerary', e);
      }
      return updated;
    });
  };

  const handleRemoveItineraryStop = (id: string) => {
    setItineraryStops((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('heritage_hub_itinerary', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleClearItinerary = () => {
    setItineraryStops([]);
    try {
      localStorage.removeItem('heritage_hub_itinerary');
    } catch (e) {}
  };

  const itineraryDestIds = useMemo(() => new Set(itineraryStops.map((s) => s.id)), [itineraryStops]);
  const bookmarkedDestIds = useMemo(() => bookmarks.map((b) => b.slug || b.id), [bookmarks]);

  const currentStateData = selectedStateSlug ? getStateBySlug(selectedStateSlug) : null;
  const isCurrentStateBookmarked = Boolean(
    currentStateData && bookmarks.some((b) => b.id === `state-${currentStateData.id}`)
  );

  return (
    <CulturalBackgroundProvider activeStateSlugProp={currentRoute === 'state-detail' ? selectedStateSlug : null}>
      <div className="min-h-screen flex flex-col text-[#1E1B18] font-sans antialiased selection:bg-[#E07A5F] selection:text-white">
        {/* Universal Top Navigation Bar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        bookmarkCount={bookmarks.length}
        itineraryCount={itineraryStops.length}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomeView
            onSelectState={openStateDetail}
            onOpenSearch={() => setSearchModalOpen(true)}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'destinations' && (
          <DestinationsView
            onAddToItinerary={handleAddToItinerary}
            itineraryDestIds={itineraryDestIds}
            bookmarks={bookmarkedDestIds}
            onToggleBookmark={(dest) =>
              handleToggleBookmark({
                id: `dest-${dest.id}`,
                slug: dest.slug,
                title: dest.name,
                category: dest.category,
                subtitle: `${dest.district}, ${dest.state}`,
              })
            }
            onNavigateToState={openStateDetail}
          />
        )}

        {currentRoute === 'multilingual' && (
          <MultilingualExplorerView
            currentLanguage={currentLanguage}
            onSelectLanguage={setCurrentLanguage}
            onNavigateToState={openStateDetail}
          />
        )}

        {currentRoute === 'itinerary' && (
          <ItineraryPlannerView
            customStops={itineraryStops}
            onRemoveStop={handleRemoveItineraryStop}
            onClearItinerary={handleClearItinerary}
            onNavigateToState={openStateDetail}
          />
        )}

        {currentRoute === 'states' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">
                Full Civilizational Directory
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                All 28 States & 8 Union Territories
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Explore the complete collection of India’s states and union territories, each with its dedicated historical timeline, monuments, cuisine, and local wisdom.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getAllEntitiesSummary().map((state) => (
                <div
                  key={state.id}
                  onClick={() => openStateDetail(state.slug)}
                  className="bg-white rounded-2xl border border-stone-200 p-5 hover:border-stone-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="text-[#C85A32] font-medium">{state.region}</span>
                      <span className="uppercase text-[10px] text-stone-400">{state.type}</span>
                    </div>

                    <h2 className="text-xl font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors">
                      {state.name}
                    </h2>
                    <p className="text-xs text-stone-500">Capital: <strong>{state.capital}</strong></p>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed pt-1">
                      {state.tagline}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-700 group-hover:text-[#C85A32] transition-colors">
                    <span>Open Monograph</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentRoute === 'state-detail' && currentStateData && (
          <StateDetailView
            state={currentStateData}
            onBack={() => navigateTo('states')}
            isBookmarked={isCurrentStateBookmarked}
            onToggleBookmark={() =>
              handleToggleBookmark({
                id: `state-${currentStateData.id}`,
                slug: currentStateData.slug,
                title: currentStateData.name,
                category: 'State Monograph',
                subtitle: currentStateData.capital,
              })
            }
            onNavigateToState={openStateDetail}
            onAddToItinerary={handleAddToItinerary}
            itineraryDestIds={itineraryDestIds}
            onInspectDestination={(dest) => setInspectingGlobalDest(dest)}
          />
        )}

        {currentRoute === 'categories' && (
          <ThematicCategoryView
            initialCategory="Monuments"
            onNavigateToState={openStateDetail}
          />
        )}

        {currentRoute === 'compare' && (
          <CompareView onNavigateToState={openStateDetail} />
        )}

        {currentRoute === 'heritage' && (
          <ThematicCategoryView
            initialCategory="Monuments"
            onNavigateToState={openStateDetail}
          />
        )}

        {currentRoute === 'culture' && (
          <ThematicCategoryView
            initialCategory="Performing Arts"
            onNavigateToState={openStateDetail}
          />
        )}

        {currentRoute === 'festivals' && (
          <ThematicCategoryView
            initialCategory="Festivals"
            onNavigateToState={openStateDetail}
          />
        )}

        {currentRoute === 'food' && (
          <ThematicCategoryView
            initialCategory="Cuisines"
            onNavigateToState={openStateDetail}
          />
        )}

        {currentRoute === 'articles' && (
          <ArticlesView onNavigateToState={openStateDetail} />
        )}

        {currentRoute === 'admin' && <AdminView />}

        {currentRoute === 'about' && <AboutView />}
      </main>

      {/* Destination Monograph Modal (Global) */}
      <DestinationModal
        destination={inspectingGlobalDest}
        isOpen={Boolean(inspectingGlobalDest)}
        onClose={() => setInspectingGlobalDest(null)}
        isBookmarked={inspectingGlobalDest ? bookmarkedDestIds.includes(inspectingGlobalDest.slug) : false}
        onToggleBookmark={() => {
          if (inspectingGlobalDest) {
            handleToggleBookmark({
              id: `dest-${inspectingGlobalDest.id}`,
              slug: inspectingGlobalDest.slug,
              title: inspectingGlobalDest.name,
              category: inspectingGlobalDest.category,
              subtitle: `${inspectingGlobalDest.district}, ${inspectingGlobalDest.state}`,
            });
          }
        }}
        onAddToItinerary={handleAddToItinerary}
        isInItinerary={inspectingGlobalDest ? itineraryDestIds.has(inspectingGlobalDest.id) : false}
      />

      {/* Global Search Dialog Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={(slug) => openStateDetail(slug)}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onClearBookmarks={handleClearBookmarks}
        onSelectBookmark={openStateDetail}
      />

      {/* Institutional Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Interactive Cultural Background & Ambience Switcher */}
      <CulturalThemeSelector />
    </div>
  </CulturalBackgroundProvider>
  );
}
