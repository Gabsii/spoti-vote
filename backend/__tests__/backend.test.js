import { createServer } from 'vercel-node-server';
import listen from 'test-listen';
import fetch from 'node-fetch';
import handler from '../handler/handler';
import Host from '../handler/Classes/Host';
import Room from '../handler/Classes/Room';
import fs from 'fs';

let server;
let url;

handler.saveHosts([]);
handler.saveRooms([]);

let data = getTestData();

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
            await handler.saveRooms([data.rooms[0]]);
            expect(await api(url)).toStrictEqual([{
                roomName: 'VABVD',
                roomHost: 'Michiocre',
                roomCover: 'michiocre.img'
            }]);	
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
	
    describe('/api/callback', function () {
        beforeAll(async () => {
            server = createServer(require('../api/callback'));
            url = await listen(server);
        });
		
        afterAll(() => {
            server.close();
        });

        it('Should respond with a error message', async function () {
            expect(await api(url + '?code=1234')).toBe('Internal Server Error');	
        });
    });
	
    describe('/api/profile', function () {
        beforeAll(async () => {
            server = createServer(require('../api/profile'));
            url = await listen(server);
        });
		
        afterAll(() => {
            server.close();
        });

        it('Should respond with a error message', async function () {
            expect(await api(url, {
                method: 'POST',
                body: {
                    myToken: 'hello'
                }
            })).toStrictEqual({'error': true, 'message': 'Authorization failed. No or expired token.'});	
        });
    });
});

async function api(url, ...params) {
    try {
        return await (await fetch(url, ...params)).json();
    } catch (error) {
        return await (await fetch(url, ...params)).text();
    }
}

function getTestData() {
    try {
        let parsed = JSON.parse(fs.readFileSync('backend/__tests__/testData.json'));
        let returnData = {};
        let rooms = [];
        parsed.rooms.forEach(room => {
            room.host = new Host.Host(room.host);
            rooms.push(new Room.Room(room));
        });
        returnData.rooms = rooms;
        return returnData;
    } catch (error) {
        handler.log(error);
        return [];
    }
}