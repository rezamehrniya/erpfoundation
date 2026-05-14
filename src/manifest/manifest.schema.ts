import { z } from 'zod';

const MODULE_KEY_REGEX = /^[a-z]+(?:[-_][a-z0-9]+)*$/;
const SEMVER_REGEX = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z-.]+)?$/;

const FORBIDDEN_FIELD_NAMES = new Set([
  'password',
  'passwordHash',
  'accessToken',
  'refreshToken',
  'apiKey',
  'secret',
  'privateKey'
]);

const fieldSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  required: z.boolean()
});

const entitySchema = z.object({
  name: z.string().min(1),
  tenantScoped: z.boolean(),
  fields: z.array(fieldSchema).min(1)
});

export const manifestSchema = z
  .object({
    schemaVersion: z.literal('1.0'),
    moduleKey: z.string().regex(MODULE_KEY_REGEX),
    name: z.string().min(1),
    version: z.string().regex(SEMVER_REGEX),
    layer: z.enum([
      'core-kernel',
      'platform-extension',
      'business-foundation',
      'business-module',
      'localization-pack',
      'example'
    ]),
    description: z.string().min(1),
    dependencies: z.object({
      required: z.array(z.string()),
      optional: z.array(z.string())
    }),
    permissions: z.array(z.string()),
    entities: z.array(entitySchema),
    events: z.array(z.string()),
    settings: z.array(z.unknown())
  })
  .superRefine((manifest, ctx) => {
    for (const permission of manifest.permissions) {
      const expectedPrefix = `${manifest.moduleKey}:`;
      if (!permission.startsWith(expectedPrefix)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['permissions'],
          message: `Permission must start with module namespace ${expectedPrefix}`
        });
      }
      if (!new RegExp(`^${manifest.moduleKey}:[a-z0-9_-]+:[a-z0-9_-]+$`).test(permission)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['permissions'],
          message: 'Permission must follow moduleKey:resource:action'
        });
      }
    }

    for (const eventName of manifest.events) {
      if (!new RegExp(`^${manifest.moduleKey}\.[a-z0-9_-]+\.[a-z0-9_-]+$`).test(eventName)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['events'],
          message: 'Event must follow moduleKey.resource.action'
        });
      }
    }

    for (const entity of manifest.entities) {
      if (manifest.layer !== 'core-kernel' && !entity.tenantScoped) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['entities'],
          message: 'Entities must be tenantScoped unless layer is core-kernel'
        });
      }

      for (const field of entity.fields) {
        if (FORBIDDEN_FIELD_NAMES.has(field.name)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['entities'],
            message: `Forbidden field name: ${field.name}`
          });
        }
      }
    }
  });

export type ManifestV1 = z.infer<typeof manifestSchema>;
