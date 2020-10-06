import { generalRequest } from '../../../utilities'
import { url, port, entryPoint } from "../server"

const URL = `http://${url}:${port}/${entryPoint}/resources`;


const resolvers = {
	Query: {
		allResourcesOfClass: (_, { id }) => {	
			return generalRequest(`${URL}/get/${id}`, 'GET')
		}
	},
	Mutation: {
		createResource: (_, { resource }) =>{
			return generalRequest(`${URL}/create`, 'POST', resource)
		},
        updateResource: (_, { id, resource }) =>
			generalRequest(`${URL}/edit/${id}`, 'PUT', resource),
        deleteResource: (_, { id }) =>
			generalRequest(`${URL}/delete/${id}`, 'DELETE')
	}
};

export default resolvers;