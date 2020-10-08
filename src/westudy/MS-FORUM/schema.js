export const forumTypeDef = `


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

export const forumQueries = `
      getForums: [forum]
      getForumPosts(_idForum: String!): [post]
      getPostComments(_idForum: String!, _idPost: String!): [postComment]
      getCommentAnswers(_idForum: String!, _idPost: String!, _idComment: String!): [answer]
      getPostsByUser(username: String!): [post]
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