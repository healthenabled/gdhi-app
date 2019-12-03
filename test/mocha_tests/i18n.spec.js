import i18n from '../../src/plugins/i18n';

describe('i18n', () => {
  it('should have default locale as en', () => {
    expect(i18n.locale).to.equal('en');
  });

  it('should have fallback locale as en', () => {
    expect(i18n.fallbackLocale).to.equal('en');
  });

  it('should have messages for english, spanish', () => {
    expect(i18n.messages.en).to.exist;
    expect(i18n.messages.es).to.exist;
  });
});
