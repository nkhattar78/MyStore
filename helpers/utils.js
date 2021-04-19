function timeoutFn(delay) {    
    return new Promise(res => setTimeout(res, delay));
}

export default timeoutFn;
