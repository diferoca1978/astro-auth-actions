import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async(context, next) => {

console.log(context.request.url);


next();

});