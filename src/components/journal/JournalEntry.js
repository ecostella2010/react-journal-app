import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry =  ({ id, date, title, body, url }) => {

    //console.log (id, date, title, body, url);
    const dispatch = useDispatch();

    const noteDate = moment (date);
    //console.log (noteDate);  

    const handleEntryClick = () => {
        //dispach
        const currentNote = {
            title: title,
            body: body,
            date: date,
            url: url
        }

        dispatch( activeNote(id, currentNote) );
    }



    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick= { handleEntryClick }
        >
            {
                url && 
                <div className="journal__entry-picture"
                    style={ {
                        backgroundSize:'cover',
                        backgroundImage: `url( ${ url })`
                    }}
                >
                </div>
            }
            

            {/* <div className="journal__entry-picture"
                style={ {
                    backgroundSize:'cover',
                    backgroundImage: 'url(https://earthsky.org/upl/2018/12/comet-wirtanen-Jack-Fusco-dec-2018-Anza-Borrego-desert-CA-e1544613895713.jpg)'
                }}
            >
            </div> */}

            <div className="journal__entry-body"> 
                <p className="journal__entry-title">
                    { title }
                </p>

                <p className="journal__entry-content">
                    { body }
                </p>

            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('D') }</h4>
            </div>
        </div>
    )
}
