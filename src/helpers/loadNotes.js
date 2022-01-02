import { db } from "../firebase/firebase-config"


export const loadNotes = async ( uid ) => {

    try {
        const notesSnap = await db.collection(`${ uid }/journal/notes`).get(); //db.collection(`${ uid }/journal/notes`).get();
        const notes = [];
        notesSnap.forEach ( snapHijo => {
            //console.log ( snapHijo.data () );
            notes.push ({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        });

        //console.log (notes);

        return notes;
    }
    catch (error)  {
        return [];
    }
}