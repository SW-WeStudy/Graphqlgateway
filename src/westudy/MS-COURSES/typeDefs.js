export const courseTypeDef = `
   type Course {
       id_course: Int!
       name: String
       forum: String
   }
    type Note {
        id_note: Int!
        content: String
        id_user: Int
        score: Float
        id_course: Int
    }
    type CourseUser {
        id_user_course: Int!
        id_user: String
        id_course: Int
        rol: String
        state:Int
    }

   input CourseInput{
        id:Int
        name: String
        forum: String
   }
    input CourseUserInput{
        id_user: String!
        id_course: Int!
        rol: String
        state:Int
    }
    input NoteInput{
        content: String!
        id_user: Int!
        score: Float
        id_course: Int!
    }
    input NoteEditInput{
        content: String!
        id_note: Int!
    }
    input NoteQualifyInput{
        score: Float!
        id_note: Int!
    }

   
   type messageResultCourse {
        ok: Boolean
        message: String
   }

`;
// ---------Courses-----------
export const courseQueries = `
      getAllCourses: [Course]!
      getCoursesByUser(id_user:Int!):[Course]!
      
  `;


export const courseMutations = `
    createCourse(course: CourseInput!): messageResultCourse!
    updateCourse(course: CourseInput!): messageResultCourse!
    deleteCourse(id: Int!): messageResultCourse!
`;  

// ---------------------- Course User ----------------
export const courseUserQueries = `
  getUsers(id:Int!):[CourseUser]!
`;


export const courseUserMutations = `
removeUser(user: CourseUserInput!): messageResultCourse!
addUser(user: CourseUserInput!): messageResultCourse!
`;  

// ---------------------- Notes ----------------
export const noteQueries = `
      getNotesByClass(id_course: Int!): [Note]!
  `;

export const noteMutations = `
  createNote(note: NoteInput!): messageResultCourse!
  editNote(note: NoteEditInput!): messageResultCourse!
  deleteNote(id_note: Int!): messageResultCourse!
  qualifyNote(note: NoteQualifyInput!): messageResultCourse!
`;  
