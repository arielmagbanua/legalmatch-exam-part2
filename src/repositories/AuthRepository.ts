import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import firebaseConfig from "../configs/firebase";

interface AuthRepository {
  login(email: string, password: string): Promise<any>;
  logout(): Promise<void>;
  currentUser(): any;
}

class AuthRepositoryImplementation implements AuthRepository {
  protected auth: any;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  async login(email: string, password: string): Promise<any> {
    const userCredential = await setPersistence(this.auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(this.auth, email, password);
      });

    return userCredential.user;
  }

  async logout(): Promise<void> {
    return await signOut(this.auth);
  }

  currentUser(): any {
    return this.auth.currentUser;
  }
}

export type {AuthRepository};
export default AuthRepositoryImplementation;
