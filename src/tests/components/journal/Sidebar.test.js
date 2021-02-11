import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { startLogout } from '../../../actions/auth';
import { startNewNotes } from '../../../actions/notes';
import Sidebar from '../../../components/journal/Sidebar';


jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
    startNewNotes: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Paul'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider
        store={store}
    >
        <Sidebar />
    </Provider>
);

describe('Pruebas en Sidebar', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('Debe de renderizar correctamente el componente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar el logout', () => {

        wrapper.find('.btn').prop('onClick')();

        expect(startLogout).toHaveBeenCalled();

    });

    test('Debe de llamar el startNewNote', () => {

        wrapper.find('.journal__new-entry').prop('onClick')();

        expect(startNewNotes).toHaveBeenCalled();

    });

});
