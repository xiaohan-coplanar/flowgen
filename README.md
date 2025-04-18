# flowgen
flowgen is an open-source tool that turns plain text into beautiful, structured flowcharts.  Designed for developers, writers, and technical communicators, flowgen lets you express logic, processes, or ideas in simple, readable text—and automatically converts it into flow diagrams.

## Requirements
- Node.js 14 or higher
- Chrome or Chromium-based browser (for rendering)
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
npm link
```
3. Run the demo via command line:
```sh
flowgen sample.mmd
```
It will genenerate a output.png file in the build folder based on the sample.mmd file.

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
            "[PATH TO PARENT FOLDER]/flowgen"
            ]
        },
        "flowgen": {
            "command": "node",
            "args": [
                "[PATH TO PARENT FOLDER]/flowgen/build/index.js"
            ]
        }
    }
}
```

3. Restart the MCP client. Now the MCP tooling should be available in the client.