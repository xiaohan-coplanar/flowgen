#!/usr/bin/env node
import { renderMermaid } from "../render.js";
import { generateMermaidFromText } from "../generate-mermaid.js";

const userRequirements = process.argv[2];
const outputImagePath = process.argv[3] || 'output.png';

if (!userRequirements) {
  console.error('❌ Please provide the user requirements as the first argument.');
  process.exit(1);
}

console.log('Generating Mermaid diagram from text...');
try {
  const outputPath = await generateMermaidFromText(userRequirements);
  console.log(`✅ Mermaid syntax saved to ${outputPath}`);
  const finalOutputPath = await renderMermaid(outputPath, outputImagePath);
  console.log(`✅ Diagram rendered to ${finalOutputPath}`);
} catch (err) {
  console.error('❌ Error:', err);
  process.exit(1);
}