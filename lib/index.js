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
var request = require('request-promise-native');
var request__default = _interopDefault(request);
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
		return await request__default(parameters);
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
    get_study_rooms(courseId: String!): [Studyroom]
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

const forumTypeDef = `


   type forum {
       _id: String
       name: String!
       userCreator: String!
       userCreator_id: String!
       course_id: String!
       posts: [post]
   }

    input forumInput{
        name: String!
        userCreator: String!
        userCreator_id: String!
        course_id: String!
   }

   type post {
       _id: String
       title: String
       content: String
       userCreator: String
       userCreator_id: String
       forum_id: String
       likes: Int
       comments: [postComment]
   }

    input postInput{
        title: String!
        content: String!
        userCreator: String!
        userCreator_id: String!
        forum_id: String!
   }

   type postComment {
        _id: String
        content: String
        answer: [String]
        userCreator: String
        userCreator_id: String
    }

    input postCommentInput{
        content: String
        userCreator: String
        userCreator_id: String
   }

    type answer {
        _id: String
        content: String
        userCreator: String
        userCreator_id: String
    }

    input answerInput{
        content: String
        userCreator: String
        userCreator_id: String
   }

`;

const forumQueries = `
      getForums: [forum]
      getForumPosts(_idForum: String!): [post]
      getPostComments(_idForum: String!, _idPost: String!): [postComment]
      getCommentAnswers(_idForum: String!, _idPost: String!, _idComment: String!): [answer]
      getPostsByUser(username: String!): [post]
      getForumsByCourse(course_id: String!): [forum]
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

const adminTypeDef = `
   type Curso {
    id_course: Int,
    name: String,
    forum: String
   }

   type UserCurso {
    id_user_course: Int,
    id_user: String,
    id_course: Int,
    rol: String,
    state: String
   }


   input inputUserCurso {
    id_user_course: Int,
    id_user: String,
    id_course: Int,
    rol: String,
    state: String
   }

`;

const adminQueries = `
      GetAllUserCourse: [UserCurso]!
      GetAllCourses: [Curso]!
      GetAllAdminByCourseId(id: Int!):[UserCurso]!
  `;


const adminMutations = `
      AddUserCourse(user_course: inputUserCurso!): UserCurso!
      UpdateUserRoleToAdmin(user_course: inputUserCurso!): String!
      UpdateUserRoleToUser(user_course: inputUserCurso!): String!
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

const LDAPuserTypeDef = `
  type LDAPuser {
    name: String
    surName: String
    password: String
    email: String
  }

  input LDAPuserInput {
    name: String
    surName: String
    password: String
    email: String
  }

  type authConfirmation {
    status: Boolean
  }
`;

const LDAPuserQueries = `
  LDAPAuthUser(email: String!, password:String!): authConfirmation
`;

const LDAPuserMutations = `
  LDAPCreateUser(user: LDAPuserInput!): authConfirmation
`;

const notificationTypeDef = `


   type notification {
       titulo: String!
       cuerpo: String!
       usuario: String!
   }

    input notificationInput{
       titulo: String!
       cuerpo: String!
       usuario: String!
   }

   type subscriptionConfirmation {
    status: String
    }

`;



const noificationMutations = `
  pushNotification(notification: notificationInput!): notification
  subscribeUser(subscription: String!): subscriptionConfirmation
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
		},
		getPostsByUser: (_, { username }) => {	
			return generalRequest(`${URL$2}/posts/${username}`, 'GET')
		},
		getForumsByCourse: (_, { course_id }) => {	
			return generalRequest(`${URL$2}/forumsByCourse/${course_id}`, 'GET')
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

const url$2 = '3.233.2.82';
const port$2 = '3000';

const URL$3 = `http://${url$2}:${port$2}`;

const resolvers$3 = {
  Query: {
		getUserByUid: (_, { uid }) => {
			return generalRequest(`${URL$3}/auth/getuserbyuid/`, 'GET', { uid })
		},
  	getUserByEmail: (_, {email}) => {
			return generalRequest(`${URL$3}/auth/getuserbyemail/`, 'GET', {email})
		}
	},
	Mutation: {
		createUser: (_,{user}) => {
			return generalRequest(`${URL$3}/auth/createuser/`, 'POST', user)
		},
		updateUser: (_, {user}) => {
			return generalRequest(`${URL$3}/auth/updateuser/`, 'PUT', user)
		}, 
  	putDownUser:(_, {uid}) => {
			return generalRequest(`${URL$3}/auth/putdowuser/`, 'PUT', uid)
		},
		putUpUser: (_, {uid}) => {
			return generalRequest(`${URL$3}/auth/putupuser/`, 'PUT', {uid})
    },
    deleteUser:(_, {uid}) => {
      return generalRequest(`${URL$3}/auth/deleteuser/`, 'DELETE')
    }
	}
};

const url$3 = '18.216.71.164';
const port$3 = '80';
const entryPoint$1 = 'course';

const URL$4 = `http://${url$3}:${port$3}/${entryPoint$1}`;

