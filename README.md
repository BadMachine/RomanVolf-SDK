# RomanVolf-SDK

## Installation via npm

```angular2html
npm i romanvolf-sdk@latest
```

## Usage

```js
import RApi from 'romanvolf-sdk';

const API = new RApi({ authKey: 'your-api-key' });
// authKey is optional field (for those endpoints where auth required)
async function example() {
  const data = await API.getCharacter();

  console.log(data); // Array of result objects
}
```
## Methods available

```
    getBook(params?: BookParams) - if params object not passed will return full list of the books
    getMovie(params?: MovieParams) - if params object not passed will return full list of the movies
    getCharacter(params?: CharacterParams) - if params object not passed will return full list of the characters
    getQuote(params?: RequestParams) - if params object not passed will return full list of the quotes
    getChapter(params?: RequestParams); - if params object not passed will return full list of the chapters
```
## Method parameters

```
Main request parameters object:
{
  id?: string;
  limit?: number;
  page?: number;
  offset?: number;
  sort?: SortParam;
  match?: MatchParam;
  include?: IncludeParam;
}

Sort object:
{
  key: 'asc' | 'desc'; --example { name: 'asc'}
}


Match object:
{
  key: string; -- key for sorting
  not: boolean; -- defines logical not if false 
}

Include object:
{
  key: string[]; --keys to include
  not: boolean; -- defines logical not if false 
}
```

## Implementation details

The client is a class, which contains list of methods.
For convenience main get method wrapped in a typescript decorator, called MutateQuery so user just could pass
a common js object (parameters) to the function, and the decorator will mutate relevant url depending on parameters.
