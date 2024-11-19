import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ['/protected']
const publicRoutes = ['/login', '/register']

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async({url, request, locals, redirect}, next) => {

  const isLoggedIn = !!firebase.auth.currentUser

  const user = firebase.auth.currentUser;

  locals.isLoggedIn = isLoggedIn

  if(user) {
    locals.user = {
      name: user.displayName!,
      email: user.email!,
      avatar: user.photoURL ?? "",
      emailVerified: user.emailVerified
    }
  }

  // Route protection

  if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
    return redirect('/login')
  }
  if (isLoggedIn && publicRoutes.includes(url.pathname)) {
    return redirect('/')
  }


 return next();

});