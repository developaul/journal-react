import cloudinary from 'cloudinary'

import { fileUpload } from '../../helpers/fileUpload';


describe('Pruebas en fileUpload', () => {
    cloudinary.config({
        cloud_name: 'dithorrb8',
        api_key: '533512873184375',
        api_secret: '4_rr3qOIMjXeXoPLRXGfJjZytrI'
    });

    test('Debe de cargar un archivo y retronar el URL', async () => {

        // Creando file con la imagen
        const resp = await fetch(`https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png`);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');

        const url = await fileUpload(file);

        expect(typeof url).toBe('string');


        // Borrar imagen
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        cloudinary.v2.api.delete_resources(imageId, {}, () => { });

    });

    test('Debe de retornar null', async () => {

        const file = new File([], 'foto.png');
        const url = await fileUpload(file);

        expect(url).toBeNull();

    });

});
