import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from 'firebase/auth';


export const registerUser = defineAction({
  accept: 'form',
    input:z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    remenber_me: z.boolean().optional(),
  }),
  handler: async({name, email, password, remenber_me}, {cookies}) => {
    
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

    // Create user
    try {

      const user = await createUserWithEmailAndPassword(firebase.auth, email, password);

      // Update name user(displayName)

     updateProfile(firebase.auth.currentUser!, {
      displayName: name
     })


      //  Mail verification

      await sendEmailVerification(firebase.auth.currentUser!, {
        url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
      });

      
    } catch (error) {      
      
      const errorFirebase = error as AuthError;
      
      if (errorFirebase.code === 'auth/email-already-in-use') {
        throw new Error('Email already in use');
      }else {
        throw new Error('Something went wrong');
      }

    }
  }
});
