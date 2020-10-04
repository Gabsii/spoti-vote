import { createServer } from 'vercel-node-server';
import listen from 'test-listen';
import fetch from 'node-fetch';
import fs from 'fs';
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
            expect((await (await fetch(url)).json())).toStrictEqual([]);	
        });

        it('Should return the same rooms as set with handler', async function () {
            await handler.saveRooms(['test']);
            expect((await (await fetch(url)).json())).toStrictEqual(['test']);	
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
            expect((await (await fetch(url)).text())).toBe('There was a error with the redirect');	
        });
    });
});