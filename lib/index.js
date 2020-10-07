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

const forumTypeDef = `


   type forum {
       _id: String
       name: String!
       userCreator: String!
       posts: [String]
   }

    input forumInput{
        name: String!
        userCreator: String!
   }

   type post {
       _id: String
       title: String
       content: String
       userCreator: String
       forum_id: String
       likes: Int
       comments: [String]
   }

    input postInput{
        title: String!
        content: String!
        userCreator: String!
        forum_id: String!
   }

   type postComment {
        _id: String
        content: String
        answer: [String]
        userCreator: String
    }

    input postCommentInput{
        content: String
        userCreator: String
   }

    type answer {
        _id: String
        content: String
        userCreator: String
    }

    input answerInput{
        content: String
        userCreator: String
   }

`;

const forumQueries = `
      getForums: [forum]
      getForumPosts(_idForum: String!): [post]
      getPostComments(_idForum: String!, _idPost: String!): [postComment]
      getCommentAnswers(_idForum: String!, _idPost: String!, _idComment: String!): [answer]
  `;


const forumMutations = `
  createForum(forum: forumInput!): forum
  createPost(_idForum: String! , post: postInput!): post
  createPostComment(_idForum: String!, _idPost: String!, postComment: postCommentInput!): postComment
  createCommentAnswer(_idForum: String!, _idPost: String!, _idComment: String!, answer: answerInput!): answer
  
  updateForum(_idForum: String!, forum: forumInput!): forum
  updatePost(_idForum: String!, _idPost: String!,post: postInput!): post
  updatePostComment(_idForum: String!, _idPost: String!, _idComment: String!,  postComment: postCommentInput!): postComment
  updateCommentAnswer(_idForum: String!, _idPost: String!, _idComment: String!,_idAnswer: String!,answer: answerInput!): answer

  deleteForum(_idForum: String!): forum
  deletePost(_idForum: String!, _idPost: String!): post
  deletePostComment(_idForum: String!, _idPost: String!,_idComment: String!): postComment
  deleteCommentAnswer(_idForum: String!, _idPost: String!,_idComment: String!,_idAnswer: String!): answer

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

const url$1 = '52.200.134.90';
const port$1 = '3000';

const URL$2 = `http://${url$1}:${port$1}`;


const resolvers$2 = {
	Query: {
		getForums: (_,) => {	
			return generalRequest(`${URL$2}/forums/`, 'GET')
        },
        getForumPosts: (_, { _idForum }) => {	
            return generalRequest(`${URL$2}/forums/${_idForum}/posts`, 'GET')
        },
        getPostComments: (_, { _idForum, _idPost }) => {	
			return generalRequest(`${URL$2}/forums/${_idForum}/posts/${_idPost}/comments`, 'GET')
        },
        getCommentAnswers: (_, { _idForum, _idPost, _idComment }) => {	
			return generalRequest(`${URL$2}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}/answers`, 'GET')
		}
	},
	Mutation: {
		createForum: (_, { forum }) =>{
			return generalRequest(`${URL$2}/forums/`, 'POST', forum)
		},
		createPost: (_, { _idForum , post }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}/posts`, 'POST', post)
		},
		createPostComment: (_, { _idForum,_idPost, postComment }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}/posts/${_idPost}/comments`, 'POST', postComment)
		},
		createCommentAnswer: (_, { _idForum,_idPost, _idComment, answer }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}/answers`, 'POST', answer)
		},


		updateForum: (_, { _idForum ,forum }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}`, 'PUT', forum)
		},
		updatePost: (_, { _idForum, _idPost , post }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}/posts/${_idPost}`, 'PUT', post)
		},
		updatePostComment: (_, { _idForum,_idPost , _idComment, postComment }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}`, 'PUT', postComment)
		},
		updateCommentAnswer: (_, { _idForum,_idPost, _idComment, _idAnswer, answer }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}/answers/${_idAnswer}`, 'PUT', answer)
		},

		deleteForum: (_, { _idForum }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}`, 'DELETE')
		},
		deletePost: (_, { _idForum, _idPost }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}/posts/${_idPost}`, 'DELETE')
		},
		deletePostComment: (_, { _idForum,_idPost , _idComment }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}`, 'DELETE')
		},
		deleteCommentAnswer: (_, { _idForum,_idPost, _idComment, _idAnswer }) =>{
			return generalRequest(`${URL$2}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}/answers/${_idAnswer}`, 'DELETE')
		},



        deleteCategory: (_, { id }) =>
			generalRequest(`${URL$2}/comment/delete/${id}`, 'DELETE')
    }
    
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commentTypeDef,
		resourceTypeDef,
		forumTypeDef
		
	],
	[
		commentQueries,
		resourceQueries,
		forumQueries
	],
	[
		commentMutations,
		resourceMutations,
		forumMutations
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
