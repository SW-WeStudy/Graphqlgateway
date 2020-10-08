import { generalRequest } from '../../../utilities'
import { url, port, entryPoint } from "../server"

const URL = `http://${url}:${port}/${entryPoint}`;
const resolvers = {
	Query: {
		get_study_rooms: (_,) => {	
			return generalRequest(`${URL}`, 'GET')
		},
		get_study_room: (_, {sr_id }) => {	
			return generalRequest(`${URL}/${sr_id}`, 'GET')
		},
		get_resources: (_, {sr_id}) => {
			return generalRequest(`${URL}/${sr_id}/resources`, 'GET')
		},
		get_resource: (_, {_id, sr_id }) => {
			return generalRequest(`${URL}/${sr_id}/resources/${_id}`, 'GET')
		},
		get_students: (_, {sr_id}) => {
			return generalRequest(`${URL}/${sr_id}/students`, 'GET')
		},
		
	},
	Mutation: {
		
		create_study_room: (_, { studyroom }) =>{
			return generalRequest(`${URL}`, 'POST', studyroom)
		},
		delete_study_rooms: (_,) => {
			return generalRequest(`${URL}`, 'DELETE') // Probar de últimas.
		},
		update_study_room: (_, { sr_id, studyroom }) => {
			return generalRequest(`${URL}/${sr_id}`, 'PUT', studyroom)
		},
		delete_study_room: (_, {sr_id}) => {
			return generalRequest(`${URL}/${sr_id}`, 'DELETE')
		},



		create_resource: (_, {sr_id, resource }) =>{
			return generalRequest(`${URL}/${sr_id}/resources`, 'POST', resource)
		},
		delete_resources: (_, {sr_id}) => {
			return generalRequest(`${URL}/${sr_id}/resources`, 'DELETE') 
		},
		update_resource: (_, { sr_id, _id, resource }) => {
			return generalRequest(`${URL}/${sr_id}/resources/${_id}`, 'PUT', resource)
		},
		delete_resource: (_, {sr_id, _id}) => {
			return generalRequest(`${URL}/${sr_id}/resources/${_id}`, 'DELETE')
		},


		inscribe_student: (_, {sr_id, student}) => {
			return generalRequest(`${URL}/${sr_id}/students`, 'POST', student)
		},
		delete_student: (_, {sr_id, rmstudent}) => {
			return generalRequest(`${URL}/${sr_id}/students`, 'DELETE', rmstudent) 
		},
 
			
	}
	
};

export default resolvers;