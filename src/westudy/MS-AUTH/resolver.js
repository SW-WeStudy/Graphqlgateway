import { generalRequest } from '../../utilities'
import { url, port} from "./server"

const URL = `http://${url}:${port}`;

const resolvers = {
  Query: {
		getUserByUid: (_, { uid }) => {
			return generalRequest(`${URL}/auth/getuserbyuid/`, 'GET', { uid })
		},
  	getUserByEmail: (_, {email}) => {
			return generalRequest(`${URL}/auth/getuserbyemail/`, 'GET', {email})
		}
	},
	Mutation: {
		createUser: (_,{user}) => {
			return generalRequest(`${URL}/auth/createuser/`, 'POST', user)
		},
		updateUser: (_, {user}) => {
			return generalRequest(`${URL}/auth/updateuser/`, 'PUT', user)
		}, 
  	putDownUser:(_, {uid}) => {
			return generalRequest(`${URL}/auth/putdowuser/`, 'PUT', uid)
		},
		putUpUser: (_, {uid}) => {
			return generalRequest(`${URL}/auth/putupuser/`, 'PUT', {uid})
    },
    deleteUser:(_, {uid}) => {
      return generalRequest(`${URL}/auth/deleteuser/`, 'DELETE')
    }
	}
};

export default resolvers;