# Eliza Neo4j Plugin for Giveth

This plugin allows Eliza to query and interact with Giveth projects stored in a Neo4j database through a REST API.

## Features

-   Query Giveth projects using natural language
-   Get detailed information about specific projects
-   List recent projects
-   Secure API communication with authentication

## Installation

### From Package

```bash
npx elizaos plugins add @elizaos/plugin-neo4j
```

### Manual Installation

1. Clone this repository
2. Install dependencies:
    ```bash
    pnpm install
    ```
3. Build the plugin:
    ```bash
    pnpm build
    ```

## Configuration

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

-   `/src/actions` - Actions for Eliza to query Neo4j
-   `/src/providers` - API communication with the Neo4j server
-   `/src/types.ts` - TypeScript type definitions
-   `/src/environment.ts` - Configuration management
-   `/src/index.ts` - Plugin entry point

### Building

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

## Security

This plugin securely stores and manages the Neo4j API key, including it in all requests to the API.
