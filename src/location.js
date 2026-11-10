const endpoint = import.meta.env.VITE_CITIES_ENDPOINT;

export const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser"));
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        }, (error) => {
            reject(error);
        })
    })
}

export const searchLocation = async (search) => {
    const response = await fetch(`${endpoint}${search}&count=10`);
    const data = await response.json();
    if (!data.results) return [];
    const results = data.results;
    const filteredResults = results.map((city) => ({
        name: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
    }));
    return filteredResults;
}