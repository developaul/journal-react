import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startDeleting, startNewNotes, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn(() => 'https://hola-mundo.com/cosa.jpg')
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'xmM4mGmTQ9lrlIscJrGn',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore(initState);

describe('Pruebas con las aciones de notes', () => {

    beforeEach(() => {

        store = mockStore(initState);

    });

    test('Debe de crear una nueva nota startNewNote', async () => {

        await store.dispatch(startNewNotes());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        //Borrar la acción insertada
        const docId = actions[0].payload.id;
        await db.doc(`TESTING/journal/notes/${docId}`).delete();

    });

    test('startSaveNote debe de actualizar una nota', async () => {

        const note = {
            id: "fJsaFmrZPzWpStprRPbu",
            title: 'titulo',
            body: 'body'
        }

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);
        expect(actions[0].payload).toMatchObject(note);
    });

    test('startDeleting debe de eliminar una nota', async () => {

        // Creando Note
        await store.dispatch(startNewNotes());
        let actions = store.getActions();
        const docId = actions[0].payload.id;

        // Eliminando Note
        await store.dispatch(startDeleting(docId));
        actions = store.getActions();

        expect(actions[2]).toMatchObject({
            type: types.notesDelete,
            payload: docId
        });

    });


});