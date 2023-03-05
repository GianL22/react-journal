import {doc, collection, setDoc, addDoc, updateDoc, deleteDoc,} from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { fileUpload, loadNotes } from '../../journal/helpers'
import { addEmptyNote, setActiveNote, savingNewNote, setNotes, updateNote, setSaving, setPhotosToActiveNote, deleteNote} from './journalSlice'

export const startNewNote = () => {
    return async (dispatch, getState) =>  {
        
        dispatch(savingNewNote())

        const {uid} = getState().auth
        const newNote = {
            title : '',
            body : '',
            date : new Date().getTime(),
        }

        // const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        // await setDoc(newDoc, newNote)

        const newDoc = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), newNote)

        newNote['id'] = newDoc.id
        dispatch(addEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        
        const {uid} = getState().auth
        if (!uid) throw new Error('El ID del usuario no existe')
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {
        
        dispatch(setSaving())

        const {uid} = getState().auth
        const {active:note} = getState().journal

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        
        await updateDoc(docRef, note)
        dispatch(updateNote(note))
        // const noteToFirestore = {...note}
        // delete noteToFirestore.id

        // const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        // await setDoc(docRef, noteToFirestore, {merge:true})


        // updateDoc()
    }
}

export const startUploadingFiles = (files = {}) => {
    return async (dispatch) => {
        dispatch(setSaving())
        
        const filesPromises = []

        for (const file of files) filesPromises.push(fileUpload(file))
        const photosURLs = await Promise.all(filesPromises)
        dispatch(setPhotosToActiveNote(photosURLs))
        dispatch(startSavingNote())
        // const imageUrl = await fileUpload(files[0])
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) =>{
    
        dispatch(setSaving())

        const {uid} = getState().auth
        const {active:note} = getState().journal
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        dispatch(deleteNote(note))

    }
}