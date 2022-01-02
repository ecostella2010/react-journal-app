import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

// react-journal


export const startNewNote = () => {
    
    return async( dispatch, getState ) => {
        //   const state = getState();
        //   console.log ( state );
        //   const uid = getState().auth.uid;

       const { uid } = getState().auth;
       // console.log ( uid );
       const newNote = {
           title: '',
           body: '',
           date: new Date().getTime()
       }

       try {

            const doc = await db.collection(`${ uid }/journal/notes`).add ( newNote );

            //console.log( doc );
            
            dispatch ( activeNote ( doc.id, newNote ) ); 

            dispatch ( addNewNote ( doc.id, newNote ) ); 
           
       } catch (error) {
            console.log( error );  
       }
       

    }
}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    } 
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    } 
});

export const startLoadingNotes = ( uid ) => {

    return async( dispatch ) => {
     
        const notes = await loadNotes ( uid );

        dispatch ( setNotes ( notes ) );
    }
} 

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});


export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {
        //   const state = getState();
        //   console.log ( state );
        //   const uid = getState().auth.uid;

       const { uid } = getState().auth;

       if ( !note.url ) {
        delete note.url;
       }

       // console.log ( uid );
       const noteToFirestore = { ...note };
       
       delete noteToFirestore.id;

       //const doc = 
       await db.doc(`${ uid }/journal/notes/${ note.id }`).update ( noteToFirestore );

       dispatch ( refreshNote ( note.id, noteToFirestore )); 
       
       Swal.fire('Saved', note.title , 'success');
    }
};

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id, note : {
            id,
            ...note
        }
    }
});


export const startUploading = ( file ) => {
    // getState para saber la nota actual
    return async( dispatch, getState ) => {

        const { active: activeNote } = getState().notes;

        Swal.fire ({
            title: 'Uploading...',
            test: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        // console.log ('file');
        // console.log (file);
        //console.log (activeNote);
        let fileUrl = await fileUpload( file );

        //console.log ( fileUrl );

        activeNote.url = fileUrl;

        // console.log ( activeNote );

        dispatch ( startSaveNote ( activeNote ) );

        Swal.close();



    } 
}


export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid;
        // await db.doc

        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        //Si da error lo debemos manejar con try catch

       dispatch ( deleteNote ( id )); 
       
       //Swal.fire('Saved', note.title , 'success');


    }
}

//Como se a ser sincrono se va devolver el objeto ({})
export const deleteNote = ( id ) => ({

    type: types.notesDelete,
    payload: id

});


export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});

