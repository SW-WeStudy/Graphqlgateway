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

   input suscription {
    endpoint:String!
    expirationTime:String!
    keys: keys!
    }

    input keys {
      auth:String!
      p256dh:String!
    }

`;



export const noificationMutations = `
  pushNotification(notification: notificationInput!): notification
  subscribeUser(subscription: suscription!): String
`;  