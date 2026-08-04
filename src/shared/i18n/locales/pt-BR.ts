export const ptBRMessages = {
  validation: {
    required: 'O campo {field} é obrigatório.',
    string: 'O campo {field} deve ser um texto.',
    email: 'Informe um endereço de e-mail válido.',
    minLength: 'O campo {field} deve possuir pelo menos {min} caracteres.',
    maxLength: 'O campo {field} deve possuir no máximo {max} caracteres.',
    number: 'O campo {field} deve ser um número.',
    integer: 'O campo {field} deve ser um número inteiro.',
    positive: 'O campo {field} deve ser maior que zero.',
    invalidId: 'O campo {field} possui um identificador inválido.'
  },

  fields: {
    name: 'nome',
    email: 'e-mail',
    password: 'senha',
    roleId: 'perfil',
    title: 'título',
    description: 'descrição'
  },

  user: {
    createdSuccessfully: 'Usuário criado com sucesso.',
    emailAlreadyExists: 'Já existe um usuário cadastrado com este e-mail.',
    notFound: 'O usuário informado não foi encontrado.',
    inactive: 'A conta do usuário está inativa.'
  },

    role: {
    notFound: 'Perfil não encontrado.',
    inactive: 'O perfil selecionado está inativo.',
    defaultNotConfigured: 'O perfil padrão de usuário não está configurado.'
  },

  auth: {
    invalidCredentials: 'E-mail ou senha inválidos.',
    inactiveUser: 'O usuário está inativo. Entre em contato com o administrador do sistema.',
    invalidToken: 'O token informado é inválido.',
    expiredToken: 'O token informado expirou. Faça login novamente para obter um novo token.',
    missingToken: 'O token de autenticação não foi informado. Faça login para obter um token válido.'
  },

  ticket: {
    notFound: 'O ticket informado não foi encontrado.',
    invalidStatus: 'O status informado é inválido.',  
  }
} as const;