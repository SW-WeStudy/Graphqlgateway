import { generalRequest } from '../../../utilities'
import { url, port, entryPointuc } from "../server"

const URL = `http://${url}:${port}/${entryPointuc}`;

const resolvers = {
    Query: {
        get_srs_created_by_user: (_, {user}) => {
            return generalRequest(`${URL}`, 'GET',{user})
        }
    },
    Mutation: {
        delete_srs_created_by_user: (_, {user}) => {
            return generalRequest(`${URL}`,'DELETE',{user})
        },
    }
}

export default resolvers;