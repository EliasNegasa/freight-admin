import http from "./httpService";
import { apiUrl, limit } from "../config.json";

const apiEndpoint = `${apiUrl}/api/machineries`;

export function getMachineries() {
    return http.get(`${apiEndpoint}/${limit}`);
}

export function getMachinery(machineryId) {
    return http.get(`${apiEndpoint}/${machineryId}`);
}

export function saveMachinery(machinery) {
    if (machinery.get('id')) {
        return http.put(apiEndpoint, machinery);
    }
    return http.post(apiEndpoint, machinery);
}

export function deleteMachinery(machineryId) {
    return http.delete(`${apiEndpoint}/${machineryId}`);
}

export function filterMachineries(query) {
    return http.get(`${apiEndpoint}/${query}`);
}
