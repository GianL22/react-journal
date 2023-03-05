import {getDocs, collection} from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'

export const loadNotes = async (uid = '') => {
    const docs = await getDocs(collection(FirebaseDB, `${uid}/journal/notes`))
    const notes = []
    docs.forEach((doc) => notes.push({id : doc.id, ...doc.data()}))
    return notes;
}