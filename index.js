class InvalidEnumAccessError extends Error {}

function Enum(...args) {
    const enumObject = Object.freeze(
        args.reduce((acc, key) => {
            acc[key] = Symbol(key);
            return acc;
        }, {})
    );

    return new Proxy(enumObject, {
        get: (target, property, receiver) => {
            const reflectedValue = Reflect.get(target, property, receiver);
            
            if (reflectedValue !== undefined) {
                return reflectedValue;
            }

            throw new InvalidEnumAccessError('Access of Invalid Enum Property');
        },
    });
}

Enum.InvalidEnumAccessError = InvalidEnumAccessError;

module.exports = Enum;
