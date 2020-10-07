import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	commentTypeDef,
	commentQueries,
	commentMutations
} from './westudy/MS-RESOURCES/comments/typeDefs';

import{
	resourceTypeDef,
	resourceQueries,
	resourceMutations
} from './westudy/MS-RESOURCES/resources/schema'

import{
	courseTypeDef,
	courseQueries,
	courseMutations,
	courseUserQueries,
	courseUserMutations,
	noteQueries,
	noteMutations
} from './westudy/MS-COURSES/typeDefs'

import categoryResolvers from './westudy/MS-RESOURCES/comments/resolvers';
import resourceResolvers from './westudy/MS-RESOURCES/resources/resolver';
import courseResolver from './westudy/MS-COURSES/resolver';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commentTypeDef,
		resourceTypeDef,
		courseTypeDef
	],
	[
		commentQueries,
		resourceQueries,
		courseQueries,
		courseUserQueries,
		noteQueries
	],
	[
		commentMutations,
		resourceMutations,
		courseMutations,
		courseUserMutations,
		noteMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		resourceResolvers,
		courseResolver
	)
});
