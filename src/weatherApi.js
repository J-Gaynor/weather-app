const endpoint = import.meta.env.VITE_API_ENDPOINT;

export const weatherApi = async () => {
    const response = await fetch(endpoint);
    const fetched = await response.json();
    console.log(fetched);
}