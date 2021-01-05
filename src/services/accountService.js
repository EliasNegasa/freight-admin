import http from "./httpService";
import { apiUrl, limit } from "../config.json";

const apiEndpoint = `${apiUrl}/api/payments`;

// http.setContentType('application/json');

export function getAccounts() {
    return http.get(`${apiEndpoint}/${limit}`);
}

export function getAccount(accountId) {
    return http.get(`${apiEndpoint}/${accountId}`);
}

export function saveAccount(account) {
    if (account.id) {
        return http.put(`${apiEndpoint}/recharge`, account);
        // return http.put(`${apiEndpoint}`, account);
    }
    return http.post(apiEndpoint, account);
}

export function deleteAccount(accountId) {
    return http.delete(`${apiEndpoint}/${accountId}`);
}

export function filterAccounts(query) {
    return http.get(`${apiEndpoint}/${query}`);
}