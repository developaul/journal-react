import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNotes = () => async (dispatch, getState) => {

    const { uid } = getState().auth;

    const newNote = {
        title: '',
        body: '',
        date: new Date().getTime()
    }

    try {

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(doc.id, newNote));

        dispatch(addNewNote(doc.id, newNote));

    } catch (err) {

        console.error(err);

    }

}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = uid => async dispatch => {

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));

}

export const setNotes = notes => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = note => async (dispatch, getState) => {

    const { uid } = getState().auth;

    if (!note.url) delete note.url;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    try {

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);

        dispatch(refreshNote(note.id, noteToFireStore));
        Swal.fire('Saved', note.title, 'success');

    } catch (err) {

        console.error(err);

    }

}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        ...note
    }
})

export const startUploading = file => async (dispatch, getState) => {

    const { active: activeNote } = getState().notes;

    Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    });

    try {

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote));

        Swal.close();

    } catch (err) {

        console.error(err);

    }

}

export const startDeleting = id => async (dispatch, getState) => {

    const { uid } = getState().auth;

    try {

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));

    } catch (err) {

        console.error(err);

    }

}

export const deleteNote = id => ({
    type: types.notesDelete,
    payload: id
})

export const noteslogout = () => ({
    type: types.noteslogoutCleaning
});