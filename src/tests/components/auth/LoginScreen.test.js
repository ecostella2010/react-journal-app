
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
//Memory router me permite fingir las rutas
import { MemoryRouter } from "react-router-dom";

//Importamos el middelware thunk:
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

//Para obtener las ayudas
import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

//Esto para mockear startGoogleLogin(), startLoginEmailPassword()  
jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));


const middlewares = [thunk];

//Creamos este mock para poder hacer dispach de acciones
const mockStore = configureStore(middlewares);

const initState = {

    auth: {},
    ui: {
        loading : false,
        msgError: null
    }
}

let store = mockStore (initState);

//Para emular el dispatch y corregir Actions must be plain objects. Use custom middleware for async actions.
//Reemplazamos la funcion dispatch del store con un funcion jest.fn
store.dispatch = jest.fn();

const wrapper = mount ( 

    <Provider store = { store }>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
        
    </Provider>
);


describe('Pruebas en <LoginScreen  />', () => {

    beforeEach( () => {
        //Para reinicializar
        store = mockStore (initState);

        //Es buena practica limpiar los mock
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente ', () => {
        expect ( wrapper ).toMatchSnapshot();
    });

    test('debe de disparar la accion de handleGoogleLogin', () => {

        wrapper.find ('.google-btn').prop('onClick')();

        expect (  startGoogleLogin  ).toHaveBeenCalled();

    });

    test('debe de disparar el startLogin con los respectivos argumentos de handleLogin', () => {

        //email: 'ecostella2010@gmail.com',
        //password: '123456'

        //wrapper.find ('.animate__animated').prop('onSubmit')();

        wrapper.find('form').prop('onSubmit')({
            // preventDefault: () => {}
            preventDefault(){}
        })

        expect (  startLoginEmailPassword  ).toHaveBeenCalledWith('ecostella2010@gmail.com','123456');

    });

})
