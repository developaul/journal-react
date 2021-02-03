import { types } from '../../types/types';

describe('Pruebas en types', () => {

    const typesDB = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',

        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',

        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',

        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note',
        notesLoad: '[Notes] Load notes',
        notesUpdated: '[Notes] Updated note',
        notesFileUrl: '[Notes] Updated image url',
        notesDelete: '[Notes] Delete note',
        noteslogoutCleaning: '[Notes] Logout Cleaning'
    }

    test('Los types deben de coincidir', () => {
        expect(types).toEqual(typesDB);
    });

});