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
npm link
```
3. Add your LLM API key:
It can be any LLM(OpenAI, Anthropic, Ollama etc.) as long as it supports the OpenAI API.
```sh
export LLM_API_KEY="your_llm_api_key"
export LLM_BASE_URL="your_llm_base_url"
export LLM_MODEL="your_llm_model"
```
Or you can create a .env file in the root directory and add the following:
```sh
LLM_API_KEY="your_llm_api_key"
LLM_BASE_URL="your_llm_base_url"
LLM_MODEL="your_llm_model"
```
4. Run the demo via command line:
```sh
flowgen “your prompt here”
```
It will genenerate a output.png file in the current directory.

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
