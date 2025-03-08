import type { Plugin } from "@elizaos/core";
import { actions } from "./actions";
import { updateConfig } from "./environment";
import { Neo4jConfigSchema } from "./types";

/**
 * The Neo4j Giveth plugin for Eliza
 *
 * This plugin allows Eliza to query and interact with Giveth projects
 * stored in a Neo4j database through a REST API.
 */
const neo4jPlugin: Plugin = {
    name: "neo4j",
    version: "0.1.0",
    description: "Neo4j plugin for querying Giveth projects",

    // Export actions that allow Eliza to interact with Neo4j
    actions,

    // Configuration schema for the plugin
    configSchema: Neo4jConfigSchema,

    // Initialize the plugin with provided configuration
    initialize: async (config: any): Promise<void> => {
        // Update the plugin configuration with provided values
        updateConfig(config);

        return Promise.resolve();
    },
};

export default neo4jPlugin;
