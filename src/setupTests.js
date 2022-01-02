import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';
import Swal from 'sweetalert2';
import { fn } from 'moment';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

//Ignora o descarta error en consola windows por uso de scroll
const noScroll = () => {};
// Object.defineProperty ( window, 'scrollTo', { value: noScroll, writable: true });

//Mock Swal
jest.mock('sweetalert2', () => ({
    //Swal: jest.fn()
    fire: jest.fn(),  //Solo el metodo
    close: jest.fn()
})); 
