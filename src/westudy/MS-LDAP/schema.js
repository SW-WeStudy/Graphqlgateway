export const LDAPuserTypeDef = `
  type LDAPuser {
    name: String
    surName: String
    password: String
    email: String
  }

  input LDAPuserInput {
    name: String
    surName: String
    password: String
    email: String
  }

  type authConfirmation {
    status: Boolean
  }
`;

export const LDAPuserQueries = `
  LDAPAuthUser(email: String!, password:String!): authConfirmation
`;

export const LDAPuserMutations = `
  LDAPCreateUser(user: LDAPuserInput!): authConfirmation
`;
