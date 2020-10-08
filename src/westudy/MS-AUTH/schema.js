export const userTypeDef = `
  type user {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    role: String
    disabled: Boolean
    idCourses: [Boolean]
    idForum: [Boolean]
    idStudyRooms: [Boolean]
  }

  input userInput1 {
    email: String
    displayName: String
    password: String
  }

  input userInput2 {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    role: String
    disable: Boolean
    idCourses: [Boolean]
    idForum: [Boolean]
    idStudyRooms: [Boolean]
  }

  type userAuth {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    disabled: Boolean
  }

  input userAuthInput {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    disabled: Boolean
  }

  type dataDoc {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    role: String
    disable: Boolean
    idCourses: [Boolean]
    idForum: [Boolean]
    idStudyRooms: [Boolean]
  }

  input dataDocInput {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    role: String
    disable: Boolean
    idCourses: [Boolean]
    idForum: [Boolean]
    idStudyRooms: [Boolean]
  }
`;

export const userQueries = `
  getUserByUid(uid: String!): user
  getUserByEmail(email: String!): user
`;

export const userMutations = `
  createUser(user: userInput1!): userAuth
  updateUser(user: userInput2!):  userAuth
  putDownUser(uid: String!): dataDoc
  putUpUser(uid: String!):  userAuth
  deleteUser(uid: String!): Boolean
`;