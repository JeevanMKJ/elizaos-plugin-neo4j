import { z } from "zod";

// Configuration schema for the plugin
export const Neo4jConfigSchema = z.object({
    apiKey: z.string().min(1, "API key is required"),
    apiUrl: z
        .string()
        .url("Valid API URL is required")
        .default("https://api.giveth.io/neo4j"),
});

export type Neo4jConfig = z.infer<typeof Neo4jConfigSchema>;

// Types for Giveth Projects
export interface Project {
    id: string;
    title: string;
    description: string;
    walletAddress: string;
    categories?: string[];
    tags?: string[];
    creationDate?: string;
    lastUpdated?: string;
    donations?: Donation[];
    donors?: Donor[];
    // Add any other relevant fields from the Neo4j database
}

export interface Donation {
    id: string;
    amount: number;
    currency: string;
    date: string;
    donor?: Donor;
}

export interface Donor {
    id: string;
    walletAddress: string;
    totalDonations?: number;
}

// Request and response types
export interface ProjectQueryRequest {
    query: string;
    filters?: {
        categories?: string[];
        minDonations?: number;
        dateRange?: {
            start?: string;
            end?: string;
        };
        // Add other possible filter criteria
    };
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
