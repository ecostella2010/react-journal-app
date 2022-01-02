import React from 'react';
import PropTypes from 'prop-types';
import {
    //Route, 
    Navigate as Redirect
  } from 'react-router-dom';
// Para Version dom 6 

export const PublicRoute = ({ isAuthenticated, component: Component }) => {
    //const auth = null; // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return !isAuthenticated ? <Component /> : <Redirect to="/" />;
}

// Para Version dom 5  
// export const PrivateRoute = ( { 
//     isAuthenticated,
//     component : Component,
//     ...rest

// } ) => {
    
//     return (
//         <Route  { ...rest }
//             component = { ( props ) => (
//                 ( !isAuthenticated )
//                 ? <Component { ...props } />
//                 : <Redirect to="/" />  
//             )}
            
//         />
//     )
// }

// PrivateRoute.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
//     component: PropTypes.func.isRequired
// }

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}