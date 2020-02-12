const get = async (key) => {
    return await JSON.parse(window.localStorage.getItem(key));
}

const set = async (key,value) => {
    const str = await JSON.stringify(value);
    window.localStorage.setItem(key,str)
}

const remove = (key) => {
    window.localStorage.removeItem(key);
}

export default {
    get: get,
    set: set,
    remove: remove
}
