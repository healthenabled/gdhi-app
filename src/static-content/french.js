import {worldMap} from './world-map/french';
import {methodology} from './methodology/french';
import {countryList} from './country-list/french';
import {countryProfile} from './country-profile/french';
import {indicators} from './indicators/french';
import {date} from './date/french';

export const fr = {
  worldMap,
  methodology,
  countryList,
  countryProfile,
  indicators,
  date,
  headers: {
    worldMap: 'Carte du monde',
    indicators: 'Indicateurs',
    searchBoxPlaceholder: 'Recherche par nom de pays',
  },
  mixed: {
    textOverAll: 'Dans l\'ensemble',
    reset: 'RESET',
    phase: 'Phase',
    all: 'Toutes',
    methodology: 'Méthodologie',
  },
  footer: {
    contactEmail: 'Contact: info@digitalhealthindex.org'
  },
  scoreCardPDF: {
    title: '{country} - Tableau de Bord National de la Santé Numérique ',
    benchMarkPhaseValue: 'Phase {benchmarkPhase} pays',
    benchmarkAgainstBenchmarkValue: 'RÉFÉRENCE Against {benchMarkPhaseValue}',
  },
};
