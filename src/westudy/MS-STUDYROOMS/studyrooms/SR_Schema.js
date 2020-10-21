
export const studyroomTypeDef = `

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

export const studyroomsQueries = `
    get_study_rooms(courseId: String!): [Studyroom]
    get_study_room(sr_id: String!): Studyroom

    get_resources(sr_id: String!): [ResourceSR]
    get_resource(sr_id: String!, _id: String!): ResourceSR

    get_students(sr_id: String!): [Student]

  
`;

export const studyroomsMutations = `
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