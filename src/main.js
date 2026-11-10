import './style.css'
import { getUserLocation } from './location';
import { weatherApi } from './weatherApi'

(async () => {
    const userCoords = await getUserLocation();
    weatherApi(userCoords);
})();