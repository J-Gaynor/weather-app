const endpoint = import.meta.env.VITE_API_ENDPOINT;

export const weatherApi = async (coords, unit = "metric") => {
    const unitGroup = (unit === "metric" || unit?.toLowerCase().includes("c")) ? "metric" : "us";
    const userEndpoint = `${endpoint}${coords.latitude},${coords.longitude}/next14days?unitGroup=${unitGroup}`;
    const response = await fetch(userEndpoint);
    return await response.json();
}