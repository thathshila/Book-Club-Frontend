import apiClient from "./apiClient.ts";

export const fetchAuditLogs = async () => {
    const res = await apiClient.get("/audit/all");
    return res.data;
};