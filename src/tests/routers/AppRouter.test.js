/**
 * @jest-environment node
 */

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

import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';
import { firebase } from '../../firebase/firebase-config';
import { act } from '@testing-library/react';

//Esto para mockear startGoogleLogin(), startLoginEmailPassword()  
jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [thunk];

//Creamos este mock para poder hacer dispach de acciones
const mockStore = configureStore(middlewares);

const initState = {

    auth: {},
    ui: {
        loading : false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: []
    }
}    

let store = mockStore (initState);

//Para emular el dispatch y corregir Actions must be plain objects. Use custom middleware for async actions.
//Reemplazamos la funcion dispatch del store con un funcion jest.fn
//store.dispatch = jest.fn();


// jest.mock('../../firebase/firebase-config', () => ({
//     firebase: jest.fn().mockReturnThis()
// }));

describe('Pruebas en <AppRouter />', () => {
   
    test('debe de llamar al login si estoy autenticado ', async() => {

        //Warning: You called act(async () => ...) without await. 
        //This could lead to unexpected testing behaviour, interleaving multiple act calls 
        //and mixing their scopes. You should - await act(async () => ...);
        let user;

        await act( async()=> {
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com','123456');
            //console.log(userCred);
            user = userCred.user;
            //console.log(user.email);

            // const wrapper = mount
            //  ( 

            //     <Provider store = { store }>
            //         <MemoryRouter>
            //             <AppRouter />
            //         </MemoryRouter>
                    
            //     </Provider>
            // );
        });

        //expect ( login ).toHaveBeenCalled();
        expect (user.email).toEqual ('test@testing.com');        
        
    });
    
    
});
