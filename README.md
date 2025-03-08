# Eliza Neo4j Plugin for Giveth

This plugin allows Eliza to query and interact with Giveth projects stored in a Neo4j database through a REST API.

[Giveth](https://giveth.io/) is a platform that empowers changemakers to accept crypto donations for nonprofit projects and social causes.

## Features

- Query Giveth projects using natural language
- Get detailed information about specific projects
- List recent projects
- Secure API communication with authentication

## Installation

### From Package

----This plugin should be available soon with Eliza.----

### Manual Installation

1. Add repository directly into ~/eliza/packages

   ```bash
    pnpm add github:JeevanMKJ/elizaos-plugin-neo4j
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the plugin:
   ```bash
   pnpm build
   ```

## Configuration

To configure the Neo4j plugin for Giveth, you need to:

1. Add the plugin to your character file
2. Set up your Giveth Neo4j access (API key and URL)
3. Obtain a Giveth API key (see section below)

Add the Neo4j plugin to your character file:

```json
{
  "name": "Your Eliza Character",
  "plugins": ["@elizaos/plugin-neo4j"],
  "settings": {
    "secrets": {
      "neo4j": {
        "apiKey": "YOUR_API_KEY",
        "apiUrl": "https://api.giveth.io/neo4j"
      }
    }
  }
}
```

### Obtaining a Giveth API Key

The Giveth Neo4j API is not publicly available through a self-service process. To obtain an API key:

1. Visit the [Giveth website](https://giveth.io/)
2. Connect with the Giveth team via email info@giveth.io.
3. Explain your use case and request access to the Neo4j API
4. Once approved, you'll receive an API key to use with this plugin

## Usage

This plugin provides the following actions that Eliza can use:

### queryNeo4j

Query Giveth projects using natural language.

```
queryNeo4j("Show me projects related to climate change")
```

### getGivethProjectDetails

Get detailed information about a specific Giveth project.

```
getGivethProjectDetails("project-123")
```

### getRecentGivethProjects

Get a list of recent Giveth projects.

```
getRecentGivethProjects(5)
```

## Example Conversations

User: "What projects are working on climate change?"
Eliza: _Uses queryNeo4j to find and display climate change projects_

User: "Tell me more about the first project"
Eliza: _Uses getGivethProjectDetails to show detailed information_

User: "What are the newest projects on Giveth?"
Eliza: _Uses getRecentGivethProjects to list recent projects_

## Development

### Project Structure

- `/src/actions` - Actions for Eliza to query Neo4j
- `/src/providers` - API communication with the Neo4j server
- `/src/types.ts` - TypeScript type definitions
- `/src/environment.ts` - Configuration management
- `/src/index.ts` - Plugin entry point
