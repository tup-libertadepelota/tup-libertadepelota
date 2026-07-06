import { mkdir, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { build } from 'esbuild';

const execFileAsync = promisify(execFile);
const outDir = 'dist/visualizer';

await mkdir(outDir, { recursive: true });

const result = await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  platform: 'browser',
  format: 'esm',
  metafile: true,
  outdir: outDir,
  write: true,
  logLevel: 'silent',
  loader: {
    '.css': 'css',
    '.png': 'file',
    '.svg': 'file',
  },
});

await writeFile(`${outDir}/meta.json`, JSON.stringify(result.metafile));

await execFileAsync(
  'npx',
  ['esbuild-visualizer', '--metadata', `${outDir}/meta.json`, '--filename', `${outDir}/index.html`],
  { cwd: process.cwd(), stdio: 'inherit' }
);
