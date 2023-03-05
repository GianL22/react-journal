import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving : false,
        messageSaved : 'a',
        notes : [],
        active : null,
        // active: {
        //     id : 'ABC123',
        //     title : '',
        //     body : '',
        //     date : '',state.notes
        //     imagesURL : [],
        // },
    },
    reducers: {
        savingNewNote : (state) => {
            state.isSaving = true
        },
        addEmptyNote: (state,  {payload}) => {
            state.notes = [...state.notes, payload]
            state.isSaving = false;
        },
        setActiveNote: (state,  {payload}) => {
            state.active = payload
            state.messageSaved = ''
        },
        setNotes: (state,  {payload}) => {
            state.notes = [...payload]
        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ''
        },
        updateNote: (state,  {payload}) => {
            state.notes = state.notes.map((note) => {
                if (payload.id === note.id) return payload
                return note
            })
            state.isSaving = false
            state.messageSaved = 'se ha actualizado la nota'
        },
        setPhotosToActiveNote:(state,{payload}) => {
            state.active.imagesURL = [...state.active.imagesURL, ...payload]
            state.isSaving = false

        },
        deleteNote: (state,{payload}) =>{
            state.isSaving = false
            state.messageSaved = 'Nota eliminada'
            state.notes = state.notes.filter(note => note.id !== payload.id)
            state.active = null
        },
        clearNotesLogOut: (state) => {
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.active = null
        },
        deleteNoteByID: (state,  action) => {
            state.isSaving = false
        },
    }
});
export const { addEmptyNote, setActiveNote, setNotes, setSaving,
               updateNote, deleteNoteByID, savingNewNote,
               setPhotosToActiveNote, clearNotesLogOut, deleteNote} = journalSlice.actions;