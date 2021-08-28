import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from '../locale';

const I18nProvider = ({ children }) => {
  const [i18n, setI18n] = useState();

  useEffect(() => {
    const createI18nInstance = async () => {
      const i18instance = i18next.createInstance();
      await i18instance.use(initReactI18next).init({
        resources,
        lng: 'ru',
      });
      setI18n(i18instance);
    };

    createI18nInstance();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;
