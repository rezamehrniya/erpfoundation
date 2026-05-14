import { describe, expect, it } from 'vitest';
import { validatePermissionNamespaceOwnership } from '../src/permissions/permission-rules.js';

describe('permission rules', () => {
  it('accepts owned permissions', () => {
    expect(validatePermissionNamespaceOwnership('contacts', ['contacts:party:read'])).toBe(true);
  });

  it('rejects external namespace', () => {
    expect(validatePermissionNamespaceOwnership('contacts', ['sales:quote:read'])).toBe(false);
  });
});
