import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    /*

        {
            name: 'Eduardo'
            email: 'ecostella@gmail.com',
            password: '123456'
            password2: '123456'
        }
        
        // useForm

        const handleRegister = (e) {
            console.log(name, email, password, password2):
        }

    */

    const dispatch = useDispatch();

    // const state = useSelector( state => state.ui );

    const { msgError } = useSelector( state => state.ui );

    //console.log ( msgError );

    const initialForm = {
        name : 'Eduardo', 
        email: 'ecostella2015@gmail.com',
        password: '123456',
        confirm: '123456'
    };

    const [ formValues, handleInputChange ] = useForm( initialForm );

    const { name, email, password,confirm  } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if ( isFormValid() ) {
            //console.log(name, email, password, confirm);
            dispatch(startRegisterWithEmailPasswordName (email, password, name));
        }
    }

    const isFormValid = () => {

        if ( name.trim().length === 0 )
        {
            //console.log('Name is required');
            dispatch ( setError('Name is required') );
            return false;
        } else if ( !validator.isEmail( email ))
        {
            //console.log('Email is not valid');
            dispatch ( setError('Email is not valid') );
            return false;
        }
        else if ( password !== confirm || password.lenght < 5 )
        {
            //console.log('Password should be at least 6 characters and match each other');
            dispatch ( setError('Password should be at least 6 characters and match each other') );
            return false;
        }

        
        dispatch ( removeError() );
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form 
                onSubmit= { handleRegister }
                className= "animate__animated animate__fadeIn animate__faster"
            >
                {
                    msgError && 
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }
                
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value= { name }
                    onChange = { handleInputChange }
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value = { email }
                    onChange = { handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    value = { password }
                    onChange = { handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirm"
                    className="auth__input"
                    autoComplete="off"
                    value = { confirm }
                    onChange = { handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                
                >
                    Register
                </button>

                

                <Link to="/auth/login"
                    className="link"
                >
                   Already registered?     

                </Link>
                

            </form>
            
        </>
    )
}
