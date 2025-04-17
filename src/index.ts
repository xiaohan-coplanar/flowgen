import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { renderMermaid } from "./render.js";
import { z } from "zod";

const server = new McpServer({
    name: "flowgen",
    version: "1.0.0"
  });


server.tool(
    "renderMermaid", 
    "Render a mermaid diagram by providing the input path for the mermaid diagram and the output path for the rendered image",
    {
        input: z.string().describe("The path to the mermaid diagram"), 
        output: z.string().describe("The path to the rendered image")
    },
    async ({input, output}) => {
        const output_path = await renderMermaid(input, output);
        return {
            content: [{
                type: "text",
                text: output_path,
            }]
        }
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Flowgen MCP Server running on stdio");
}
  
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});