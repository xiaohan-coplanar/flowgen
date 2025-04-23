import { OpenAI, AzureOpenAI } from 'openai';
import dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const requiredEnvVars = ['LLM_API_KEY', 'LLM_BASE_URL', 'LLM_MODEL'];
const missingVars: string[] = [];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('Missing required environment variables:', missingVars.join(', '));
  console.log('Please set them in your .env file or environment variables.');
  process.exit(1);
}

let openai: OpenAI | AzureOpenAI;
if (process.env['LLM_BASE_URL']?.toLowerCase().includes("azure.com") || process.env['AZURE_API_VERSION']) {
  openai = new AzureOpenAI({
    apiKey: process.env['LLM_API_KEY'],
    baseURL: process.env['LLM_BASE_URL'],
    apiVersion: process.env['AZURE_API_VERSION'] || "2024-12-01-preview"
  });
} else {
  openai = new OpenAI({
    apiKey: process.env['LLM_API_KEY'],
    baseURL: process.env['LLM_BASE_URL']
  });
}

/**
 * Converts user requirements into Mermaid diagram syntax
 * @param userRequirements The text describing what diagram to create
 * @returns Path to the generated image file
 */
export async function generateMermaidFromText(
  userRequirements: string,
): Promise<string> {
  const outputMmdPath = 'output.mmd';

  try {
    // Craft prompt for the OpenAI API
    const response = await openai.chat.completions.create({
      model: process.env['LLM_MODEL'] as string, // Use an appropriate model
      messages: [
        {
          role: "system",
          content: `You are a diagram generation assistant that converts user requirements into Mermaid diagram syntax. 
          Create valid Mermaid syntax for a flowchart diagram based on the user's description.
          Only return the Mermaid code without any explanation or markdown formatting.
          The output should start with the diagram type declaration (e.g., \`\`\`mermaid\\nflowchart TD\\n\`\`\`).`
        },
        {
          role: "user",
          content: userRequirements
        }
      ],
      temperature: 0.7,
    });

    // Extract the Mermaid syntax from the response
    const mermaidSyntax = response.choices[0]?.message?.content?.trim() ?? '';
    
    // Clean up the Mermaid syntax (remove markdown code blocks if present)
    const cleanedSyntax = mermaidSyntax
      .replace(/^```mermaid\n/, '')
      .replace(/\n```$/, '');
    
    // Save the Mermaid syntax to a file
    const mmdFilePath = resolve(process.cwd(), outputMmdPath);
    writeFileSync(mmdFilePath, cleanedSyntax);
    return mmdFilePath;
  } catch (error) {
    console.error('❌ Error generating Mermaid diagram:', error);
    throw error;
  }
}

// Example usage if this file is run directly
const currentFile = fileURLToPath(import.meta.url);
const entryFile = resolve(process.argv[1]);

if (currentFile === entryFile) {
  // Example user requirement
  const userRequirement = process.argv[2] || 
    "Create a diagram showing a user authentication flow with login, registration, and password reset";
  
  console.log('Generating Mermaid diagram from text...');
  generateMermaidFromText(userRequirement)
    .then(outputPath => console.log(`✅ Done! Mermaid syntax saved at: ${outputPath}`))
    .catch(err => console.error('❌ Error:', err));
} 