'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */


/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */


/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const commentTypeDef = `
   type Comment {
       id: Int!
       idNote: Int
       idUser: String
       content: String
   }

   input CommentInput{
        idNote: Int!
        idUser: String!
        content: String!
   }
   
   type messageResult {
        res: String!
        message: String!
        id:Int
   }

`;

const commentQueries = `
      allComentsOfNote(id: Int!): [Comment]!
  `;


const commentMutations = `
  createComment(comment: CommentInput!): messageResult!
  updateComment(id: Int!, comment: CommentInput!): messageResult!
  deleteCategory(id: Int!): messageResult!
`;

const studyroomTypeDef = `

    type Studyroom {
        _id: String!
        courseId: Int!
        name: String!
        description: String!
        date: String!
        url: String!
        duration: Int!
        ownerName:  String!
        ownerEmail: String!
        calendarEventId: String!
        students: [Student]!
        resources: [ResourceSR]!
        createdAt: String!
        updatedAt: String!
    }

    input StudyroomInput {
        courseId: String!
        name: String!
        description: String!
        date: String!
        duration: Int!
        ownerName: String!
        ownerEmail: String!
    }

    type ResourceSR {
        _id: String!
        resource: String!
        author: String!
        authorImage: String!
        description: String!
        createdAt: String!
        updatedAt: String!
    }

    input ResourceSRInput {
        resource: String!
        author: String!
        authorImage: String!
        description: String!
    }
    
    type Student {
        _id: String!
        name: String!
        picture: String!
        email: String!
    }

    input StudentInput {
        name: String!
        picture: String!
        email: String!
    }

    type Rmstudent {
        _id: String!
    }
    input RmstudentInput{
        _id: String!
    }

`;

const studyroomsQueries = `
    get_study_rooms: [Studyroom]
    get_study_room(sr_id: String!): Studyroom

    get_resources(sr_id: String!): [ResourceSR]
    get_resource(sr_id: String!, _id: String!): ResourceSR

    get_students(sr_id: String!): [Student]

  
`;

const studyroomsMutations = `
    create_study_room(studyroom: StudyroomInput!): Studyroom!
    delete_study_rooms: messageResult!
    update_study_room(sr_id: String!, studyroom: StudyroomInput!): Studyroom!
    delete_study_room(sr_id: String!): Studyroom!

    create_resource(sr_id: String!, resource: ResourceSRInput!):    Studyroom!
    delete_resources(sr_id: String!): Studyroom!
    update_resource(sr_id: String!, _id: String!, resource: ResourceSRInput!): Studyroom!
    delete_resource(sr_id: String!, _id: String!): Studyroom!

    inscribe_student(sr_id: String!, student: StudentInput!): Studyroom!
    delete_student(sr_id: String!, rmstudent: RmstudentInput! ): Studyroom!

    
`;
//

const resourceTypeDef = `
   type Resource {
       id: Int!
       idClase: Int
       idUser: String
       content: String
   }

   input ResourceInput{
          idUser: String!
          idClase: Int!
        content: String!
   }
`;

const resourceQueries = `
      allResourcesOfClass(id: Int!): [Resource]!
  `;


const resourceMutations = `
  createResource(resource: ResourceInput!): messageResult!
  updateResource(id: Int!, resource: ResourceInput!): messageResult!
  deleteResource(id: Int!): messageResult!
`;

const usercreatedTypeDef = `
    type Usercreated {
        _id: String!
        user: String!,
        studyrooms: [Studyroom]
    }
    input UsercreatedInput {
        user: String!
    }
`;
const usercreatedQueries = `
    get_srs_created_by_user(user: String!): Usercreated
`;

const usercreatedMutations = `
    delete_srs_created_by_user(user: String!): Usercreated
`;

const url = '34.224.170.220';
const port = '8080';
const entryPoint = 'course';

const URL = `http://${url}:${port}/${entryPoint}/notes`;


