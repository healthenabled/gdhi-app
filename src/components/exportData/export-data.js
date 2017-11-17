import Vue from 'vue'
import JsonExcel from 'vue-json-excel'
import exportTemplate from './export-data.html'
 /* eslint-disable */  // To be removed after the full fix
Vue.component('downloadExcel', JsonExcel)
export default Vue.extend({
	template: exportTemplate,
  data () {
    return {
      json_fields: {
        'Country Name': 'Definition',
        'Indicator 1': 'Indicator 1',
        'Indicator 2': 'Indicator 2',
        'Category 1': 'Category 1',
        'Indicator 3': 'Indicator 3',
        'Indicator 4': 'Indicator 4',
        'Category 2': 'Category 2',
        'Indicator 5': 'Indicator 5',
        'Indicator 6': 'Indicator 6',
        'Indicator 7': 'Indicator 7',
        'Indicator 8': 'Indicator 8',
        'Category 3': 'Category 3',
        'Indicator 9': 'Indicator 9',
        'Indicator 10': 'Indicator 10',
        'Indicator 11': 'Indicator 11',
        'Indicator 12': 'Indicator 12',
        'Category 4': 'Category 4',
        'Indicator 13': 'Indicator 13',
        'Indicator 14': 'Indicator 14',
        'Category 5': 'Category 5',
        'Indicator 15': 'Indicator 15',
        'Indicator 16': 'Indicator 16',
        'Category 6': 'Category 6',
        'Indicator 17': 'Indicator 17',
        'Indicator 18': 'Indicator 18',
        'Indicator 19': 'Indicator 19',
        'Category 7': 'Category 7',
        'Overall Phase': 'Overall Phase'
      },
      json_data: [{
        'Country Name': 'Country Name',
        'Indicator 1': 'Digital health prioritized at the national level through dedicated bodies / mechanisms for governance',
        'Indicator 2': 'Digital Health prioritized at the national level through planning',
        'Category 1': 'Leadership and Governance',
        'Indicator 3': 'National eHealth/ Digital Health Strategy or Framework',
        'Indicator 4': 'Public funding for digital health',
        'Category 2': 'Strategy & Investment',
        'Indicator 5': 'Legal Framework for Data Protection (Security)',
        'Indicator 6': 'Laws or Regulations for privacy, confidentiality and acess to health information (Privacy)',
        'Indicator 7': 'Protocol for regulating or certifying devices and/or digital health services',
        'Indicator 8': 'Cross-border data security and sharing',
        'Category 3': 'Legislation, Policy, and Compliance',
        'Indicator 9': 'Digital health integrated in health and related professional pre-service training (prior to deployment)',
        'Indicator 10': 'Digital health integrated in health and related professional in-service training (after deployment)',
        'Indicator 11': 'Training of digital health work force',
        'Indicator 12': 'Maturity of public sector digital health professional careers',
        'Category 4': 'Workforce',
        'Indicator 13': 'National digital health architecture and/or health information exchange',
        'Indicator 14': 'Health information standards',
        'Category 5': 'Standards and Interoperability',
        'Indicator 15': 'Network readiness',
        'Indicator 16': 'Planning and support for ongoing digital health infrastructure maintenance',
        'Category 6': 'Infrastructure',
        'Indicator 17': 'Nationally scaled digital health systems',
        'Indicator 18': 'Identity management of service providers, administrators, and facilities for Digital Health, including location data for GIS mapping',
        'Indicator 19': 'Identity management of individuals for Digital Health',
        'Category 7': 'Services and Application',
        'Overall Phase': 'Overall Phase'
      }],
      json_meta: [[{
        'key': 'charset',
        'value': 'utf-8'
      }]
      ],
      healthIndicatorData: {}
    }
  },
  props: {
  	healthData: {
  		type: Object,
  		default: function () {
  			return {}
  		}
  	}
  },

  mounted () {
  	this.healthIndicatorData = this.healthData
  },

  updated () {
  	console.log('CountryName', this.healthIndicatorData)
  	this.download(this.healthIndicatorData)
  },

  methods: {
  	download: function (healthIndicatorData) {
  		console.log('------------------> ', healthIndicatorData)
		const countryData = Object.assign({}, this.json_data[0])
		_.each(countryData, function (index, data) {
			countryData[data] = 'Missing / Not Available'
		})

		_.each(healthIndicatorData.categories, (category) => {
			countryData['Category ' + category.id] = 'Phase  ' + category.phase
		    _.each(category.indicators, (indicator) => {
		      countryData['Indicator ' + indicator.id] = 'Phase  ' + indicator.score
		    })
    	})

        countryData['Country Name'] = healthIndicatorData.countryName
      	countryData['Overall Phase'] = healthIndicatorData.countryPhase
      	this.json_data.push(countryData)
  	}
  }
})