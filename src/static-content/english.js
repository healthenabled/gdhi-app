import {worldMap} from './world-map/english';
import {methodology} from './methodology/english';
import {countryList} from './country-list/english';
import {countryProfile} from './country-profile/english';
import {indicators} from './indicators/english';
import {date} from './date/english';
import {healthIndicatorQuestionnaire} from './health-indicator-questionnaire/english';

export const en = {
  worldMap,
  methodology,
  countryList,
  countryProfile,
  indicators,
  date,
  healthIndicatorQuestionnaire,
  headers: {
    worldMap: 'World Map',
    indicators: 'Indicators',
    searchBoxPlaceholder: 'Search by country name',
  },
  mixed: {
    textOverAll: 'Overall',
    reset: 'Reset',
    phase: 'Phase',
    phaseN:'Phase {number}',
    all: 'All',
    noDataAvailable: 'No data available',
    noData: 'No Data',
    serverErrorTitle: 'Server Error',
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
