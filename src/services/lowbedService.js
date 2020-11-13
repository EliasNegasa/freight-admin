import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/api/machineries`;

export function getLowbeds() {
    return http.get(apiEndpoint);
}

export function getLowbed(lowbedId) {
    return http.get(`${apiEndpoint}/${lowbedId}`);
}

export function saveLowbed(lowbed) {
    if (lowbed.id) {
        return http.put(apiEndpoint, lowbed);
    }

    return http.post(apiEndpoint, lowbed);
}

export function deleteLowbed(lowbedId) {
    return http.delete(`${apiEndpoint}/${lowbedId}`);
}

export function filterLowbeds(query) {
    return http.get(`${apiEndpoint}/${query}`);
}