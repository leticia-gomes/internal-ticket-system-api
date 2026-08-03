import 'dotenv/config';

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

export const environment = {
  nodeEnv: process.env.NODE_ENV ?? 'development',

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