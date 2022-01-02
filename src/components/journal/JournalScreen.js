import React from 'react'
import { NoteScreen } from '../notes/NoteScreen';
import { useSelector } from 'react-redux';
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const { active } = useSelector( state => state.notes );

   
    return (
        <div  className="journal__main-content animate__animated animate__fadeIn animate__faster">
            <Sidebar>

            </Sidebar>
            <main>
                {
                    ( active )
                        ? ( <NoteScreen />)
                        : ( <NothingSelected />)
                }    

                {/* <NothingSelected /> */}
                {/* <NoteScreen /> */}
            </main>
        </div>
    )
}
