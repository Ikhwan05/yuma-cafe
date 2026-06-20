export const fetchAPI = async ( url : string, options : RequestInit ) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type' : 'Application/json'
        },
        ...options
    });
    const data = await response.json();
    return data;
}