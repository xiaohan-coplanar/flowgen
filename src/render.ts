import { exec } from 'child_process';
import { promisify } from 'util';
import { ExecException } from 'child_process';
import { join } from 'path';

const execAsync = promisify(exec);

interface ExecError extends ExecException {
  stderr?: string;
}

export async function renderMermaid(inputPath: string, outputPath: string = 'output.png'): Promise<string> {
  try {    
    // Use path.join for cross-platform compatibility
    await execAsync(`npx mmdc -i "${inputPath}" -o "${outputPath}"`);

    console.log('✅ Image generated successfully:', outputPath);
    return outputPath;
  } catch (err) {
    const error = err as ExecError;
    console.error('❌ Error:', error.stderr || error);
    throw error;
  } 
}

renderMermaid('sample.mmd', 'sample_output.png')
  .then(() => console.log('✅ Done'))
  .catch((err: Error) => console.error('❌ Error:', err));