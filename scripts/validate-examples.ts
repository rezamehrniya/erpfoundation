import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validateManifest } from '../src/manifest/validate-manifest.js';

const manifests = [
  'contacts.manifest.json',
  'sales-lite.manifest.example.json',
  'inventory-lite.manifest.example.json'
];

for (const file of manifests) {
  const path = join(process.cwd(), 'examples', 'manifests', file);
  const parsed: unknown = JSON.parse(readFileSync(path, 'utf8'));
  validateManifest(parsed);
  console.log(`validated: ${file}`);
}
