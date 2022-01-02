import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';


describe('Pruebas de <authReducer/>', () => {
    
    test('debe de retornar el estado por defecto', () => {
        const state = authReducer({}, {} );
        expect ( state ).toEqual ({});        
    });

    test('debe de autenticar y colocar el name del usuario', () => {

        const initState = {};
        const action = {
            type: types.login,
            payload : {
                uid: '123abc',
                displayName : 'Eduardo'
            }
        }

        const state = authReducer( initState, action );

        //console.log ( state );
        expect ( state ).toEqual ({ 
            uid: '123abc',
            name: 'Eduardo'
        });        
        
    });

    test('debe de borrar el name y logged en false', () => {
        const action = {
            type: types.logout,
        }

        const state = authReducer( { }, action );
        expect ( state ).toEqual ({ 
        });      
    })
    

})
