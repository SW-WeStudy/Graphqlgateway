import { generalRequest } from "../../utilities";
import { url, port, entryPoint } from "./server";

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
  Query: {
    getAllCourses: (_) => {
      return generalRequest(`${URL}/getall`, "GET");
    },
    getCoursesByUser: (_, { id_user }) => {
      return generalRequest(`${URL}/getbyuser`, "GET", { id_user });
    },
    getUsers: (_, { id }) => {
      return generalRequest(`${URL}/getusers`, "GET", { id });
    },
    getNotesByClass: (_, { id_course }) => {
      return generalRequest(`${URL}/note/getnotesbyclass`, "GET", {
        id_course,
      });
    },
  },
  Mutation: {
	//   COURSES
    createCourse: (_, { course }) => {
      return generalRequest(`${URL}/create`, "POST", course);
    },
    updateCourse: (_, { course }) => {
      return generalRequest(`${URL}/edit`, "PUT", course);
    },
    deleteCourse: (_, { id }) => {
      return generalRequest(`${URL}/delete`, "DELETE", {
        id,
      });
	},
	// USERS COURSES
    removeUser: (_, { user }) => {
      return generalRequest(`${URL}/removeuser`, "DELETE", user);
    },
    addUser: (_, { user }) => {
      return generalRequest(`${URL}/adduser`, "POST", user);
	},
	// NOTES
    createNote: (_, { note }) => {
      return generalRequest(`${URL}/note/create`, "POST", note);
    },
    editNote: (_, { note }) => {
      return generalRequest(`${URL}/note/edit`, "PUT", note);
    },
    deleteNote: (_, { id_note }) => {
      return generalRequest(`${URL}/note/delete`, "DELETE", {
        id_course,
      });
    },
    qualifyNote: (_, { note }) => {
      return generalRequest(`${URL}/note/qualify`, "PUT", note);
    },
  },
};

export default resolvers;
