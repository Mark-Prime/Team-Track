let app = require('./server');
let testServer = require('supertest')

describe('Test the logout path, should give index.html file', () => {

    test( 'Responds with OK 200 status', async () => {
        const response = await testServer( app ).post('/api/user/logout');
        expect( response.statusCode ).toBe(200);
    })

    test('Should not be able to get user', async () => {
        const response = await testServer(app).get('/api/user/');
        expect(response.statusCode).toBe(403);
    })

})