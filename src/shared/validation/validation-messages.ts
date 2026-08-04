import { t } from '../i18n/translate.js';

export const validationMessage = {
  required(field: string): string {
    return t('validation.required', { field: t(`fields.${field}`) });
  },

  email(field: string): string {
    return t('validation.email', { field: t(`fields.${field}`) });
  },

  minLength(field: string, min: number): string {
    return t('validation.minLength', {
      field: t(`fields.${field}`),
      min
    });
  },

  maxLength(field: string, max: number): string {
    return t('validation.maxLength', {
      field: t(`fields.${field}`),
      max
    });
  },

  number(field: string): string {
    return t('validation.number', {
      field: t(`fields.${field}`)
    });
  },

  integer(field: string): string {
    return t('validation.integer', {
      field: t(`fields.${field}`)
    });
  },

  positive(field: string): string {
    return t('validation.positive', {
      field: t(`fields.${field}`)
    });
  }
};