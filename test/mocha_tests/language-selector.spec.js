import {mount} from '@vue/test-utils';
import LanguageSelector from '../../src/components/language-selector/language-selector';
import VueI18n from 'vue-i18n';

describe('language selector', () => {
  let wrapper;
  const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
  });
  it('should change i18n locale when user change the language to spanish', () => {
    wrapper = mount(LanguageSelector, {
      i18n
    });

    expect(wrapper.vm.$i18n.locale).to.equal('en');

    wrapper
      .find('select')
      .findAll('option')
      .filter((e) => e.element._value === 'es')
      .at(0)
      .setSelected();

    expect(wrapper.vm.$i18n.locale).to.equal('es');

  });
});
