import axios, { AxiosInstance } from 'axios';
import { BookParams, CharacterParams, ConstructorParams, MovieParams, QueryParams, RequestParams } from './types';

enum Routes {
  BOOK = 'book',
  MOVIE = 'movie',
  CHARACTER = 'character',
  QUOTE = 'quote',
  CHAPTER = 'chapter',
}

function MutateQuery(
  target: RApi,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<(url: string, query: QueryParams) => Promise<void>>,
) {
  const method = descriptor.value;
  if (method) {
    descriptor.value = function (...args: any[]) {
      const { sort = {}, match = {}, include = {}, existence = {} } = args[1] || {};
      const [sortKey, sortValue] = [Object.keys(sort)[0], Object.values(sort)[0]];
      const [matchKey, matchValue] = [Object.keys(match)[1], Object.values(match)[1]];
      const [includeKey, includeValue] = [Object.keys(include)[1], Object.values(include)[1]];
      const [notMatch, notInclude] = [Object.values(match)[0], Object.values(include)[0]];
      const url = args[0];

      if (matchKey && matchValue) {
        delete args[1].match;
        args[1][notMatch ? `${matchKey}!` : matchKey] = matchValue;
      }

      if (includeKey && includeValue) {
        delete args[1].include;
        args[1][notInclude ? `${includeKey}!` : includeKey] = (includeValue as []).join();
      }

      if (sortKey && sortValue) {
        args[1].sort = `${sortKey}:${sortValue}`;
      }

      return method.apply(this, [url, args[1]]);
    };
  }
}

class RApi {
  private instance: AxiosInstance;
  constructor(private params?: ConstructorParams) {
    this.instance = this.getInstance();
  }

  private handleError(status: number, error: Error) {
    switch (status) {
      case 401: {
        return new Error('Unauthorized. Please make sure the token is provided');
      }
      case 429: {
        return new Error('Too many requests. Please try again later');
      }
      case 404: {
        return new Error('Resource not found');
      }
      default: {
        return `Unexpected error: ${error}`;
      }
    }
  }

  private getInstance() {
    const instance = axios.create({
      baseURL: ' https://the-one-api.dev/v2/',
      headers: {
        Authorization: `Bearer ${this.params?.authKey}`,
      },
    });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorMessage = this.handleError(error?.response?.status, error);

        return Promise.reject(errorMessage);
      },
    );

    return instance;
  }

  @MutateQuery
  async get(url: string, query: QueryParams) {
    return this.instance
      .get(url, {
        params: {
          ...query,
        },
      })
      .then((res) => res.data.docs)
      .catch((e) => {
        throw e;
      });
  }

  async getBook(params?: BookParams) {
    const { id = null, chapters = null } = params || {};

    let url = Routes.BOOK as string;

    if (id) {
      url = `${url}/${id}`;

      if (chapters) {
        url = `${url}/chapter`;
      }
    }

    return this.get(url, params as QueryParams);
  }

  async getMovie(params?: MovieParams) {
    const { id = null, quote = null } = params || {};

    let url = Routes.MOVIE as string;

    if (id) {
      url = `${url}/${id}`;

      if (quote) {
        url = `${url}/quote`;
      }
    }
    return this.get(url, params as QueryParams);
  }

  async getCharacter(params?: CharacterParams) {
    const { id = null, quote = null } = params || {};

    let url = Routes.CHARACTER as string;

    if (id) {
      url = `${url}/${id}`;

      if (quote) {
        url = `${url}/quote`;
      }
    }
    return this.get(url, params as QueryParams);
  }

  async getQuote(params?: RequestParams) {
    const { id = null } = params || {};
    let url = Routes.QUOTE as string;

    if (id) url = `${url}/${id}`;

    return this.get(url, params as QueryParams);
  }

  async getChapter(params?: RequestParams) {
    const { id = null } = params || {};
    let url = Routes.CHAPTER as string;

    if (id) url = `${url}/${id}`;

    return this.get(url, params as QueryParams);
  }
}

export default RApi;
