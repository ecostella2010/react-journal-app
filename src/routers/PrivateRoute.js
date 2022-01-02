import React from 'react';
import PropTypes from 'prop-types';
import {
    //Route, 
    useLocation,
    Navigate as Redirect
  } from 'react-router-dom';
// Para Version dom 6 

export const PrivateRoute = ({ 
        isAuthenticated, 
        component: Component
     }) => {
     
     const location = useLocation();
     //console.log(location.pathname);
     //console.log(location.search);
     localStorage.setItem('lastPath', location.pathname);
    //const auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Component /> : <Redirect to="/auth/login" />;
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
//                 ( isAuthenticated )
//                 ? <Component { ...props } />
//                 : <Redirect to="/login" />  
//             )}
            
//         />
//     )
// }

// PrivateRoute.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
//     component: PropTypes.func.isRequired
// }

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}