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

const documentTypeDef = `
   input initialDocument {
     class_id: String!
     tags: String!
     type: String!
     text: String
   }

   type Document {
     class: String!
     tags: String!
     type: String!
     text: String!
   }

   type listResult {
      data: [Document]!
   }

   type helperTagsType {
      name: String!
      docs: [Document]!
   }

   type listHelpers {
      data: [helperTagsType]!
   }

   type esVersion {
    number: String!
    build_flavor: String!
    build_type: String!
    build_hash: String!
    build_date: String!
    build_snapshot: String!
    lucene_version: String!
    minimum_wire_compatibility_version: String!
    minimum_index_compatibility_version: String!
   }

   type esRetries {
    bulk: Int!
    search: Int!
   }

   type esHealth {
      name: String!
      cluster_name: String!
      cluster_uuid: String!
      version: esVersion!
      tagline: String!
   }

   type esDelete {
    took: Int!
    timed_out: Boolean!
    total: Int!
    deleted: Int!
    batches: Int!
    version_conflicts: Int!
    noops: Int!
    retries: esRetries!
    throttled_millis: Int!
    requests_per_second: Float
    throttled_until_millis: Int!
    failures: [Int]!
}




`;

const documentQueries = `
      health: esHealth!
      listDocs: listResult!
      listDocsByTags: listHelpers!
      listDocsByType: listHelpers!
      searchDocsByText(textDoc: initialDocument): listResult!
      searchDocsByTags(tagsDoc: initialDocument): listResult!
      searchDocsByType(typeDoc: initialDocument): listResult!
  `;


const documentMutations = `
  insertDocument(doc: initialDocument): String!
  deleteDocument(doc: initialDocument): esDelete!
`;

const courseTypeDef = `
   type Course {
       id_course: Int!
       name: String
       forum: String
   }
    type Note {
        id_note: Int!
        content: String
        id_user: Int
        score: Float
        id_course: Int
    }
    type CourseUser {
        id_user_course: Int!
        id_user: String
        id_course: Int
        rol: String
        state:Int
    }

   input CourseInput{
        id:Int
        name: String
        forum: String
   }
    input CourseUserInput{
        id_user: String!
        id_course: Int!
        rol: String
        state:Int
    }
    input NoteInput{
        content: String!
        id_user: Int!
        score: Float
        id_course: Int!
    }
    input NoteEditInput{
        content: String!
        id_note: Int!
    }
    input NoteQualifyInput{
        score: Float!
        id_note: Int!
    }

   
   type messageResultCourse {
        ok: Boolean
        message: String
   }

`;
// ---------Courses-----------
const courseQueries = `
      getAllCourses: [Course]!
      getCoursesByUser(id_user:Int!):[Course]!
      
  `;


const courseMutations = `
    createCourse(course: CourseInput!): messageResultCourse!
    updateCourse(course: CourseInput!): messageResultCourse!
    deleteCourse(id: Int!): messageResultCourse!
`;  

// ---------------------- Course User ----------------
const courseUserQueries = `
  getUsers(id:Int!):[CourseUser]!
`;


const courseUserMutations = `
removeUser(user: CourseUserInput!): messageResultCourse!
addUser(user: CourseUserInput!): messageResultCourse!
`;  

// ---------------------- Notes ----------------
const noteQueries = `
      getNotesByClass(id_course: Int!): [Note]!
  `;

const noteMutations = `
  createNote(note: NoteInput!): messageResultCourse!
  editNote(note: NoteEditInput!): messageResultCourse!
  deleteNote(id_note: Int!): messageResultCourse!
  qualifyNote(note: NoteQualifyInput!): messageResultCourse!
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

const url$1 = '18.216.71.164';
const port$1 = '80';
const entryPoint$1 = 'course';

const URL$2 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$2 = {
  Query: {
    getAllCourses: (_) => {
      return generalRequest(`${URL$2}/getall`, "GET");
    },
    getCoursesByUser: (_, { id_user }) => {
      return generalRequest(`${URL$2}/getbyuser`, "GET", { id_user });
    },
    getUsers: (_, { id }) => {
      return generalRequest(`${URL$2}/getusers`, "GET", { id });
    },
    getNotesByClass: (_, { id_course }) => {
      return generalRequest(`${URL$2}/note/getnotesbyclass`, "GET", {
        id_course,
      });
    },
  },
  Mutation: {
	//   COURSES
    createCourse: (_, { course }) => {
      return generalRequest(`${URL$2}/create`, "POST", course);
    },
    updateCourse: (_, { course }) => {
      return generalRequest(`${URL$2}/edit`, "PUT", course);
    },
    deleteCourse: (_, { id }) => {
      return generalRequest(`${URL$2}/delete`, "DELETE", {
        id,
      });
	},
	// USERS COURSES
    removeUser: (_, { user }) => {
      return generalRequest(`${URL$2}/removeuser`, "DELETE", user);
    },
    addUser: (_, { user }) => {
      return generalRequest(`${URL$2}/adduser`, "POST", user);
	},
	// NOTES
    createNote: (_, { note }) => {
      return generalRequest(`${URL$2}/note/create`, "POST", note);
    },
    editNote: (_, { note }) => {
      return generalRequest(`${URL$2}/note/edit`, "PUT", note);
    },
    deleteNote: (_, { id_note }) => {
      return generalRequest(`${URL$2}/note/delete`, "DELETE", {
        id_course,
      });
    },
    qualifyNote: (_, { note }) => {
      return generalRequest(`${URL$2}/note/qualify`, "PUT", note);
    },
  },
};

const url$2 = '75.101.185.140';

const URL$3 = `http://${url$2}`;


const resolvers$3 = {
	Query: {
		health: (_,) => {	
			return generalRequest(`${URL$3}/health`, 'GET')
		},
		listDocs: (_,) => {	
			return generalRequest(`${URL$3}/listDocs`, 'GET')
		},
		listDocsByTags: (_,) => {	
			return generalRequest(`${URL$3}/listDocs/tags`, 'GET')
		},
		listDocsByType: (_,) => {	
			return generalRequest(`${URL$3}/listDocs/type`, 'GET')
		},
		searchDocsByText: (_, { textDoc }) => {
			return generalRequest(`${URL$3}/searchDocs/text`, 'POST', textDoc)
		},
		searchDocsByTags: (_, { tagsDoc }) => {
			return generalRequest(`${URL$3}/searchDocs/tags`, 'POST', tagsDoc)
		},
		searchDocsByType: (_, { typeDoc }) => {
			return generalRequest(`${URL$3}/searchDocs/type`, 'POST', typeDoc)
		}
	},
	Mutation: {
        insertDocument: (_, { doc }) =>
			generalRequest(`${URL$3}/insertDoc`, 'PUT', doc),

        deleteDocument: (_, { doc }) =>
			generalRequest(`${URL$3}/deleteDoc`, 'POST', doc)
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commentTypeDef,
		resourceTypeDef,
		documentTypeDef,
		courseTypeDef
	],
	[
		commentQueries,
		resourceQueries,
		documentQueries,
		courseQueries,
		courseUserQueries,
		noteQueries
	],
	[
		documentMutations,
		commentMutations,
		resourceMutations,
		courseMutations,
		courseUserMutations,
		noteMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$3,
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
