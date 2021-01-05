import http from "./httpService";
import { apiUrl, limit } from "../config.json";

const apiEndpoint = `${apiUrl}/api/requests`;

export function getRequests() {
    return http.get(`${apiEndpoint}/${limit}`);
}

export function getRequest(requestId) {
    return http.get(`${apiEndpoint}/${requestId}`);
}

export function saveRequest(request) {
    if (request.id) {
        return http.put(apiEndpoint, request);
    }
    return http.post(apiEndpoint, request);
}

export function deleteRequest(requestId) {
    return http.delete(`${apiEndpoint}/${requestId}`);
}

export function filterRequests(query) {
    return http.get(`${apiEndpoint}/${query}`);
}
