import constants from '../js/constants.js';

describe('constants tests', () => {
    describe('insertObjectDifference tests', () => {
        it('Should not change between identical objects', () => {
            let object = {
                data: 12,
            };
            expect(constants.insertObjectDifference(object, object)).toStrictEqual(object);
        });

        it('Update the object to include the changes', () => {
            let object = {
                data: 12,
            };
            let newObject = {
                data: 14,
            };
            expect(constants.insertObjectDifference(object, newObject)).toStrictEqual(newObject);
        });

        it('Insert only changes', () => {
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
            expect(constants.insertObjectDifference(object, change)).toStrictEqual(newObject);
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
            expect(constants.insertObjectDifference(object, change)).toStrictEqual(newObject);
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
            expect(constants.insertObjectDifference(object, change)).toStrictEqual(newObject);
        });
    });
});
