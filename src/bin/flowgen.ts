#!/usr/bin/env node
import { renderMermaid } from "../render.js";

renderMermaid(process.argv[2], process.argv[3])
  .then((outputPath) => {
    console.log(`✅ Diagram generated at: ${outputPath}`);
  })
  .catch((err) => {
    console.error("❌ Error:", err);
  });
