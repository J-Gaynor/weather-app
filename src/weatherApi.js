const endpoint = import.meta.env.VITE_API_ENDPOINT;

export const weatherApi = async (coords) => {
    const userEndpoint = `${endpoint}${coords.latitude},${coords.longitude}/next14days`;
    const response = await fetch(userEndpoint);
    return await response.json();
}