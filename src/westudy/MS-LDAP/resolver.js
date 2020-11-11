import { generalRequest } from '../../utilities'
import { url, port} from "./server"

const URL = `http://${url}:${port}`;

const resolvers = {
  Query: {
        LDAPAuthUser: (_, { email, password }) => {
			return generalRequest(`${URL}/auth/authuserldap`, 'GET', { email, password })
		},
	},
	Mutation: {
		LDAPCreateUser: (_,{LDAPuser}) => {
			return generalRequest(`${URL}/auth/createuserldap`, 'POST', LDAPuser)
		},
	}
};

export default resolvers;
