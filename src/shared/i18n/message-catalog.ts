import { environment } from '../../config/environment.js';

import { enMessages } from './locales/en.js';
import { ptBRMessages } from './locales/pt-BR.js';
import type { SupportedLocale } from './i18n.types.js';

const translations = {
  'pt-BR': ptBRMessages,
  'en': enMessages
};

type TranslationValues = Record<string, string | number>;

function getNestedValue(
  object: object,
  path: string
): string | undefined {
  return path.split('.').reduce<unknown>((current, key) => {
    if (
      typeof current !== 'object' ||
      current === null ||
      !(key in current)
    ) {
      return undefined;
    }

    return (current as Record<string, unknown>)[key];
  }, object) as string | undefined;
}

export function translate(
  key: string,
  values: TranslationValues = {},
  locale: SupportedLocale = environment.locale
): string {
  const dictionary = translations[locale];

  const message =
    getNestedValue(dictionary, key) ??
    getNestedValue(translations.en, key) ??
    key;

  return Object.entries(values).reduce(
    (translatedMessage, [name, value]) =>
      translatedMessage.replaceAll(`{${name}}`, String(value)),
    message
  );
}