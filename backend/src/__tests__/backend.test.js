const lib = require('../lib.js');

describe('lib tests', () => {
    describe('getDifference tests', () => {
        it('Finds no difference between identical objects', () => {
            let object = {
                data: 12,
            };
            expect(lib.getObjectDifference(object, object)).toStrictEqual({});
        });

        it('Finds difference between non identical objects', () => {
            let object = {
                data: 12,
            };
            let newObject = {
                data: 14,
            };
            expect(lib.getObjectDifference(object, newObject)).toStrictEqual(newObject);
        });

        it('Ignores similarities', () => {
            let object = {
                data: 12,
                change: {
                    data: 13,
                },
            };
            let newObject = {
                data: 12,
                change: {
                    data: 15,
                },
            };
            let change = {
                change: {
                    data: 15,
                },
            };
            expect(lib.getObjectDifference(object, newObject)).toStrictEqual(change);
        });

        it('Works with booleans', () => {
            let object = {
                boolean: true,
            };
            let newObject = {
                boolean: false,
            };
            let change = {
                boolean: false,
            };
            expect(lib.getObjectDifference(object, newObject)).toStrictEqual(change);
        });

        it('Works with many datatypes', () => {
            let object = {
                number: 12,
                numberSame: 12,
                numberF: 12.123,
                numberFSame: 12.123,
                boolean: true,
                booleanSame: true,
                array: [1, 2, 3],
                arraySame: [1, 2, 3],
                object: {
                    data: 15,
                },
                objectSame: {
                    data: 15,
                },
            };
            let newObject = {
                number: 124,
                numberSame: 12,
                numberF: 12.1235,
                numberFSame: 12.123,
                boolean: false,
                booleanSame: true,
                array: [1, 2, 4],
                arraySame: [1, 2, 3],
                object: {
                    data: 164355,
                },
                objectSame: {
                    data: 15,
                },
            };
            let change = {
                number: 124,
                numberF: 12.1235,
                boolean: false,
                array: [1, 2, 4],
                object: {
                    data: 164355,
                },
            };
            expect(lib.getObjectDifference(object, newObject)).toStrictEqual(change);
        });
    });
});
