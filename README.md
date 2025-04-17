# flowgen
flowgen is an open-source tool that turns plain text into beautiful, structured flowcharts.  Designed for developers, writers, and technical communicators, flowgen lets you express logic, processes, or ideas in simple, readable text—and automatically converts it into flow diagrams.

## Requirements

- Node.js 14 or higher
- Chrome or Chromium-based browser (for rendering)

## Quick Start
1. Install dependencies:
```sh
npm install
```
2. Run the Build Process:
```sh
npm run build
```
3. Run the demo:
```sh
npm run render
```
It will genenerate a sample_output.png file in the build folder based on the sample.mmd file.

## Set Up MCP Server
1. Run the Build Process:
```sh
npm run build
```
2. Download Claude Desktop from [here](https://claude.ai/download) or any other MCP client.
3. Open the claude_desktop_config.json file and add the following configuration:
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
4. Restart the MCP client 
