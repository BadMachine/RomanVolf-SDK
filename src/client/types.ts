export type SortType = 'asc' | 'desc';

export type QueryParams = Omit<RequestParams, 'id'>;

export interface ConstructorParams {
  authKey?: string;
}

export interface SortParam {
  [key: string]: SortType;
}

interface MatchParam {
  [key: string]: string | boolean;
  not: boolean;
}

interface IncludeParam {
  [key: string]: string[] | boolean;
  not: boolean;
}

interface ExistenceParam {
  [key: string]: boolean;
}

export interface RequestParams {
  id?: string;
  limit?: number;
  page?: number;
  offset?: number;
  sort?: SortParam;
  match?: MatchParam;
  include?: IncludeParam;
}

export interface BookParams extends RequestParams {
  chapters?: boolean;
}

export interface MovieParams extends RequestParams {
  quote?: boolean;
}

export interface CharacterParams extends MovieParams, RequestParams {}
