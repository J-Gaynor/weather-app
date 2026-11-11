const endpoint = import.meta.env.VITE_API_ENDPOINT;

export const weatherApi = async (coords, unit) => {
    unit = (unit === "celsius") ? "metric" : "us";
    const userEndpoint = `${endpoint}${coords.latitude},${coords.longitude}/next14days?unitGroup=${unit}`;
    const response = await fetch(userEndpoint);
    return await response.json();
}