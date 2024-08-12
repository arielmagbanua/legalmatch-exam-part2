import {initializeApp} from "firebase/app";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import firebaseConfig from "../configs/firebase";
import {Firestore} from "@firebase/firestore";
import {onSnapshot, doc, getDoc, setDoc, deleteDoc} from "firebase/firestore";
import firebase from "firebase/compat";

interface EmployeesRepository {
  allRealtime(cb: (snapshot: any) => void): any;
  get(id: number | string): Promise<any>;
  add(employee: any): Promise<any>;
  update(id: number | string, updatedEmployee: any): Promise<any>;
  delete(id: number | string): Promise<any>;
}

class EmployeesRepositoryImplementation implements EmployeesRepository {
  protected db: Firestore;

  constructor() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
  }

  // @ts-ignore
  allRealtime(cb: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void): firebase.Unsubscribe {
    return onSnapshot(collection(this.db, 'employees'), (snapshot) => {
      cb(snapshot);
    });
  }

  async get(id: number | string): Promise<any> {
    const docRef = doc(this.db, "employees", id.toString());
    const snapshot = await getDoc(docRef);

    return {...snapshot.data(), id: snapshot.id};
  }

  async add(employee: any): Promise<any> {
    return await addDoc(
      collection(this.db, 'employees'),
      employee
    );
  }

  async update(id: number | string, updatedEmployee: any): Promise<any> {
    return await setDoc(
      doc(this.db, 'employees', id.toString()),
      updatedEmployee
    );
  }

  async delete(id: number | string): Promise<any> {
    return await deleteDoc(
      doc(this.db, 'employees', id.toString())
    );
  }
}

export type {EmployeesRepository}
export default EmployeesRepositoryImplementation;
