import {en, es,fr, pt} from '../../src/static-content';

describe('static content', () => {
  it('static content structure of english should match to french', () => {
    expect(compare(en, fr)).to.equal(true);
  });

  it('static content structure of english should match to spanish', () => {
    expect(compare(en, es)).to.equal(true);
  });

  it('static content structure of english should match to portuguese', () => {
    expect(compare(en, pt)).to.equal(true);
  });
});


function compare(obj1, obj2)  {
  return compareKeys(obj1, obj2) && Object.keys(obj1).every((v) => {
    if (typeof (obj1[v]) === 'object') {
      return compare(obj1[v], obj2[v])
    }
    return true;
  });
}

function compareKeys(obj1, obj2)  {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    console.error('length of obj1 not equal to obj2', keys1, keys2);
    return false;
  }
  return keys1.every((value) => {
    if (obj2.hasOwnProperty(value)) {
      return true;
    } else {
      console.error(`no matching key found obj2. key: ${value}`);
      return false;
    }
  });
}
