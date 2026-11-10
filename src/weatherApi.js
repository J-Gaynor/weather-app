const endpoint = import.meta.env.VITE_API_ENDPOINT;

export const weatherApi = async (coords) => {
    console.log(coords);
    const userEndpoint = `${endpoint}${coords.latitude},${coords.longitude}`;
    const response = await fetch(userEndpoint);
    const fetched = await response.json();
    console.log(fetched);
}