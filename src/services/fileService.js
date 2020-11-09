import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/api`;


export function saveFile(file, endpoint) {
    http.setContentType('multipart/form-data');
    return http.put(`${apiEndpoint}/${endpoint}`, file);
}

