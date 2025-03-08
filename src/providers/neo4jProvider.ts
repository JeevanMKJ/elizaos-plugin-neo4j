import axios from "axios";
import { getConfig } from "../environment";
import { ApiResponse, Project, ProjectQueryRequest } from "../types";
import { elizaLogger } from "@elizaos/core";

/**
 * Neo4j API Provider
 * Handles communication with the Giveth Neo4j API
 */
export class Neo4jProvider {
    private apiUrl: string;
    private apiKey: string;

    constructor() {
        const config = getConfig();
        this.apiUrl = config.apiUrl;
        this.apiKey = config.apiKey;
    }

    /**
     * Create authenticated API headers
     * @returns Headers object with auth token
     */
    private getHeaders() {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
        };
    }

    /**
     * Query projects based on natural language query
     * @param query Natural language query string
     * @param filters Optional filters to apply
     * @returns Promise with projects matching the query
     */
    async queryProjects(query: string, filters = {}): Promise<Project[]> {
        try {
            const requestBody: ProjectQueryRequest = {
                query,
                filters,
            };

            elizaLogger.debug(`Querying Neo4j with: ${query}`);

            const response = await axios.post<ApiResponse<Project[]>>(
                `${this.apiUrl}/projects/query`,
                requestBody,
                { headers: this.getHeaders() }
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.error || "Failed to query projects"
                );
            }

            return response.data.data || [];
        } catch (error) {
            elizaLogger.error("Error querying Neo4j projects:", error);
            throw error;
        }
    }

    /**
     * Get project details by ID
     * @param projectId The ID of the project to retrieve
     * @returns Promise with project details
     */
    async getProjectById(projectId: string): Promise<Project> {
        try {
            elizaLogger.debug(`Getting Neo4j project by ID: ${projectId}`);

            const response = await axios.get<ApiResponse<Project>>(
                `${this.apiUrl}/projects/${projectId}`,
                { headers: this.getHeaders() }
            );

            if (!response.data.success) {
                throw new Error(response.data.error || "Failed to get project");
            }

            return response.data.data as Project;
        } catch (error) {
            elizaLogger.error(
                `Error getting Neo4j project ${projectId}:`,
                error
            );
            throw error;
        }
    }

    /**
     * Get recent projects
     * @param limit Number of projects to return (default: 5)
     * @returns Promise with array of recent projects
     */
    async getRecentProjects(limit = 5): Promise<Project[]> {
        try {
            elizaLogger.debug(`Getting ${limit} recent Neo4j projects`);

            const response = await axios.get<ApiResponse<Project[]>>(
                `${this.apiUrl}/projects/recent?limit=${limit}`,
                { headers: this.getHeaders() }
            );

            if (!response.data.success) {
                throw new Error(
                    response.data.error || "Failed to get recent projects"
                );
            }

            return response.data.data || [];
        } catch (error) {
            elizaLogger.error("Error getting recent Neo4j projects:", error);
            throw error;
        }
    }
}
