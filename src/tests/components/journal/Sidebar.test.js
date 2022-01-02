import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

//Importamos el middelware thunk:
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

//Para obtener las ayudas
import '@testing-library/jest-dom';

import { Sidebar } from '../../../components/journal/Sidebar';
import { startNewNote } from '../../../actions/notes';
import { startLogout } from '../../../actions/auth';

//Esto para mockear startNewNote()
jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}));

//Esto para mockear startLogout()
jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

const middlewares = [thunk];

//Creamos este mock para poder hacer dispach de acciones
const mockStore = configureStore(middlewares);

const initState = {

    auth: {
        uid: '1',
        name: 'Eduardo'
    },
    ui: {
        loading : false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
}    

let store = mockStore (initState);

store.dispatch = jest.fn();

const wrapper = mount
 ( 

    <Provider store = { store }>
            <Sidebar />
    </Provider>
);


describe('Pruebas en <Sidebar />', () => {
    
    test('debe de mostrarse correctamente', () => {

        expect ( wrapper ).toMatchSnapshot();
        
    });

    test('debe de llamar el logout', () => {

        wrapper.find('button').prop('onClick')();
        expect ( startLogout ).toHaveBeenCalled (); 
        
    });

    test('debe de llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();

        expect ( startNewNote ).toHaveBeenCalled (); 


    });
    
    
});
