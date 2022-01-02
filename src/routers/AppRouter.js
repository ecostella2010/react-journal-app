import React, { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Navigate as Redirect,
    Route,
  } from 'react-router-dom';
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from 'react-redux';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {
    //console.log( 'AppRouter' );

    const dispatch = useDispatch();

    const [ checking, setChecking] = useState( true );

    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect(() => {
        //console.log( 'useEffect' );
        firebase.auth().onAuthStateChanged( async( user ) => {
            //console.log( 'Antes' );
            if ( user?.uid ) {
                dispatch ( login( user.uid, user.displayName ) );
                //console.log('login t');
                setIsLoggedIn ( true );  
                dispatch ( startLoadingNotes ( user.uid ) );

            } else {
                setIsLoggedIn ( false );
            }

            setChecking(false);
        })
    }, [ dispatch, setChecking, setIsLoggedIn ])


    if ( checking ) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
         <BrowserRouter>
             <div>
                <Routes>
                    {/* <Route path="/" element={<JournalScreen />} /> */}
                    <Route path="/*" element={ <PrivateRoute isAuthenticated = { isLoggedIn } component = { JournalScreen } /> } />
                    <Route path="auth/*" element={ <PublicRoute isAuthenticated = { isLoggedIn } component = { AuthRouter }/> } > 
                    {/* <Route path="auth/*" element={<AuthRouter />}>     */}
                        <Route path="login" element={<h1>LoginScreen</h1>}/> 
                        <Route path="register" element={<h1>RegisterScreen</h1>}/>
                    </Route>    
                    
                        {/* <Route exact path="/" element={<JournalScreen />} /> */}
                    <Route path="*" element={<Redirect replace to="/auth/login"/>}/>
                </Routes>
             </div>
         </BrowserRouter>
    )
}
