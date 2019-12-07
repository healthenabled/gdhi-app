import {worldMap} from './world-map/english';
import {methodology} from './methodology/english';
import {countryList} from './country-list/english';
import {countryProfile} from './country-profile/english';
import {indicators} from './indicators/english';
import {date} from './date/english';

export const en = {
  worldMap,
  methodology,
  countryList,
  countryProfile,
  indicators,
  date,
  headers: {
    worldMap: 'World Map',
    indicators: 'Indicators',
    searchBoxPlaceholder: 'Search by country name',
  },
  mixed: {
    textOverAll: 'Overall',
    reset: 'Reset',
    phase: 'Phase',
    all: 'All',
    // noDataAvailable: 'No data available',
  },
  footer: {
    contactEmail: 'Contact : info@digitalhealthindex.org'
  },
  scoreCardPDF: {
    title: '{country} - National Digital Health Scorecard',
    benchMarkPhaseValue: 'Phase {benchmarkPhase} Countries',
    benchmarkAgainstBenchmarkValue: 'Benchmark Against {benchMarkPhaseValue}',
  },
};
