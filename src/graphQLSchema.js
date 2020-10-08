import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	commentTypeDef,
	commentQueries,
	commentMutations
} from './westudy/MS-RESOURCES/comments/typeDefs';
import {
	studyroomTypeDef,
	studyroomsQueries,
	studyroomsMutations
} from './westudy/MS-STUDYROOMS/studyrooms/SR_Schema';
import{
	resourceTypeDef,
	resourceQueries,
	resourceMutations
} from './westudy/MS-RESOURCES/resources/schema'
import{
	usercreatedTypeDef,
	usercreatedQueries,
	usercreatedMutations
} from './westudy/MS-STUDYROOMS/usercreated/UC_Schema';

import categoryResolvers from './westudy/MS-RESOURCES/comments/resolvers';
import resourceResolvers from './westudy/MS-RESOURCES/resources/resolver';
import studyroomResolvers from './westudy/MS-STUDYROOMS/studyrooms/resolvers';
import usercreatedResolvers from './westudy/MS-STUDYROOMS/usercreated/resolvers';
// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commentTypeDef,
		resourceTypeDef,
		studyroomTypeDef,
		usercreatedTypeDef
		
	],
	[
		commentQueries,
		resourceQueries,
		studyroomsQueries,
		usercreatedQueries,
	],
	[
		commentMutations,
		resourceMutations,
		studyroomsMutations,
		usercreatedMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		resourceResolvers,
		studyroomResolvers,
		usercreatedResolvers
	)
});
