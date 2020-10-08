import { generalRequest } from '../../../utilities'
import { url, port, entryPoint } from "../server"

const URL = `http://${url}`;


const resolvers = {
	Query: {
		health: (_,) => {	
			return generalRequest(`${URL}/health`, 'GET')
		},
		listDocs: (_,) => {	
			return generalRequest(`${URL}/listDocs`, 'GET')
		},
		listDocsByTags: (_,) => {	
			return generalRequest(`${URL}/listDocs/tags`, 'GET')
		},
		listDocsByType: (_,) => {	
			return generalRequest(`${URL}/listDocs/type`, 'GET')
		},
		searchDocsByText: (_, { textDoc }) => {
			return generalRequest(`${URL}/searchDocs/text`, 'POST', textDoc)
		},
		searchDocsByTags: (_, { tagsDoc }) => {
			return generalRequest(`${URL}/searchDocs/tags`, 'POST', tagsDoc)
		},
		searchDocsByType: (_, { typeDoc }) => {
			return generalRequest(`${URL}/searchDocs/type`, 'POST', typeDoc)
		}
	},
	Mutation: {
        insertDocument: (_, { doc }) =>
			generalRequest(`${URL}/insertDoc`, 'PUT', doc),

        deleteDocument: (_, { doc }) =>
			generalRequest(`${URL}/deleteDoc`, 'POST', doc)
	}
};

export default resolvers;