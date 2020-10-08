export const documentTypeDef = `
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

export const documentQueries = `
      health: esHealth!
      listDocs: listResult!
      listDocsByTags: listHelpers!
      listDocsByType: listHelpers!
      searchDocsByText(textDoc: initialDocument): listResult!
      searchDocsByTags(tagsDoc: initialDocument): listResult!
      searchDocsByType(typeDoc: initialDocument): listResult!
  `;


export const documentMutations = `
  insertDocument(doc: initialDocument): String!
  deleteDocument(doc: initialDocument): esDelete!
`;  