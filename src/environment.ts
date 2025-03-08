import { Neo4jConfig, Neo4jConfigSchema } from "./types";
import { elizaLogger } from "@elizaos/core";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Default API key (you provided this in the requirements)
// In a real production environment, this would be loaded from a secure source
const DEFAULT_API_KEY = process.env.NEO4J_API_KEY;
const DEFAULT_API_URL = process.env.NEO4J_API_URL;

/**
 * Load configuration for the Neo4j plugin
 * @param config Optional configuration object to override defaults
 * @returns Validated configuration object
 */
export function loadConfig(config?: Partial<Neo4jConfig>): Neo4jConfig {
  try {
    // Start with default values
    const configToValidate = {
      apiKey: DEFAULT_API_KEY,
      apiUrl: DEFAULT_API_URL,
      ...config,
    };

    // Validate the configuration using Zod schema
    const validatedConfig = Neo4jConfigSchema.parse(configToValidate);

    // Return the validated configuration
    return validatedConfig;
  } catch (error) {
    elizaLogger.error("Failed to load Neo4j plugin configuration:", error);
    throw new Error("Invalid Neo4j plugin configuration");
  }
}

// Global configuration instance
let currentConfig: Neo4jConfig | null = null;

/**
 * Get the current configuration, initializing with defaults if necessary
 * @returns The current configuration
 */
export function getConfig(): Neo4jConfig {
  if (!currentConfig) {
    currentConfig = loadConfig();
  }
  return currentConfig;
}

/**
 * Update the current configuration
 * @param config New configuration values
 * @returns The updated configuration
 */
export function updateConfig(config: Partial<Neo4jConfig>): Neo4jConfig {
  currentConfig = loadConfig({
    ...currentConfig,
    ...config,
  });
  return currentConfig;
}
