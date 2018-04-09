import { mount } from '@vue/test-utils';
import colorCodes from  "../../src/components/common/color-codes.js";

describe ("color codes", () => {
  let colorObj = [
    { score: '5', color: '#11184B', description: 'Most Developed' },
    { score: '4', color: '#225E8E', description: '' },
    { score: '3', color: '#387886', description: '' },
    { score: '2', color: '#77B2BF', description: '' },
    { score: '1', color: '#BEDCE3', description: 'Least Developed' },
    { score: 'NA', color: '#606060' },
  ];
  it(" should return the color codes object", () => {
    expect(colorCodes.getColorCodes()).to.deep.equal(colorObj);
  })
})