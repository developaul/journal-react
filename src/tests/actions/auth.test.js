import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import { types } from "../../types/types";
import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {

    beforeEach(() => {

        store = mockStore(initState);

    });

    test('login y logout deben de crear la acción respectiva', () => {

        const uid = '123',
            displayName = 'Paul';

        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect(loginAction).toMatchObject({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect(logoutAction).toMatchObject({
            type: types.logout
        });

    });

    test('debe de realizar el startLogout ', async () => {

        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toMatchObject({
            type: types.logout
        });

        expect(actions[1]).toMatchObject({
            type: types.noteslogoutCleaning
        });

    });

    test('debe de iniciar el startLoginEmailPassword', async () => {

        await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        });

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: null
            }
        })

        expect(actions[2]).toEqual({
            type: types.uiFinishLoading
        });

    });

});