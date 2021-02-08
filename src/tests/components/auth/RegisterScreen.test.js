import React from 'react';
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startRegisterWithEmailPasswordName } from '../../../actions/auth';
import RegisterScreen from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';


jest.mock('../../../actions/auth', () => ({
    startRegisterWithEmailPasswordName: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);

const wrapper = mount(
    <Provider
        store={store}
    >
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en RegisterScreen', () => {

    test('Debe de renderizar correctamente el componente', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('Debe hacer el dispatch de la acción respectiva', () => {

        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });

    });

});
