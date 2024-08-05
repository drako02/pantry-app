
import {collection, addDoc, setDoc, getDocs, updateDoc, deleteDoc,doc} from "@firebase/firestore";
import {db} from "@/firebaseConfig";
// import {async} from "@firebase/util";
// import {it} from "node:test";

interface PantryItem {
    id?: string;
    name: string;
    quantity: string;
}

const getUserPantryCollection = (userId: string) => collection(db, 'users', userId, 'pantry');

// const addItem = async (item: PantryItem)=> {
//     await addDoc(pantryCollection, item);
// }

const addItem = async (userId: string, item: Omit<PantryItem, 'id'>) => {
    const pantryCollection = getUserPantryCollection(userId);
    await setDoc(doc(pantryCollection), item);
}

const getItems = async (userId:string) => {
    // const snapshot = await getDocs(pantryCollection);
    // return snapshot.docs.map(doc => ({id: doc.id, ...doc.data() })) as PantryItem[];
    const pantryCollection = getUserPantryCollection(userId);
    const snapshot = await getDocs(pantryCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PantryItem[];

}

const updateItem = async (userId: string, id: string, updatedItem: Partial<PantryItem>) => {
    // const itemDoc = doc(db, 'pantry', id);
    // await updateDoc(itemDoc, updatedItem);
    const itemDoc = doc(db, 'users', userId, 'pantry', id);
    await updateDoc(itemDoc, updatedItem);
}

const deleteItem = async (userId: string, id:string) => {
    const itemDoc = doc(db, 'users', userId, 'pantry', id);
    await deleteDoc(itemDoc);
}

export {addItem, getItems, updateItem, deleteItem};