const resolvers = {
	Query: {
		allComentsOfNote: (_, { id }) => {	
			return generalRequest(`${URL}/getcomments/${id}`, 'GET')
		}
	},
	Mutation: {
		createComment: (_, { comment }) =>{
			return generalRequest(`${URL}/comment/create`, 'POST', comment)
		},
        updateComment: (_, { id, comment }) =>
			generalRequest(`${URL}/comment/edit/${id}`, 'PUT', comment),
        deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/comment/delete/${id}`, 'DELETE')
	}
};

const URL$1 = `http://${url}:${port}/${entryPoint}/resources`;


const resolvers$1 = {
	Query: {
		allResourcesOfClass: (_, { id }) => {	
			return generalRequest(`${URL$1}/get/${id}`, 'GET')
		}
	},
	Mutation: {
		createResource: (_, { resource }) =>{
			return generalRequest(`${URL$1}/create`, 'POST', resource)
		},
        updateResource: (_, { id, resource }) =>
			generalRequest(`${URL$1}/edit/${id}`, 'PUT', resource),
        deleteResource: (_, { id }) =>
			generalRequest(`${URL$1}/delete/${id}`, 'DELETE')
	}
};

const url$1 = '54.92.227.88';
const port$1 = '3000';
const entryPoint$1 = 'studyrooms';
const entryPointuc = 'usercreates';

const URL$2 = `http://${url$1}:${port$1}/${entryPoint$1}`;
const resolvers$2 = {
	Query: {
		get_study_rooms: (_,) => {	
			return generalRequest(`${URL$2}`, 'GET')
		},
		get_study_room: (_, {sr_id }) => {	
			return generalRequest(`${URL$2}/${sr_id}`, 'GET')
		},
		get_resources: (_, {sr_id}) => {
			return generalRequest(`${URL$2}/${sr_id}/resources`, 'GET')
		},
		get_resource: (_, {_id, sr_id }) => {
			return generalRequest(`${URL$2}/${sr_id}/resources/${_id}`, 'GET')
		},
		get_students: (_, {sr_id}) => {
			return generalRequest(`${URL$2}/${sr_id}/students`, 'GET')
		},
		
	},
	Mutation: {
		
		create_study_room: (_, { studyroom }) =>{
			return generalRequest(`${URL$2}`, 'POST', studyroom)
		},
		delete_study_rooms: (_,) => {
			return generalRequest(`${URL$2}`, 'DELETE') // Probar de últimas.
		},
		update_study_room: (_, { sr_id, studyroom }) => {
			return generalRequest(`${URL$2}/${sr_id}`, 'PUT', studyroom)
		},
		delete_study_room: (_, {sr_id}) => {
			return generalRequest(`${URL$2}/${sr_id}`, 'DELETE')
		},



		create_resource: (_, {sr_id, resource }) =>{
			return generalRequest(`${URL$2}/${sr_id}/resources`, 'POST', resource)
		},
		delete_resources: (_, {sr_id}) => {
			return generalRequest(`${URL$2}/${sr_id}/resources`, 'DELETE') 
		},
		update_resource: (_, { sr_id, _id, resource }) => {
			return generalRequest(`${URL$2}/${sr_id}/resources/${_id}`, 'PUT', resource)
		},
		delete_resource: (_, {sr_id, _id}) => {
			return generalRequest(`${URL$2}/${sr_id}/resources/${_id}`, 'DELETE')
		},


		inscribe_student: (_, {sr_id, student}) => {
			return generalRequest(`${URL$2}/${sr_id}/students`, 'POST', student)
		},
		delete_student: (_, {sr_id, rmstudent}) => {
			return generalRequest(`${URL$2}/${sr_id}/students`, 'DELETE', rmstudent) 
		},
 
			
	}
	
};

const URL$3 = `http://${url$1}:${port$1}/${entryPointuc}`;

const resolvers$3 = {
    Query: {
        get_srs_created_by_user: (_, {user}) => {
            return generalRequest(`${URL$3}`, 'GET',{user})
        }
    },
    Mutation: {
        delete_srs_created_by_user: (_, {user}) => {
            console.log(user);
            return generalRequest(`${URL$3}`,'DELETE',{user})
        },
    }
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commentTypeDef,
		resourceTypeDef,
		studyroomTypeDef,
		usercreatedTypeDef
		
	],
	[
		commentQueries,
		resourceQueries,
		studyroomsQueries,
		usercreatedQueries,
	],
	[
		commentMutations,
		resourceMutations,
		studyroomsMutations,
		usercreatedMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2,
		resolvers$3
	)
});

const app = new Koa();
const PORT = process.env.PORT || 5000;
const router = new KoaRouter();

app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
