/**
 * @jest-environment node
 */

// Lo anterior para resolver @firebase/auth: Auth (9.6.1): INTERNAL ASSERTION FAILED: Expected a class definition


//Importamos el middelware thunk:
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';
// import { fileUpload } from '../../helpers/fileUpload';
// import { Blob } from 'buffer';
// import { writeFile } from 'fs-extra';
//import fetch from 'node-fetch';
//import http from 'node:http';
import fetch from 'cross-fetch';


const jsdom = require("jsdom");
const { JSDOM } = jsdom;



//Esto es para jsc y nosotros estamos usando sintaxis de ESMASCRIPT6
//const { configureStore } = require('redux-mock-store') //CommonJS
 
const middlewares = [thunk];
const uid = 'TESTING';

//Creamos este mock para poder hacer dispach de acciones
const mockStore = configureStore(middlewares);

// Vamos a mockear un file
jest.mock ('../../helpers/fileUpload', () => ({ 
    fileUpload: jest.fn(() => {
        return 'https://hola-mundo.com/cosa.jpg';
        // console.log('https://hola-mundo.com/cosa.jpg');
        // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    })
}));

const initState = {
    auth: {
        uid: uid //CUALQUIER COSA
    },
    notes:{
        active: {
            id:'3HLZA8lzDIaw5JF2Vl1o',
            title: 'Hola 1',
            body: 'Mundo 2',
            url:'https://hola-mundo.com/cosa.jpg',
        }
    }
}

// Creamos el store refrenciando a mockStore donde le pasamos un objeto, 
// donde le pasamos literalmente el estado
let store = mockStore (initState);


describe('Pruebas en notes-actions', () => {
    beforeEach ( () => {
        store = mockStore (initState);
    });

    //  npm install redux-mock-store --save-dev
    test('debe de crear una nueva nota startNewNote', async () => {
        //Como esta funcion es asincrona le ponemos await return async( dispatch, getState ) => {
        await store.dispatch ( startNewNote () );

        // Al ejecutar test da err:  FirebaseError: 7 PERMISSION_DENIED: Missing or insufficient permissions.
        // Esto es porque no podemos evaluar este punto: 
        // "const doc = await db.collection(`${ uid }/journal/notes`).add ( newNote );" 
        // si no estamos autenticados

        // Hacer un login pero no los test no deben apuntar a produccion, 
        // por lo que debemos hacer un ambiente aislado
        // Crearemos una base de desarrollo en firebase test

        //Una vez creada la base de testing vamos a probar expect

        const actions = store.getActions();
        //console.log( actions );

        expect ( actions[0]).toEqual ({
            type: types.notesActive,
            payload: {
                id: expect.any(String),//Como no vamos a saber cual es: 'Gg8m7uMoERm3tWzQwCjZ',
                title: '',
                body: '',
                date: expect.any(Number) //Como no vamos a saber cual es: 'Gg8m7uMoERm3tWzQwCjZ',
              }
        });

        expect ( actions[1]).toEqual ({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),//Como no vamos a saber cual es: 'Gg8m7uMoERm3tWzQwCjZ',
                title: '',
                body: '',
                date: expect.any(Number) //Como no vamos a saber cual es: 'Gg8m7uMoERm3tWzQwCjZ',
              }
        });
        const docId = actions[1].payload.id;
        //console.log("docId:", docId);
        await db.doc(`${ uid }/journal/notes/${ docId }`).delete();
    });

    test('startLoadingNotes debe cargar las notas', async() => {

        await store.dispatch ( startLoadingNotes ( uid ) );

        const actions = store.getActions();
        
        expect ( actions[0] ).toEqual ({
             type: types.notesLoad,
             payload: expect.any(Array) 
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };

        expect ( actions[0].payload[0]).toMatchObject ( expected );
    });
    
    test('startSaveNote debe de actualizar la nota', async() => {

        const note = {
            id:'Lovkn5wtYI9kdeC7X4hM',
            title: 'Título',
            body: 'Body'
        } 

        await store.dispatch ( startSaveNote ( note ) );

        const actions = store.getActions();

        expect ( actions[0].type ).toBe (types.notesUpdated);

        const docRef = await db.doc(`/${ uid }/journal/notes/${ note.id }`).get();

        expect ( docRef.data().title ).toBe ( note.title );
        expect ( docRef.data().body ).toBe ( note.body );

    });

    test('startUploading debe de actualizar el url del entry', async() => {

        //const file = new File([ ], 'foto.jpg');

        const resp = await fetch('https://image.shutterstock.com/image-photo/creative-imge-leafs-hibiscus-260nw-1987590686.jpg');
        
        const blob = await resp.blob();

        //const file = new File([blob], 'foto.jpg');

        await store.dispatch ( startUploading ( blob ) );

        const docRef = await db.doc(`/${ uid }/journal/notes/${ initState.notes.active.id }`).get();

        expect ( docRef.data().title ).toBe ( initState.notes.active.title );
        expect ( docRef.data().body ).toBe ( initState.notes.active.body );
        //console.log(docRef);
    });
    


    
    
});
