import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/api/jobs`;

export function getJobs() {
    return http.get(apiEndpoint);
}

export function getJob(jobId) {
    return http.get(`${apiEndpoint}/${jobId}`);
}

export function saveJob(job) {
    if (job.get('id')) {
        return http.put(apiEndpoint, job);
    }
    return http.post(apiEndpoint, job);
}

export function deleteJob(jobId) {
    return http.delete(`${apiEndpoint}/${jobId}`);
}
