export type TokenPermission = 'full' | 'read' | 'write';
export type Permissions = 'full' | 'read' | 'write';

export type Token = {
  id: number;
  name: string;
  token: string;
  permission: TokenPermission;
  createdAt: string;
  expiresAt: string | null;
};

export type TokenForm = {
  name: string;
  permission: TokenPermission;
  expiresAt: string | null;
};

export type TokenID = {
  id: number;
  token: string;
};
