import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';


export const loginUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',}),
    remenber_me: z.boolean().optional(),
  }),
  handler: async ({email, password, remenber_me}, {cookies}) => {
    
    // Cookies
    if (remenber_me) {
      cookies.set('email', email, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })
    }else {
      cookies.delete('email', {
        path: '/',
      })
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(firebase.auth, email, password);

      const user = userCredentials.user;

      return {
        success: true,
        message: 'Login successful',
      }
    } catch (error) {
      console.log(error);
      
      const errorFirebase = error as AuthError;


      if ( errorFirebase.code === 'auth/invalid-credential') {
        throw new Error('Invalid credential')
      }else {
        throw new Error('Something went wrong')
      }  
    }
  },
});
    
