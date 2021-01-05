import http from "./httpService";
import { apiUrl, limit } from "../config.json";

const apiEndpoint = `${apiUrl}/api/pricerates`;

// http.setContentType('application/json');

export function getPrices() {
    return http.get(`${apiEndpoint}/${limit}`);
}

export function getPrice(priceId) {
    return http.get(`${apiEndpoint}/${priceId}`);
}

export function savePrice(price) {
    if (price.get('id')) {
        return http.put(apiEndpoint, price);
    }
    return http.post(apiEndpoint, price);
}

export function deletePrice(priceId) {
    return http.delete(`${apiEndpoint}/${priceId}`);
}

export function filterPrices(query) {
    return http.get(`${apiEndpoint}/${query}`);
}