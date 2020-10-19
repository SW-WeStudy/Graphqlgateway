import { generalRequest } from '../../utilities'
import { url, port} from "./server"

const URL = `http://${url}:${port}`;


const resolvers = {
	Query: {
		getForums: (_,) => {	
			return generalRequest(`${URL}/forums/`, 'GET')
        },
        getForumPosts: (_, { _idForum }) => {	
            return generalRequest(`${URL}/forums/${_idForum}/posts`, 'GET')
        },
        getPostComments: (_, { _idForum, _idPost }) => {	
			return generalRequest(`${URL}/forums/${_idForum}/posts/${_idPost}/comments`, 'GET')
        },
        getCommentAnswers: (_, { _idForum, _idPost, _idComment }) => {	
			return generalRequest(`${URL}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}/answers`, 'GET')
		},
		getPostsByUser: (_, { username }) => {	
			return generalRequest(`${URL}/posts/${username}`, 'GET')
		},
		getForumsByCourse: (_, { course_id }) => {	
			return generalRequest(`${URL}/forumsByCourse/${course_id}`, 'GET')
		}
	},
	Mutation: {
		createForum: (_, { forum }) =>{
			return generalRequest(`${URL}/forums/`, 'POST', forum)
		},
		createPost: (_, { _idForum , post }) =>{
			return generalRequest(`${URL}/forums/${_idForum}/posts`, 'POST', post)
		},
		createPostComment: (_, { _idForum,_idPost, postComment }) =>{
			return generalRequest(`${URL}/forums/${_idForum}/posts/${_idPost}/comments`, 'POST', postComment)
		},
		createCommentAnswer: (_, { _idForum,_idPost, _idComment, answer }) =>{
			return generalRequest(`${URL}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}/answers`, 'POST', answer)
		},


		updateForum: (_, { _idForum ,forum }) =>{
			return generalRequest(`${URL}/forums/${_idForum}`, 'PUT', forum)
		},
		updatePost: (_, { _idForum, _idPost , post }) =>{
			return generalRequest(`${URL}/forums/${_idForum}/posts/${_idPost}`, 'PUT', post)
		},
		updatePostComment: (_, { _idForum,_idPost , _idComment, postComment }) =>{
			return generalRequest(`${URL}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}`, 'PUT', postComment)
		},
		updateCommentAnswer: (_, { _idForum,_idPost, _idComment, _idAnswer, answer }) =>{
			return generalRequest(`${URL}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}/answers/${_idAnswer}`, 'PUT', answer)
		},

		deleteForum: (_, { _idForum }) =>{
			return generalRequest(`${URL}/forums/${_idForum}`, 'DELETE')
		},
		deletePost: (_, { _idForum, _idPost }) =>{
			return generalRequest(`${URL}/forums/${_idForum}/posts/${_idPost}`, 'DELETE')
		},
		deletePostComment: (_, { _idForum,_idPost , _idComment }) =>{
			return generalRequest(`${URL}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}`, 'DELETE')
		},
		deleteCommentAnswer: (_, { _idForum,_idPost, _idComment, _idAnswer }) =>{
			return generalRequest(`${URL}/forums/${_idForum}/posts/${_idPost}/comments/${_idComment}/answers/${_idAnswer}`, 'DELETE')
		},



        deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/comment/delete/${id}`, 'DELETE')
    }
    
};

export default resolvers;