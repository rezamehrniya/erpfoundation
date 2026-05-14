import { manifestSchema, type ManifestV1 } from './manifest.schema.js';

export const validateManifest = (input: unknown): ManifestV1 => manifestSchema.parse(input);
