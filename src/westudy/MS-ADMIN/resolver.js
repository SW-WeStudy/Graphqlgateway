import { generalRequest } from '../../utilities'
import { url, port } from "./server"

const URL = `http://${url}:${port}`;


const resolvers = {
	Query: {
		GetAllUserCourse: (vasd) => {	
			return generalRequest(`${URL}/class/admin/usercourses`, 'GET')
		}
	},
};

export default resolvers;