import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaLogger from 'koa-logger';
import koaBody from 'koa-bodyparser';
import koaCors from '@koa/cors';
const bodyParser = require('koa-bodyparser');
import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import graphQLSchema from './graphQLSchema';

import { formatErr } from './utilities';
import { head } from 'request-promise-native';


const fetch = require('node-fetch');

const app = new Koa();
const PORT = process.env.PORT || 5000;
const router = new KoaRouter();

app.use(bodyParser());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	// let que = JSON.stringify(ctx.request.body)
	// if (ctx.header.authorization) {
	// 	const idToken = ctx.header.authorization.replace("Bearer ","");
	// 	console.log(JSON.stringify({idToken}))
	// 	let status= await fetch('http://3.233.2.82:3000/auth/verifytoken', { method: 'POST', 
	// 		body:JSON.stringify({idToken}),
	// 		headers: { 'Content-Type': 'application/json' }})
	// 	status = await status.json()
	// 	if(status.verified){
	// 		await next()
	// 	}else{
	// 		ctx.body = { 
	// 			status:"token error"
	// 		}
	// 	}
	// }else{
	// 	if(que.includes("LDAP") || que.includes("createUser")){
	// 		await next();
	// 	}
	// }
	await next()
});

// GraphQL
const graphql = graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql);
router.get('/graphql', graphql);

// test route
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
