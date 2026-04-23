import { OrderByFn } from './common.js';

/**
 * Sort fields accepted by payload parser listing endpoints.
 */
export type PayloadParserOrderBy = 'name' | 'description' | 'created_at' | 'updated_at';

/**
 * Minimal payload parser representation used inside nested responses.
 */
export type PayloadParserReduced = {
  id: number;
  name: string;
};

/**
 * Payload parser resource that transforms or decodes inbound payloads.
 */
export type PayloadParser = {
  id: number;
  name: string;
  description: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Payload used to create or update a payload parser.
 */
export type PayloadParserForm = {
  name: string;
  description: string;
  code: string;
};

/**
 * Filters used when listing payload parsers.
 */
export type PayloadParsersListFilters = {
  name?: string;
  description?: string;
  limit?: number;
  offset?: number;
  orderBy?: PayloadParserOrderBy;
  orderByFn?: OrderByFn;
};
