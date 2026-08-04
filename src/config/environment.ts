import 'dotenv/config';
import { SupportedLocale } from '../shared/i18n/i18n.types.js';

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getNumberEnvironmentVariable(
  name: string,
  defaultValue: number
): number {
  const value = process.env[name];

  if (!value) {
    return defaultValue;
  }

  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Environment variable ${name} must be a valid number`);
  }

  return parsedValue;
}

const supportedLocales = ['pt-BR', 'en'] as const;

const locale = supportedLocales.includes(process.env.APP_LOCALE as SupportedLocale)
  ? (process.env.APP_LOCALE as SupportedLocale): 'en';
  
export const environment = {
  nodeEnv: process.env.NODE_ENV ?? 'development',

  locale: locale,

  application: {
    port: getNumberEnvironmentVariable('PORT', 3333),
    frontendUrl:
      process.env.FRONTEND_URL ?? 'http://localhost:5173'
  },

  database: {
    host: getRequiredEnvironmentVariable('DATABASE_HOST'),
    port: getNumberEnvironmentVariable('DATABASE_PORT', 3306),
    username: getRequiredEnvironmentVariable('DATABASE_USERNAME'),
    password: process.env.DATABASE_PASSWORD ?? '',
    name: getRequiredEnvironmentVariable('DATABASE_NAME')
  }
};