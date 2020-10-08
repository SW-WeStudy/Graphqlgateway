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

`;

export const adminQueries = `
      GetAllUserCourse(var:Boolean): [UserCurso]!
  `;


export const adminMutations = `
  
`;  