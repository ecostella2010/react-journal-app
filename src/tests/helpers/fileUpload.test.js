import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';


describe('Pruebas en fileUpload', () => {
    // beforeAll(() => jest.setTimeout(90 * 1000));
    beforeEach ( () => {
        jest.clearAllMocks();
    });

    cloudinary.config({ 
        cloud_name: 'dvqejrbiy', 
        api_key: '538353834183655', 
        api_secret: 'tYzrLAJLytrwUwjpn3yyc2Bpo7U',
        secure: true
      });
    

    //https://image.shutterstock.com/image-photo/creative-imge-leafs-hibiscus-260nw-1987590686.jpg

    test('debe de cargar un archivo y retornar el URL', async ()  => {
     
        //Creamos el archivo
        const resp = await fetch('https://image.shutterstock.com/image-photo/creative-imge-leafs-hibiscus-260nw-1987590686.jpg');
       
        const blob = await resp.blob();

        const file = new File([blob], 'foto.jpg');

        //File Upload
        const url = await fileUpload ( file );

        //console.log(url);, lo malo es que estara subiendo cloudinary una nueva imagen cada vez que se ejecute el test

        expect ( typeof url ).toBe('string');

        //Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace ('.jpg', '');

        //console.log(imageId);

        // console.log(imageId);

        await cloudinary.api.delete_resources(imageId, {}, () => {
             //done();
        });

    });

    test('debe de retornar un error', async() => {

        const file = new File ([], 'foto.jpg');

        //File Upload
        const url = await fileUpload ( file );

        //console.log(url);

        expect ( url ).toBe( null );

    });
    
})
