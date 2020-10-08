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
} from './westudy/MS-RESOURCES/resources/schema';
import{
	usercreatedTypeDef,
	usercreatedQueries,
	usercreatedMutations
} from './westudy/MS-STUDYROOMS/usercreated/UC_Schema';

import{
	forumTypeDef,
	forumQueries,
	forumMutations,
} from './westudy/MS-FORUM/schema'

import {
	documentTypeDef,
	documentQueries,
	documentMutations
} from './westudy/MS-NAVIGATION/documents/typeDefs';


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
import forumResolvers from './westudy/MS-FORUM/resolver';

import courseResolver from './westudy/MS-COURSES/resolver';
import documentResolvers from './westudy/MS-NAVIGATION/documents/resolvers';
import studyroomResolvers from './westudy/MS-STUDYROOMS/studyrooms/resolvers';
import usercreatedResolvers from './westudy/MS-STUDYROOMS/usercreated/resolvers';
// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		commentTypeDef,
		resourceTypeDef,
		documentTypeDef,
		courseTypeDef,
		forumTypeDef,
		studyroomTypeDef,
		usercreatedTypeDef
	],
	[
		commentQueries,
		resourceQueries,
		documentQueries,
		courseQueries,
		courseUserQueries,
		noteQueries,
		forumQueries,
		studyroomsQueries,
		usercreatedQueries,
	],
	[
		documentMutations,
		commentMutations,
		resourceMutations,
		courseMutations,
		courseUserMutations,
		noteMutations,
		forumMutations,
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
		documentResolvers,
		courseResolver,
		forumResolvers,
		usercreatedResolvers,
		studyroomResolvers,
	)
});
