/**
 * Permission levels supported by token-based authentication.
 */
export type TokenPermission = 'full' | 'read' | 'write';
/**
 * Generic permission union reused outside token resources.
 */
export type Permissions = 'full' | 'read' | 'write';

/**
 * Token metadata returned by token listing and lookup endpoints.
 */
export type Token = {
  id: number;
  name: string;
  token: string;
  permission: TokenPermission;
  createdAt: string;
  expiresAt: string | null;
};

/**
 * Payload used to create a workspace, datasource, or network token.
 */
export type TokenForm = {
  name: string;
  permission: TokenPermission;
  expiresAt: string | null;
};

/**
 * Minimal token creation response containing the generated secret.
 */
export type TokenID = {
  id: number;
  token: string;
};
