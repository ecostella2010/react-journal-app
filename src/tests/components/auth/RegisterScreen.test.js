//Importamos el middelware thunk:
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

//Para obtener las ayudas
import '@testing-library/jest-dom';

import React from 'react';


import { mount } from "enzyme";
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';


import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

const middlewares = [thunk];

//Creamos este mock para poder hacer dispach de acciones
const mockStore = configureStore(middlewares);

const initState = {
    uid: {},
    ui:{
        loading: false,
        msgError: null
    }
}

// Creamos el store refrenciando a mockStore donde le pasamos un objeto, 
// donde le pasamos literalmente el estado
let store = mockStore (initState);

const wrapper = mount ( 
<Provider store= { store }>
    <MemoryRouter>
        <RegisterScreen/>
    </MemoryRouter>
</Provider>

);

describe('Pruebas en <RegisterScreen />', () => {
   

    test('debe de mostrarse correctamente', () => {
        
        expect ( wrapper ).toMatchSnapshot();

    });
    
    test('debe de hacer el dispatch de la accion respectiva ', () => {
        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate ('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();

        expect  ( actions[0]).toEqual ({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });

        //console.log ( actions );
        

    });

    test('debe de mostrar la caja de alerta con el error', () => {
        const initState = {
            uid: {},
            ui:{
                loading: false,
                msgError: 'Email no es correcto'
            }
        }
        
        // Creamos el store refrenciando a mockStore donde le pasamos un objeto, 
        // donde le pasamos literalmente el estado
        const store = mockStore (initState);
        
        const wrapper = mount ( 
        <Provider store= { store }>
            <MemoryRouter>
                <RegisterScreen/>
            </MemoryRouter>
        </Provider>
        
        );

        expect ( wrapper.find ('.auth__alert-error').text().trim() ).toBe ( initState.ui.msgError );
    });
    
    
    
});
