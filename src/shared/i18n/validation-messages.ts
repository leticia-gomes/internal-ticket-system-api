import { translate } from './message-catalog.js';

export const validationMessage = {
  required(field: string): string {
    return translate('validation.required', { field: translate(`fields.${field}`) });
  },

  email(field: string): string {
    return translate('validation.email', { field: translate(`fields.${field}`) });
  },

  minLength(field: string, min: number): string {
    return translate('validation.minLength', {
      field: translate(`fields.${field}`),
      min
    });
  },

  maxLength(field: string, max: number): string {
    return translate('validation.maxLength', {
      field: translate(`fields.${field}`),
      max
    });
  },

  number(field: string): string {
    return translate('validation.number', {
      field: translate(`fields.${field}`)
    });
  },

  integer(field: string): string {
    return translate('validation.integer', {
      field: translate(`fields.${field}`)
    });
  },

  positive(field: string): string {
    return translate('validation.positive', {
      field: translate(`fields.${field}`)
    });
  }
};