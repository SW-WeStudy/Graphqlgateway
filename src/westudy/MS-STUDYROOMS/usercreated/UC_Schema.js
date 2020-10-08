export const usercreatedTypeDef = `
    type Usercreated {
        _id: String!
        user: String!,
        studyrooms: [Studyroom]
    }
    input UsercreatedInput {
        user: String!
    }
`
export const usercreatedQueries = `
    get_srs_created_by_user(user: String!): Usercreated
`;

export const usercreatedMutations = `
    delete_srs_created_by_user(user: String!): Usercreated
`