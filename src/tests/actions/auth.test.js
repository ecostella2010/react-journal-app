/**
 * @jest-environment node
 */

// Lo anterior para resolver @firebase/auth: Auth (9.6.1): INTERNAL ASSERTION FAILED: Expected a class definition

//Importamos el middelware thunk:
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

//Para obtener las ayudas
import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogout, startRegisterWithEmailPasswordName } from '../../actions/auth';
import { types } from '../../types/types';


//Esto es para jsc y nosotros estamos usando sintaxis de ESMASCRIPT6
//const { configureStore } = require('redux-mock-store') //CommonJS
 
const middlewares = [thunk];

//Creamos este mock para poder hacer dispach de acciones
const mockStore = configureStore(middlewares);

const uid = 'TESTING';
const displayName ='Eduardo';

const initState = {}

// Creamos el store refrenciando a mockStore donde le pasamos un objeto, 
// donde le pasamos literalmente el estado
let store = mockStore (initState);

describe('Pruebas con las acciones de Auth', () => {
   
    beforeEach( () => {
        //Para reinicializar
        store = mockStore (initState);
    });
    
    test('login y logout deben de crear la accion respectiva', () => {
       
       const loginAction =  login (uid, displayName);
       const logoutAction = logout();

       expect ( loginAction ).toEqual (
           {type: types.login,
            payload: {
            uid,
            displayName
            }}
        );

        expect ( logoutAction ).toEqual ({type: types.logout});

    });


    test('debe de realizar el startLogout', async() => {
        
        await store.dispatch ( startLogout());

        const actions = store.getActions();

        //console.log( actions );
        //console.log( actions[0] );

        //expect ( actions[0]).toEqual ({ type: '[Auth] Logout' });
        expect ( actions[0]).toEqual ({ type: types.logout });
        expect ( actions[1]).toEqual ({ type: types.notesLogoutCleaning });

    });

    test('debe de iniciar el startLoginEmailPassword ', async() => {
       
        await store.dispatch ( startLoginEmailPassword('test@testing.com','123456'));

        const actions = store.getActions();

        //console.log( actions );

        expect ( actions[0]).toEqual ({ type: types.uiStartLoading });

        expect ( actions[1]).toEqual ({
            type: types.login,
            payload: {
                uid: 'VexmXOt3KHPLd0PwdlpxHm5IAVH2',
                displayName: null
            }
        });

        expect ( actions[2]).toEqual ({ type: types.uiFinishLoading });

    });

    test('debe de arrojar error cuando usuario existe startRegisterWithEmailPasswordName ', async() => {

        await store.dispatch ( startRegisterWithEmailPasswordName('test@testing.com','123456', null));

        const actions = store.getActions();

        expect ( actions).toEqual ([]);

        //console.log( actions );

    });
    
    
    
});
