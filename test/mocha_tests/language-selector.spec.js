import {createLocalVue, mount} from '@vue/test-utils';
import LanguageSelector from '../../src/components/language-selector/language-selector';
import VueI18n from 'vue-i18n';
import VueCookies from 'vue-cookies';

describe('language selector', () => {
  let wrapper;
  const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
  });
  it('should change i18n locale when user change the language to spanish', () => {
    const localVue = createLocalVue();
    localVue.use(VueCookies);
    wrapper = mount(LanguageSelector, {
      i18n,
      localVue
    });

    expect(wrapper.vm.$i18n.locale).to.equal('en');

    wrapper.findAll('select > option').filter((e) => e.element._value === 'es').at(0).element.selected = true;
    wrapper.find('select').trigger('change');

    expect(wrapper.vm.$i18n.locale).to.equal('es');

  });
});
