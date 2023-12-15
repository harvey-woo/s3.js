import { Query } from './request';

export function queryStringify(query: Query, encode: ((str: string) => string) | false = encodeURIComponent): string {
  return Object.keys(query).sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }).map((k) => {
    let value;
    const _v = query[k];
    if (_v === undefined) {
      value = '';
    } else if (_v === null) {
      value = '=null';
    } else {
      value = `=${encode ? encode(_v.toString()) : _v.toString()}`;
    }
    return `${k}${value}`;
  }).join('&');
}

