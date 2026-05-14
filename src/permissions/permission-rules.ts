export const isPermissionOwnedByModule = (moduleKey: string, permission: string): boolean =>
  permission.startsWith(`${moduleKey}:`);

export const validatePermissionNamespaceOwnership = (
  moduleKey: string,
  permissions: string[]
): boolean => permissions.every((permission) => isPermissionOwnedByModule(moduleKey, permission));
