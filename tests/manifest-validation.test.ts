import { describe, expect, it } from 'vitest';
import contactsManifest from '../examples/manifests/contacts.manifest.json' with { type: 'json' };
import { validateManifest } from '../src/manifest/validate-manifest.js';

describe('manifest validation', () => {
  it('valid contacts manifest passes', () => {
    expect(() => validateManifest(contactsManifest)).not.toThrow();
  });

  it('invalid schemaVersion fails', () => {
    expect(() => validateManifest({ ...contactsManifest, schemaVersion: '2.0' })).toThrow();
  });

  it('invalid moduleKey fails', () => {
    expect(() => validateManifest({ ...contactsManifest, moduleKey: 'Contacts' })).toThrow();
  });

  it('permission outside module namespace fails', () => {
    expect(() =>
      validateManifest({ ...contactsManifest, permissions: ['sales:party:read'] })
    ).toThrow();
  });

  it('dangerous field name fails', () => {
    const dangerous = {
      ...contactsManifest,
      entities: [
        {
          ...contactsManifest.entities[0],
          fields: [...contactsManifest.entities[0].fields, { name: 'password', type: 'string', required: false }]
        }
      ]
    };
    expect(() => validateManifest(dangerous)).toThrow();
  });
});
