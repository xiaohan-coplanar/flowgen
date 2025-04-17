import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { ExecException } from 'child_process';

const execAsync = promisify(exec);

interface ExecError extends ExecException {
  stderr?: string;
}

export async function renderMermaid(inputPath: string, outputPath: string = 'output.png'): Promise<string> {
  try {    
    await execAsync(`npx mmdc -i "${inputPath}" -o "${outputPath}"`);
    return outputPath;
  } catch (err) {
    const error = err as ExecError;
    throw error;
  } 
}

const currentFile = fileURLToPath(import.meta.url);
const entryFile = resolve(process.argv[1]);
if (currentFile === entryFile) {
  console.log('Rendering Mermaid diagram...');
  renderMermaid('sample.mmd', 'sample_output.png')
    .then(() => console.log('✅ Done'))
    .catch((err: Error) => console.error('❌ Error:', err));
}