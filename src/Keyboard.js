var keycode = require('keycode');

let keys = JSON.parse(JSON.stringify(keycode.codes));
for (let key in keys) {
    if (keys.hasOwnProperty(key)) {
        keys[key.toUpperCase()] = {
            isDown: false
        };
    }
}

let _getKey = function (event) {
    let key = keycode(event);
    return key && key.toUpperCase ? key.toUpperCase() : null;
};

export function handleKeyDown (event) {
    let key = _getKey(event);
    if (key && keys[`${key}`]) {
        keys[`${key}`].isDown = true;
    }
}

export function handleKeyUp (event) {
    let key = _getKey(event);
    if (key && keys[`${key}`]) {
        keys[`${key}`].isDown = false;
    }
}

export function getKeys() {
    return keys;
}