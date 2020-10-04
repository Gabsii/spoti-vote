import { createServer } from 'vercel-node-server';
import listen from 'test-listen';
import fetch from 'node-fetch';
import handler from '../handler/handler';

let server;
let url;

handler.saveHosts([]);
handler.saveRooms([]);

describe('ServerlessFunctions', function () {
    describe('/api/rooms', function () {
        beforeAll(async () => {
            server = createServer(require('../api/rooms'));
            url = await listen(server);
        });
		
        afterAll(() => {
            server.close();
        });

        it('Should return a emtpy ', async function () {
            expect(await api(url)).toStrictEqual([]);	
        });

        it('Should return the same rooms as set with handler', async function () {
            await handler.saveRooms([]);
            expect(await api(url)).toStrictEqual([]);	
        });
    });

    describe('/api/login', function () {
        beforeAll(async () => {
            server = createServer(require('../api/login'));
            url = await listen(server);
        });
		
        afterAll(() => {
            server.close();
        });

        it('Should respond with a error message', async function () {
            expect(await api(url)).toBe('There was a error with the redirect');	
        });
    });
});

async function api(url) {
	try {
		return await (await fetch(url)).json();
	} catch (error) {
		return await (await fetch(url)).text();
	}
}