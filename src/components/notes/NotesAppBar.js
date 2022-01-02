import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active : note } = useSelector( state => state.notes );
    
    const handleSaveNote = () => {
        dispatch(startSaveNote ( note ));
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChenge = (e) => {

        const file = e.target.files[0];
        //console.log(e.target.files);
        if ( file ) {
            dispatch (startUploading ( file ) );
        }
    }
    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <input
                id = "fileSelector"
                name = "file"
                type = "file"
                style = {{ display : 'none' }} 
                onChange = { handleFileChenge }
            /> 
            <div>
                <button 
                    className="btn"
                    onClick = { handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick = { handleSaveNote }
                >
                    Save
                </button>

            </div>
        </div>
    )
}
