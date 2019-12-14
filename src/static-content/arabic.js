import {worldMap} from './world-map/arabic';
import {methodology} from './methodology/arabic';
import {countryList} from './country-list/arabic';
import {countryProfile} from './country-profile/arabic';
import {indicators} from './indicators/arabic';
import {date} from './date/arabic';
import {healthIndicatorQuestionnaire} from './health-indicator-questionnaire/arabic';

export const ar = {
  worldMap,
  methodology,
  countryList,
  countryProfile,
  indicators,
  date,
  healthIndicatorQuestionnaire,
  headers: {
    worldMap: 'خريطة العالم',
    indicators: 'المؤشرات',
    searchBoxPlaceholder: 'البحث عن طريق اسم البلد',
  },
  mixed: {
    textOverAll: 'المؤشر العام',
    reset: 'إعادة تعيين',
    phase: 'المرحلة',
    phaseN: 'المرحلة {number}',
    all: 'الكل',
    noDataAvailable: 'لا تتوافر بيانات', //client-verification-pending
    noData: 'لايوجد بيانات', //client-verification-pending
    serverErrorTitle: 'خطأ في الخادم', //client-verification-pending
  },
  footer: {
    contactEmail: 'الاتصال: info@digitalhealthindex.org'
  },
  scoreCardPDF: {
    title: '{country} - بطاقة نتائج الصحة الرقمية الوطنية',
    benchMarkPhaseValue: 'المرحلة {benchmarkPhase} بلدان',
    benchmarkAgainstBenchmarkValue: 'المعيار ضد {benchMarkPhaseValue}',
    noteForBenchmark: 'يستخدم المؤشر الرئيسي في كل فئة لحساب المتوسط العام للبلد. يمكن قياس كل بلد مقابل المتوسط العالمي أو البلدان ضمن مرحلة محددة.'
  },
};
