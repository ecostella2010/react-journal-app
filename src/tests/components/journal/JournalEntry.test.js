
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

//Importamos el middelware thunk:
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

//Para obtener las ayudas
import '@testing-library/jest-dom';

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote, noteLogout } from '../../../actions/notes';

const middlewares = [thunk];

//Creamos este mock para poder hacer dispach de acciones
const mockStore = configureStore(middlewares);

const initState = {}    

let store = mockStore (initState);

store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://algunlugar.com/foto.jpg'
}

const wrapper = mount
 ( 

    <Provider store = { store }>
            <JournalEntry { ...note } />
    </Provider>
);



describe('Pruebas en <JournalEntry/>', () => {
   
    test('debe de mostrarse correctamente ', () => {
        expect ( wrapper ).toMatchSnapshot();
    });

    test('debe de activar la nota', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        expect ( store.dispatch ).toHaveBeenCalled();
        expect ( store.dispatch ).toHaveBeenCalledWith(
            activeNote (note.id, { ...note })
        );

        

    })
    

    
});
