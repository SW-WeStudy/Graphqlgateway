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

const userTypeDef = `
  type user {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    role: String
    disabled: Boolean
    idCourses: [Boolean]
    idForum: [Boolean]
    idStudyRooms: [Boolean]
  }

  input userInput1 {
    email: String
    displayName: String
    password: String
  }

  input userInput2 {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    role: String
    disable: Boolean
    idCourses: [Boolean]
    idForum: [Boolean]
    idStudyRooms: [Boolean]
  }

  type userAuth {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    disabled: Boolean
  }

  input userAuthInput {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    disabled: Boolean
  }

  type dataDoc {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    role: String
    disable: Boolean
    idCourses: [Boolean]
    idForum: [Boolean]
    idStudyRooms: [Boolean]
  }

  input dataDocInput {
    uid: String
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    password: String
    role: String
    disable: Boolean
    idCourses: [Boolean]
    idForum: [Boolean]
    idStudyRooms: [Boolean]
  }
`;

const userQueries = `
  getUserByUid(uid: String!): user
  getUserByEmail(email: String!): user
`;

const userMutations = `
  createUser(user: userInput1!): userAuth
  updateUser(user: userInput2!):  userAuth
  putDownUser(uid: String!): dataDoc
  putUpUser(uid: String!):  userAuth
  deleteUser(uid: String!): Boolean
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

const url$1 = '3.233.2.82';
const port$1 = '3000';

const URL$2 = `http://${url$1}:${port$1}`;

const resolvers$2 = {
  Query: {
		getUserByUid: (_, { uid }) => {
			return generalRequest(`${URL$2}/auth/getuserbyuid/`, 'GET', { uid })
		},
  	getUserByEmail: (_, {email}) => {
			return generalRequest(`${URL$2}/auth/getuserbyemail/`, 'GET', {email})
		}
	},
	Mutation: {
		createUser: (_,{user}) => {
			return generalRequest(`${URL$2}/auth/createuser/`, 'POST', user)
		},
		updateUser: (_, {user}) => {
			return generalRequest(`${URL$2}/auth/updateuser/`, 'PUT', user)
		}, 
  	putDownUser:(_, {uid}) => {
			return generalRequest(`${URL$2}/auth/putdowuser/`, 'PUT', uid)
		},
		putUpUser: (_, {uid}) => {
			return generalRequest(`${URL$2}/auth/putupuser/`, 'PUT', {uid})
    },
    deleteUser:(_, {uid}) => {
      return generalRequest(`${URL$2}/auth/deleteuser/`, 'DELETE')
    }
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commentTypeDef,
		resourceTypeDef,
		userTypeDef
	],
	[
		commentQueries,
		resourceQueries,
		userQueries
	],
	[
		commentMutations,
		resourceMutations,
		userMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2
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
