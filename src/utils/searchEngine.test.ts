import test from 'node:test';
import assert from 'node:assert/strict';
import { searchHeritage, getSearchIndex, compareTwoStates } from './searchEngine.ts';
import { allStates } from '../data/statesData.ts';

test('search index populates states and heritage items', () => {
  const index = getSearchIndex();
  assert.ok(index.length > 50, 'Search index should contain many indexed items');
  
  // Verify Rajasthan exists
  const rajasthan = index.find(item => item.title === 'Rajasthan');
  assert.ok(rajasthan, 'Rajasthan should be indexed');
  assert.equal(rajasthan?.category, 'State / UT');
});

test('search query finds relevant monuments and dishes', () => {
  const results = searchHeritage('Taj Mahal');
  assert.ok(results.length > 0, 'Should find results for Taj Mahal');
  assert.equal(results[0].title, 'Taj Mahal');
  assert.equal(results[0].stateName, 'Uttar Pradesh');

  const foodResults = searchHeritage('Biryani');
  assert.ok(foodResults.length > 0, 'Should find results for Biryani');
});

test('search respects category and region filters', () => {
  const southStates = searchHeritage('', { region: 'South', category: 'State / UT' });
  assert.ok(southStates.length > 0, 'Should return South states');
  southStates.forEach(s => {
    assert.equal(s.region, 'South');
    assert.equal(s.category, 'State / UT');
  });
});

test('compareTwoStates produces structured contrast and points', () => {
  const rajasthan = allStates.find(s => s.slug === 'rajasthan')!;
  const kerala = allStates.find(s => s.slug === 'kerala')!;
  assert.ok(rajasthan && kerala);

  const comparison = compareTwoStates(rajasthan, kerala);
  assert.equal(comparison.stateA.name, 'Rajasthan');
  assert.equal(comparison.stateB.name, 'Kerala');
  assert.ok(comparison.contrastPoints.length > 0, 'Should have regional and linguistic contrast points');
  assert.ok(comparison.stateA.signatureDishes.length > 0);
  assert.ok(comparison.stateB.signatureDishes.length > 0);
});

import { 
  getAllDestinations, getDestinationsByState, getDistrictsForState, 
  searchDestinations, getDestinationsStats, getUnescoDestinations 
} from '../data/destinationsDatabase.ts';
import { SUPPORTED_LANGUAGES, CULTURAL_GREETINGS, CLASSICAL_LANGUAGES } from '../data/multilingualData.ts';

test('master destinations database contains 1,600+ destinations across 36 entities', () => {
  const all = getAllDestinations();
  assert.ok(all.length >= 1600, `Destinations count should be at least 1,600, got ${all.length}`);

  const stats = getDestinationsStats();
  assert.equal(stats.statesCovered, 36, 'Should cover all 28 states and 8 Union Territories');
  assert.ok(stats.districtsCovered > 300, 'Should cover hundreds of districts');
  assert.ok(stats.unescoCount > 30, 'Should have rich UNESCO coverage');
  assert.ok(stats.hiddenGemsCount > 50, 'Should have rich hidden gems coverage');

  // Verify state-level retrieval
  const karnatakaDestinations = getDestinationsByState('karnataka');
  assert.ok(karnatakaDestinations.length >= 50, 'Karnataka should have at least 50 destinations');

  const karnatakaDistricts = getDistrictsForState('karnataka');
  assert.ok(karnatakaDistricts.length >= 10, 'Karnataka should have 10+ districts');
});

test('searchDestinations filters correctly by district, category and query', () => {
  const hampiSearch = searchDestinations('Hampi');
  assert.ok(hampiSearch.length > 0, 'Should find Hampi destinations');

  const unescoList = getUnescoDestinations();
  assert.ok(unescoList.length > 0, 'Should return UNESCO destinations');
  unescoList.forEach(u => assert.equal(u.isUnesco, true));

  const filtered = searchDestinations('', { stateSlug: 'karnataka', limit: 10 });
  assert.equal(filtered.length, 10);
  filtered.forEach(d => assert.equal(d.stateSlug, 'karnataka'));
});

test('multilingual cultural explorer supports 12+ Indian languages and classical traditions', () => {
  assert.ok(SUPPORTED_LANGUAGES.length >= 12, 'Should support 12+ Indian languages');
  assert.ok(CULTURAL_GREETINGS.length >= 4, 'Should have regional greetings');
  assert.ok(CLASSICAL_LANGUAGES.length >= 8, 'Should document classical Indian languages');

  const hindi = SUPPORTED_LANGUAGES.find(l => l.code === 'hi');
  assert.ok(hindi, 'Hindi should be present');
  assert.equal(hindi?.script, 'Devanagari');

  const kannada = SUPPORTED_LANGUAGES.find(l => l.code === 'kn');
  assert.ok(kannada, 'Kannada should be present');
});

