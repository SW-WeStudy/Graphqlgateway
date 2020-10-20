export const adminTypeDef = `
   type Curso {
    id_course: Int,
    name: String,
    forum: String
   }

   type UserCurso {
    id_user_course: Int,
    id_user: String,
    id_course: Int,
    rol: String,
    state: String
   }


   input inputUserCurso {
    id_user_course: Int,
    id_user: String,
    id_course: Int,
    rol: String,
    state: String
   }

`;

export const adminQueries = `
      GetAllUserCourse: [UserCurso]!
      GetAllCourses: [Curso]!
      GetAllAdminByCourseId(id: Int!):[UserCurso]!
  `;


export const adminMutations = `
      AddUserCourse(user_course: inputUserCurso!): UserCurso!
      UpdateUserRoleToAdmin(user_course: inputUserCurso!): String!
      UpdateUserRoleToUser(user_course: inputUserCurso!): String!
`;