const endpoint = import.meta.env.VITE_CITIES_ENDPOINT;

export const getCityName = async (lat, lon) => {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const data = await response.json();
        const city = data.city || data.locality || data.principalSubdivision || "Unknown Location";
        return data.countryName ? `${city}, ${data.countryName}` : city;
    } catch {
        return "Your Location";
    }
}

export const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser"));
            return;
        }
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const cityName = await getCityName(latitude, longitude);
            resolve({
                latitude,
                longitude,
                cityName,
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