import {collection, addDoc, getDocs, updateDoc, deleteDoc,doc} from "@firebase/firestore";
import {db} from "@/firebaseConfig";
// import {async} from "@firebase/util";
// import {it} from "node:test";

interface PantryItem {
    id?: string;
    name: string;
    quantity: string;
}

const pantryCollection = collection(db, "pantry");

const addItem = async (item: PantryItem)=> {
    await addDoc(pantryCollection, item);
}

const getItems = async () => {
    const snapshot = await getDocs(pantryCollection);
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data() })) as PantryItem[];

}

const updateItem = async (id: string, updatedItem: Partial<PantryItem>) => {
    const itemDoc = doc(db, 'pantry', id);
    await updateDoc(itemDoc, updatedItem);
}

const deleteItem = async (id:string) => {
    const itemDoc = doc(db, 'pantry', id);
    await deleteDoc(itemDoc);
}

export {addItem, getItems, updateItem, deleteItem};