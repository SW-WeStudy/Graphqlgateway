import { generalRequest } from '../../utilities'
import { url, port } from "./server"

const URL = `http://${url}:${port}`;


const resolvers = {
	Query: {
		GetAllUserCourse: (_) => {
			return generalRequest(`${URL}/class/admin/usercourses`, 'GET')
		},
		GetAllCourses: (_) => {
			return generalRequest(`${URL}/class/admin/courses`, "GET");
		},
		GetAllAdminByCourseId: (_, { id }) => {
			return generalRequest(`${URL}/class/admin/getall`, "GET", { id});
		  }
	},
	Mutation: {
		AddUserCourse: (_,{user_course}) => {
			return generalRequest(`${URL}/class/admin/add`, 'POST', user_course)
		},
		UpdateUserRoleToAdmin: (_,{user_course}) => {
			return generalRequest(`${URL}/class/admin/set`, 'PUT', user_course)
		},
		UpdateUserRoleToUser: (_,{user_course}) => {
			return generalRequest(`${URL}/class/admin/remove`, 'PUT', user_course)
		}
	}
};

export default resolvers;