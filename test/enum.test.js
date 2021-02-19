// I am explicitly setting use strict so that assignments to frozen object throws error
"use strict";

const Enum = require('../index');

describe('Enum', () => {
    it('returns an object containing symbols', () => {
        const testEnum = Enum('red', 'green', 'blue');

        expect(typeof testEnum).toEqual("object");

        expect(testEnum.red).toEqual(expect.any(Symbol));
        expect(testEnum.green).toEqual(expect.any(Symbol));
        expect(testEnum.blue).toEqual(expect.any(Symbol));
    });

    it('assigning to enum throws', () => {
        const testEnum = Enum('up', 'down', 'left', 'right');

        expect(() => testEnum.up = 1).toThrow();
        expect(() => testEnum.test = 1).toThrow();
    });

    it('errors if accessing nonexistent value', () => {
        const testEnum = Enum('up', 'down', 'left', 'right');

        expect(() => testEnum.lolz).toThrowError(new Enum.InvalidEnumAccessError('Access of Invalid Enum Property'));
    });
});