import { describe, expect, it } from 'vitest';
import { hasUnsafeEventPayloadKeys } from '../src/events/event-safety.js';

describe('event safety', () => {
  it('unsafe event payload fails', () => {
    expect(hasUnsafeEventPayloadKeys({ password: 'x', tenantId: 't1' })).toBe(true);
  });

  it('safe event payload passes', () => {
    expect(hasUnsafeEventPayloadKeys({ partyId: 'p1', tenantId: 't1' })).toBe(false);
  });
});
