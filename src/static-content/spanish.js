import {worldMap} from './world-map/spanish';
import {methodology} from './methodology/spanish';
import {countryList} from './country-list/spanish';
import {countryProfile} from './country-profile/spanish';
import {indicators} from './indicators/spanish';
import {date} from './date/spanish';
import {healthIndicatorQuestionnaire} from './health-indicator-questionnaire/spanish';

export const es = {
  worldMap,
  methodology,
  countryList,
  countryProfile,
  indicators,
  date,
  healthIndicatorQuestionnaire,
  headers: {
    worldMap: 'Mapa del mundo',
    indicators: 'Indicadores',
    searchBoxPlaceholder: 'Búsqueda por nombre de país',
  },
  mixed: {
    textOverAll: 'En general',
    reset: 'REAJUSTE',
    phase: 'Fase',
    all: 'Todos',
    noDataAvailable: 'No hay datos disponibles',
    noData: 'Sin datos',
    serverErrorTitle: 'Error del servidor',
  },
  footer: {
    contactEmail: 'Contacto: info@digitalhealthindex.org'
  },
  scoreCardPDF: {
    title: '{country} - Cuadro de Mando de la Salud Digital Nacional',
    benchMarkPhaseValue: 'Fase {benchmarkPhase} Países',
    benchmarkAgainstBenchmarkValue: 'Punto de referencia contra {benchMarkPhaseValue}',
  },
};
