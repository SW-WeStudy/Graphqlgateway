export const soapTypeDef = `
    type Teacher {
        name: String!
        mail: String!
    }
`
// ---------teachers-----------
export const soapQueries = `
      getTeachers: [Teacher]!  
  `;