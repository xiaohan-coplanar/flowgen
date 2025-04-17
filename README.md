# flowgen
flowgen is an open-source tool that turns plain text into beautiful, structured flowcharts.  Designed for developers, writers, and technical communicators, flowgen lets you express logic, processes, or ideas in simple, readable text—and automatically converts it into flow diagrams.

## Requirements
- Node.js 14 or higher
- Mermaid.js library

### Installation
Downloading and installing `Node.js` and `npm`: instruction [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Installing `Mermaid.js` using either yarn or npm:

Using yarn:
```sh
npm install --global yarn
yarn add mermaid
```
Using `npm`: `npm install` (under project root directory)

### Additional Requirements for MCP Server

To use the MCP server functionality, you'll need:

- An MCP client such as Claude Desktop ([download here](https://claude.ai/download))
- A valid MCP configuration file:
  - For Claude Desktop users: Follow the [setup instructions](https://modelcontextprotocol.io/quickstart/user) to create your `claude_desktop_config.json`
  - For other MCP clients: Refer to your client's documentation for configuration details.

## Quick Start (without MCP)

1. Run the Build Process:
```sh
npm run build
```
2. Run the demo:
```sh
npm run render
```
It will genenerate a sample_output.png file in the build folder based on the sample.mmd file.

## Quick Start with MCP Server
1. Run the Build Process:
```sh
npm run build
```
2. Open the config file (such as `claude_desktop_config.json`) and add the following configuration:
```json
{
    "mcpServers": {
        "filesystem": {
        "command": "npx",
        "args": [
            "-y",
            "@modelcontextprotocol/server-filesystem",
            "/path/to/flowgen"
            ]
        },
        "flowgen": {
            "command": "node",
            "args": [
                "/path/to/flowgen/build/index.js"
            ]
        }
    }
}
```

3. Restart the MCP client. Now the MCP tooling should be available in the client.