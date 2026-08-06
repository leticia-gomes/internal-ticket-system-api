export const enMessages = {
  validation: {
    required: 'The {field} field is required.',
    string: 'The {field} field must be a string.',
    email: 'Enter a valid email address.',
    minLength: 'The {field} field must contain at least {min} characters.',
    maxLength: 'The {field} field must contain at most {max} characters.',
    number: 'The {field} field must be a number.',
    integer: 'The {field} field must be an integer.',
    positive: 'The {field} field must be greater than zero.',
    invalidId: 'The {field} field contains an invalid identifier.'
  },

  fields: {
    name: 'name',
    email: 'email',
    password: 'password',
    roleId: 'role',
    title: 'title',
    description: 'description'
  },

  common: {
    validationFailed: 'Validation failed',
    internalServerError: 'Internal server error'
  },

  user: {
    createdSuccessfully: 'User created successfully.',
    emailAlreadyExists: 'A user with this email already exists.',
    notFound: 'The specified user was not found.',
    inactive: 'The user account is inactive.'
  },

   role: {
    notFound: 'Role not found.',
    inactive: 'The selected role is inactive.',
    defaultNotConfigured: 'Default user role is not configured.'
  },

  auth: {
    invalidCredentials: 'Invalid email or password.',
    inactiveUser: 'The user is inactive. Please contact the system administrator.',
    invalidToken: 'The provided token is invalid or expired. Please log in again to obtain a new token.',
    tokenNotProvided: 'The authentication token was not provided. Please log in to obtain a valid token.'
  },

  ticket: {
    notFound: 'The provided ticket was not found.',
    invalidStatus: 'The provided status is invalid.',  
  }
} as const;