const resolvers$4 = {
  Query: {
    getAllCourses: (_) => {
      return generalRequest(`${URL$4}/getall`, "GET");
    },
    getCoursesByUser: (_, { id_user }) => {
      return generalRequest(`${URL$4}/getbyuser`, "GET", { id_user });
    },
    getUsers: (_, { id }) => {
      return generalRequest(`${URL$4}/getusers`, "GET", { id });
    },
    getNotesByClass: (_, { id_course }) => {
      return generalRequest(`${URL$4}/note/getnotesbyclass`, "GET", {
        id_course,
      });
    },
  },
  Mutation: {
	//   COURSES
    createCourse: (_, { course }) => {
      return generalRequest(`${URL$4}/create`, "POST", course);
    },
    updateCourse: (_, { course }) => {
      return generalRequest(`${URL$4}/edit`, "PUT", course);
    },
    deleteCourse: (_, { id }) => {
      return generalRequest(`${URL$4}/delete`, "DELETE", {
        id,
      });
	},
	// USERS COURSES
    removeUser: (_, { user }) => {
      return generalRequest(`${URL$4}/removeuser`, "DELETE", user);
    },
    addUser: (_, { user }) => {
      return generalRequest(`${URL$4}/adduser`, "POST", user);
	},
	// NOTES
    createNote: (_, { note }) => {
      return generalRequest(`${URL$4}/note/create`, "POST", note);
    },
    editNote: (_, { note }) => {
      return generalRequest(`${URL$4}/note/edit`, "PUT", note);
    },
    deleteNote: (_, { id_note }) => {
      return generalRequest(`${URL$4}/note/delete`, "DELETE", {
        id_course,
      });
    },
    qualifyNote: (_, { note }) => {
      return generalRequest(`${URL$4}/note/qualify`, "PUT", note);
    },
  },
};

const url$4 = '75.101.185.140';

const URL$5 = `http://${url$4}`;


const resolvers$5 = {
	Query: {
		health: (_,) => {	
			return generalRequest(`${URL$5}/health`, 'GET')
		},
		listDocs: (_,) => {	
			return generalRequest(`${URL$5}/listDocs`, 'GET')
		},
		listDocsByTags: (_,) => {	
			return generalRequest(`${URL$5}/listDocs/tags`, 'GET')
		},
		listDocsByType: (_,) => {	
			return generalRequest(`${URL$5}/listDocs/type`, 'GET')
		},
		searchDocsByText: (_, { textDoc }) => {
			return generalRequest(`${URL$5}/searchDocs/text`, 'POST', textDoc)
		},
		searchDocsByTags: (_, { tagsDoc }) => {
			return generalRequest(`${URL$5}/searchDocs/tags`, 'POST', tagsDoc)
		},
		searchDocsByType: (_, { typeDoc }) => {
			return generalRequest(`${URL$5}/searchDocs/type`, 'POST', typeDoc)
		}
	},
	Mutation: {
        insertDocument: (_, { doc }) =>
			generalRequest(`${URL$5}/insertDoc`, 'PUT', doc),

        deleteDocument: (_, { doc }) =>
			generalRequest(`${URL$5}/deleteDoc`, 'POST', doc)
	}
};

const url$5 = '54.92.227.88';
const port$5 = '3000';
const entryPoint$3 = 'studyrooms';
const entryPointuc = 'usercreates';

const URL$6 = `http://${url$5}:${port$5}/${entryPoint$3}`;
const resolvers$6 = {
	Query: {
		get_study_rooms: (_, {courseId}) => {	
			return generalRequest(`${URL$6}`, 'GET',{courseId})
		},
		get_study_room: (_, {sr_id }) => {	
			return generalRequest(`${URL$6}/${sr_id}`, 'GET')
		},
		get_resources: (_, {sr_id}) => {
			return generalRequest(`${URL$6}/${sr_id}/resources`, 'GET')
		},
		get_resource: (_, {_id, sr_id }) => {
			return generalRequest(`${URL$6}/${sr_id}/resources/${_id}`, 'GET')
		},
		get_students: (_, {sr_id}) => {
			return generalRequest(`${URL$6}/${sr_id}/students`, 'GET')
		},
		
	},
	Mutation: {
		
		create_study_room: (_, { studyroom }) =>{
			return generalRequest(`${URL$6}`, 'POST', studyroom)
		},
		delete_study_rooms: (_,) => {
			return generalRequest(`${URL$6}`, 'DELETE') // Probar de últimas.
		},
		update_study_room: (_, { sr_id, studyroom }) => {
			return generalRequest(`${URL$6}/${sr_id}`, 'PUT', studyroom)
		},
		delete_study_room: (_, {sr_id}) => {
			return generalRequest(`${URL$6}/${sr_id}`, 'DELETE')
		},



		create_resource: (_, {sr_id, resource }) =>{
			return generalRequest(`${URL$6}/${sr_id}/resources`, 'POST', resource)
		},
		delete_resources: (_, {sr_id}) => {
			return generalRequest(`${URL$6}/${sr_id}/resources`, 'DELETE') 
		},
		update_resource: (_, { sr_id, _id, resource }) => {
			return generalRequest(`${URL$6}/${sr_id}/resources/${_id}`, 'PUT', resource)
		},
		delete_resource: (_, {sr_id, _id}) => {
			return generalRequest(`${URL$6}/${sr_id}/resources/${_id}`, 'DELETE')
		},


		inscribe_student: (_, {sr_id, student}) => {
			return generalRequest(`${URL$6}/${sr_id}/students`, 'POST', student)
		},
		delete_student: (_, {sr_id, rmstudent}) => {
			return generalRequest(`${URL$6}/${sr_id}/students`, 'DELETE', rmstudent) 
		},
 
			
	}
	
};

