export const forumTypeDef = `


   type forum {
       _id: String
       name: String!
       userCreator: String!
       userCreator_id: String!
       course_id: String!
       posts: [String]
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
       comments: [String]
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

export const forumQueries = `
      getForums: [forum]
      getForumPosts(_idForum: String!): [post]
      getPostComments(_idForum: String!, _idPost: String!): [postComment]
      getCommentAnswers(_idForum: String!, _idPost: String!, _idComment: String!): [answer]
      getPostsByUser(username: String!): [post]
      getForumsByCourse(course_id: String!): [forum]
  `;


export const forumMutations = `
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