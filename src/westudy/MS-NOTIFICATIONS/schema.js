export const notificationTypeDef = `


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



export const noificationMutations = `
  pushNotification(notification: notificationInput!): notification
  subscribeUser(subscription: String!): subscriptionConfirmation
`;  