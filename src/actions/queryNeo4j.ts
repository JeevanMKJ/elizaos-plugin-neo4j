import type { IActionDefinition, ActionResult, Context } from "@elizaos/core";
import { elizaLogger } from "@elizaos/core";
import { Neo4jProvider } from "../providers";

/**
 * Action to query Giveth projects from Neo4j
 */
export const queryNeo4jAction: IActionDefinition = {
    name: "queryNeo4j",
    description: "Query Giveth projects using natural language",
    parameters: {
        query: {
            type: "string",
            description: "Natural language query about Giveth projects",
        },
        filters: {
            type: "object",
            description: "Optional filters to apply to the query",
            properties: {
                categories: {
                    type: "array",
                    description: "Categories to filter by",
                    items: {
                        type: "string",
                    },
                },
                minDonations: {
                    type: "number",
                    description: "Minimum number of donations",
                },
                dateRange: {
                    type: "object",
                    description: "Date range for project creation",
                    properties: {
                        start: { type: "string" },
                        end: { type: "string" },
                    },
                },
            },
            required: [],
        },
    },
    required: ["query"],
    handler: async (
        context: Context,
        { query, filters = {} }: { query: string; filters?: any }
    ): Promise<ActionResult> => {
        try {
            elizaLogger.debug(`Executing Neo4j query: ${query}`);

            const neo4jProvider = new Neo4jProvider();
            const projects = await neo4jProvider.queryProjects(query, filters);

            if (projects.length === 0) {
                return {
                    result: "No projects found matching your query.",
                    success: true,
                };
            }

            // Format results for conversation
            let responseText = `I found ${projects.length} projects matching your query:\n\n`;

            projects.forEach((project, index) => {
                responseText += `${index + 1}. **${project.title}**\n`;
                responseText += `   ${project.description.substring(0, 150)}${
                    project.description.length > 150 ? "..." : ""
                }\n`;
                if (project.categories && project.categories.length > 0) {
                    responseText += `   Categories: ${project.categories.join(
                        ", "
                    )}\n`;
                }
                responseText += "\n";
            });

            return {
                result: responseText,
                success: true,
                data: projects,
            };
        } catch (error) {
            elizaLogger.error("Error in queryNeo4j action:", error);
            return {
                result: "Sorry, I encountered an error while querying Giveth projects. Please try again later.",
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    },
};
