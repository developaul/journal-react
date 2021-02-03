import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {

    const initialStateWithUser = {
        uid: 'isajpdfbashdij13rh81q23i1',
        name: 'Paul'
    }

    const initialStateEmpty = {}

    test('Debe de logear un usuario', () => {

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'paul'
            }
        }

        const state = authReducer(initialStateEmpty, action);

        expect(state).toEqual({
            uid: 'abc',
            name: 'paul'
        });
    });

    test('Debe de realizar el logout del usuario', () => {

        const action = {
            type: types.logout
        }

        const state = authReducer(initialStateWithUser, action);

        expect(state).toEqual({});

    });

    test('Debe de retornar el estado por defecto', () => {

        const action = {
            type: types.hackear
        }

        const state = authReducer(initialStateWithUser, action);

        expect(state).toEqual(initialStateWithUser);

    });

});