const URL$7 = `http://${url$5}:${port$5}/${entryPointuc}`;

const resolvers$7 = {
    Query: {
        get_srs_created_by_user: (_, {user}) => {
            return generalRequest(`${URL$7}`, 'GET',{user})
        }
    },
    Mutation: {
        delete_srs_created_by_user: (_, {user}) => {
            return generalRequest(`${URL$7}`,'DELETE',{user})
        },
    }
};

const url$6 = '34.224.170.220';
const port$6 = '5000';

const URL$8 = `http://${url$6}:${port$6}`;


const resolvers$8 = {
	Query: {
		GetAllUserCourse: (_) => {
			return generalRequest(`${URL$8}/class/admin/usercourses`, 'GET')
		},
		GetAllCourses: (_) => {
			return generalRequest(`${URL$8}/class/admin/courses`, "GET");
		},
		GetAllAdminByCourseId: (_, { id }) => {
			return generalRequest(`${URL$8}/class/admin/getall`, "GET", { id});
		  }
	},
	Mutation: {
		AddUserCourse: (_,{user_course}) => {
			return generalRequest(`${URL$8}/class/admin/add`, 'POST', user_course)
		},
		UpdateUserRoleToAdmin: (_,{user_course}) => {
			return generalRequest(`${URL$8}/class/admin/set`, 'PUT', user_course)
		},
		UpdateUserRoleToUser: (_,{user_course}) => {
			return generalRequest(`${URL$8}/class/admin/remove`, 'PUT', user_course)
		}
	}
};

const url$7 = '54.92.227.88';
const port$7 = '3005/api';

const URL$9 = `http://${url$7}:${port$7}`;


const resolvers$9 = {

	Mutation: {
		pushNotification: (_, { notification }) =>{
			return generalRequest(`${URL$9}/push`, 'POST', notification)
		},
		subscribeUser: (_, { subscription }) =>{
			return generalRequest(`${URL$9}/subscribe`, 'POST', subscription)
		},
    }
    
};

const url$8 = '3.233.2.82';
const port$8 = '3000';

const URL$10 = `http://${url$8}:${port$8}`;

const resolvers$10 = {
  Query: {
        LDAPAuthUser: (_, { email, password }) => {
			return generalRequest(`${URL$10}/auth/authuserldap`, 'GET', { email, password })
		},
	},
	Mutation: {
		LDAPCreateUser: (_,{user}) => {
			return generalRequest(`${URL$10}/auth/createuserldap`, 'POST', user)
		},
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commentTypeDef,
		resourceTypeDef,
		documentTypeDef,
		courseTypeDef,
		forumTypeDef,
		studyroomTypeDef,
		usercreatedTypeDef,
		adminTypeDef,
		userTypeDef,
		LDAPuserTypeDef, 
		notificationTypeDef
	],
	[
		commentQueries,
		resourceQueries,
		documentQueries,
		courseQueries,
		courseUserQueries,
		noteQueries,
		forumQueries,
		studyroomsQueries,
		usercreatedQueries,
		adminQueries,
		userQueries,
		LDAPuserQueries
	],
	[
		documentMutations,
		commentMutations,
		resourceMutations,
		courseMutations,
		courseUserMutations,
		noteMutations,
		forumMutations,
		studyroomsMutations,
		usercreatedMutations,
		adminMutations,
		userMutations,
		LDAPuserMutations,
		noificationMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$5,
		resolvers$4,
		resolvers$2,
		resolvers$7,
		resolvers$6,
		resolvers$8,
		resolvers$3,
		resolvers$10,
		resolvers$9
	)
});

const bodyParser = require('koa-bodyparser');
const fetch = require('node-fetch');

const app = new Koa();
const PORT = process.env.PORT || 5000;
const router = new KoaRouter();

app.use(bodyParser());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	let que = JSON.stringify(ctx.request.body);
	if (ctx.header.authorization) {
		const idToken = ctx.header.authorization.replace("Bearer ","");
		console.log(JSON.stringify({idToken}));
		let status= await fetch('http://3.233.2.82:3000/auth/verifytoken', { method: 'POST', 
			body:JSON.stringify({idToken}),
			headers: { 'Content-Type': 'application/json' }});
		status = await status.json();
		if(status.verified){
			await next();
		}else{
			ctx.body = { 
				status:"token error"
			};
		}
	}else{
		if(que.includes("LDAP") || que.includes("createUser")){
			await next();
		}
	}
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
