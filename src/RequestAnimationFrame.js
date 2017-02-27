let _lastTime = 0;
let _deltaTime = 0;
let requestAnimationFrameDefaultFunction = function (callback, element) {
    let currTime = new Date().getTime();
    let timeToCall = Math.max(0, 16 - (currTime - _lastTime));
    let id = setTimeout(() => callback(currTime + timeToCall), timeToCall);
    _lastTime = currTime + timeToCall;
    _deltaTime = timeToCall;
    return id;
};

let cancelAnimationFrameDefaultFunction = function (id) {
    clearTimeout(id);
};

const VENDORS = ['ms', 'moz', 'webkit', 'o'];
export let requestAnimationFrame;
export let cancelAnimationFrame;
for (let VENDOR of VENDORS) {
    requestAnimationFrame = requestAnimationFrame ? window[`${VENDOR}RequestAnimationFrame`] : requestAnimationFrame;
    cancelAnimationFrame = cancelAnimationFrame ? (window[`${VENDOR}CancelAnimationFrame`] || window[`${VENDOR}CancelRequestAnimationFrame`]) : cancelAnimationFrame;
}
requestAnimationFrame = requestAnimationFrame || requestAnimationFrameDefaultFunction;
cancelAnimationFrame = cancelAnimationFrame || cancelAnimationFrameDefaultFunction;

export function getDeltaTime() {
    return _deltaTime;
}