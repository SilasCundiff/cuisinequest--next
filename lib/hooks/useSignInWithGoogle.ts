
import { auth,  googleAuthProvider } from '@/lib/firebase';



export const useSignInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleAuthProvider);
  } catch (err) {
    console.log(err);
  }
};