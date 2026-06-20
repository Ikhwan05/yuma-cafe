const storage = typeof window === 'undefined' ? null : localStorage

const getLocalStorage = ( key: string ) =>
    JSON.parse(storage?.getItem(key) || '{}')

const setLocalStrorage = ( key: string, value: string ) =>
    storage?.setItem(key, JSON.stringify(value))

const removeLocalStorage = ( key: string ) =>
    storage?.removeItem(key)

export {getLocalStorage, setLocalStrorage, removeLocalStorage};