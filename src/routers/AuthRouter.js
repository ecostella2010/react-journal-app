import React from 'react'
import {
    // BrowserRouter as Router,
    Routes,
    // Navigate as Redirect,
    Route,
  } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
// import { PublicRoute } from './PublicRoute';

export const AuthRouter = () => {

    return (
        <div className="auth__main">
            <div className="auth__box-container">
                <Routes>
                        <Route exact path="login" element={ <LoginScreen /> } /> 
                        <Route exact path="register" element={ <RegisterScreen /> } />
                        {/* <Route exact path="login" element={ <PublicRoute isAuthenticated = { user.logged } component = { LoginScreen }/> } />
                        <Route exact path="register" element={ <PublicRoute isAuthenticated = { user.logged } component = { RegisterScreen }/> } /> */}
                        {/* <Route path="/*" element={ <PrivateRoute isAuthenticated = { user.logged } component = { DashboardRoutes } /> } /> */}

                    {/* <Route path="/*" element={<Redirect replace to="/auth/login"/>}></Route> */}
                </Routes>
            </div>    
        </div>
        
    )
}
