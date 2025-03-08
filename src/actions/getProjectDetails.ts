import {
    type IActionDefinition,
    type ActionResult,
    type Context,
    elizaLogger,
} from "@elizaos/core";
import { Neo4jProvider } from "../providers";

/**
 * Action to get detailed information about a specific Giveth project
 */
export const getProjectDetailsAction: IActionDefinition = {
    name: "getGivethProjectDetails",
    description: "Get detailed information about a specific Giveth project",
    parameters: {
        projectId: {
            type: "string",
            description: "ID of the project to get details for",
        },
    },
    required: ["projectId"],
    handler: async (
        context: Context,
        { projectId }: { projectId: string }
    ): Promise<ActionResult> => {
        try {
            elizaLogger.debug(`Getting details for project: ${projectId}`);

            const neo4jProvider = new Neo4jProvider();
            const project = await neo4jProvider.getProjectById(projectId);

            if (!project) {
                return {
                    result: `No project found with ID: ${projectId}`,
                    success: false,
                };
            }

            // Format project details for conversation
            let responseText = `## ${project.title}\n\n`;
            responseText += `${project.description}\n\n`;

            if (project.categories && project.categories.length > 0) {
                responseText += `**Categories:** ${project.categories.join(
                    ", "
                )}\n`;
            }

            if (project.tags && project.tags.length > 0) {
                responseText += `**Tags:** ${project.tags.join(", ")}\n`;
            }

            responseText += `**Wallet Address:** ${project.walletAddress}\n`;

            if (project.creationDate) {
                responseText += `**Created:** ${new Date(
                    project.creationDate
                ).toLocaleDateString()}\n`;
            }

            if (project.donations && project.donations.length > 0) {
                responseText += `\n### Donations\n`;
                responseText += `This project has received ${project.donations.length} donations.\n`;

                // Calculate total donations
                const totalByToken: Record<string, number> = {};
                project.donations.forEach((donation) => {
                    if (!totalByToken[donation.currency]) {
                        totalByToken[donation.currency] = 0;
                    }
                    totalByToken[donation.currency] += donation.amount;
                });

                // Display totals by currency
                responseText += `\n**Total donations:**\n`;
                Object.entries(totalByToken).forEach(([currency, amount]) => {
                    responseText += `- ${amount.toFixed(4)} ${currency}\n`;
                });
            }

            return {
                result: responseText,
                success: true,
                data: project,
            };
        } catch (error) {
            elizaLogger.error(
                `Error getting project details for ${projectId}:`,
                error
            );
            return {
                result: "Sorry, I encountered an error while fetching project details. Please try again later.",
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    },
};
