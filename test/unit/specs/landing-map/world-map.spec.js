// import map from '@/components/landing-map/world-map.js'
// import eventHandler from '@/components/landing-map/map-event-handler.js'
// import L from 'leaflet'
//
// const countryIndices = [{
//   'countryId': 'AFG',
//   'countryName': 'Afghanistan',
//   'countryPhase': 5,
//   'overallScore': 4.75,
//   'colorCode': '#11184B',
//   'categories': [{
//     'id': 1,
//     'name': 'Leadership and Governance',
//     'overallScore': 4.5,
//     'phase': 5,
//     'indicators': [{
//       'id': 1,
//       'indicatorDescription': 'Does the country have a separate department / agency / ' +
//       'national working group for digital health?',
//       'name': 'Digital health prioritized at the national level through dedicated bodies / ' +
//       'mechanisms for governance',
//       'score': 4,
//       'scoreDescription': 'Governance structure is fully-functional, government-led, consults' +
//       'with other ministries, and monitors implementation of digital health based on a work' +
//       'plan.',
//       'supportingText': null
//     }]
//   }]
// }]
//
// const data = {'type':'FeatureCollection', 'features': [
// {'type':'Feature','geometry':null,'properties':{'scalerank':3,'featurecla':'Admin-0 country','LABELRANK':6,'SOVEREIGNT':'Singapore','SOV_A3':'SGP','ADM0_DIF':0,'LEVEL':2,'TYPE':'Sovereign country','ADMIN':'Singapore','ADM0_A3':'SGP','GEOU_DIF':0,'GEOUNIT':'Singapore','GU_A3':'SGP','SU_DIF':0,'SUBUNIT':'Singapore','SU_A3':'SGP','BRK_DIFF':0,'NAME':'Singapore','NAME_LONG':'Singapore','BRK_A3':'SGP','BRK_NAME':'Singapore','BRK_GROUP':'','ABBREV':'Sing.','POSTAL':'SG','FORMAL_EN':'Republic of Singapore','FORMAL_FR':'','NAME_CIAWF':'Singapore','NOTE_ADM0':'','NOTE_BRK':'','NAME_SORT':'Singapore','NAME_ALT':'','MAPCOLOR7':5,'MAPCOLOR8':3,'MAPCOLOR9':7,'MAPCOLOR13':3,'POP_EST':5888926,'POP_RANK':13,'GDP_MD_EST':487900,'POP_YEAR':2017,'LASTCENSUS':2010,'GDP_YEAR':2016,'ECONOMY':'6. Developing region','INCOME_GRP':'2. High income: nonOECD','WIKIPEDIA':-99,'FIPS_10_':'SN','ISO_A2':'SG','ISO_A3':'SGP','ISO_A3_EH':'SGP','ISO_N3':'702','UN_A3':'702','WB_A2':'SG','WB_A3':'SGP','WOE_ID':23424948,'WOE_ID_EH':23424948,'WOE_NOTE':'Exact WOE match as country','ADM0_A3_IS':'SGP','ADM0_A3_US':'SGP','ADM0_A3_UN':-99,'ADM0_A3_WB':-99,'CONTINENT':'Asia','REGION_UN':'Asia','SUBREGION':'South-Eastern Asia','REGION_WB':'East Asia & Pacific','NAME_LEN':9,'LONG_LEN':9,'ABBREV_LEN':5,'TINY':3,'HOMEPART':1,'MIN_ZOOM':0,'MIN_LABEL':4,'MAX_LABEL':9}},
// ]}
//
// describe('Map comp', () => {
//   it.only('should get color code for score', () => {
//     var layer = L.geoJSON(data)
//     var leafletLayer = sinon.mock(layer)
//     layer.feature = {'properties': {
//       'BRK_A3': 'IND'
//     }}
//     leafletLayer.expects('setStyle').once().
//       withArgs({ fillColor: '#606060', fillOpacity: 0.95 })
//     eventHandler.resetLayer(layer, countryIndices)
//     leafletLayer.verify()
//   })
// })
