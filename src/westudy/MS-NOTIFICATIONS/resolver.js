import { generalRequest } from '../../utilities'
import { url, port} from "./server"

const URL = `http://${url}:${port}`;


const resolvers = {

	Mutation: {
		pushNotification: (_, { notification }) =>{
			return generalRequest(`${URL}/push`, 'POST', notification)
		},
		subscribeUser: (_, { subscription }) =>{
			console.log(subscription)
			return generalRequest(`${URL}/subscribe`, 'POST', {subscription})
		},
    }
    
};

export default resolvers;