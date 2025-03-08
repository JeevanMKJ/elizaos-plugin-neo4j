import {
    type IActionDefinition,
    type ActionResult,
    type Context,
    elizaLogger,
} from "@elizaos/core";
import { Neo4jProvider } from "../providers";

/**
 * Action to get recent Giveth projects
 */
export const getRecentProjectsAction: IActionDefinition = {
    name: "getRecentGivethProjects",
    description: "Get a list of recent Giveth projects",
    parameters: {
        limit: {
            type: "number",
            description: "Maximum number of projects to return (default: 5)",
        },
    },
    required: [],
    handler: async (
        context: Context,
        { limit = 5 }: { limit?: number }
    ): Promise<ActionResult> => {
        try {
            elizaLogger.debug(`Getting ${limit} recent projects`);

            const neo4jProvider = new Neo4jProvider();
            const projects = await neo4jProvider.getRecentProjects(limit);

            if (projects.length === 0) {
                return {
                    result: "No recent projects found.",
                    success: true,
                };
            }

            // Format results for conversation
            let responseText = `Here are the ${projects.length} most recent Giveth projects:\n\n`;

            projects.forEach((project, index) => {
                responseText += `${index + 1}. **${project.title}**\n`;
                responseText += `   ${project.description.substring(0, 100)}${
                    project.description.length > 100 ? "..." : ""
                }\n`;
                if (project.categories && project.categories.length > 0) {
                    responseText += `   Categories: ${project.categories.join(
                        ", "
                    )}\n`;
                }
                responseText += `   Project ID: ${project.id}\n`;
                responseText += "\n";
            });

            responseText +=
                "You can ask for more details about any project by providing its ID.";

            return {
                result: responseText,
                success: true,
                data: projects,
            };
        } catch (error) {
            elizaLogger.error("Error getting recent projects:", error);
            return {
                result: "Sorry, I encountered an error while fetching recent projects. Please try again later.",
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    },
};
