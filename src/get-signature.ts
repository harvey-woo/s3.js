import hmacsha1 from './utils/b64-hamc-sha1';
import { queryStringify } from './query-stringify';
import { Query, Method, Headers } from './request';

type Params = {
  accessKeySecret: string;
  endPoint: string;
  bucket: string;
  key: string,
};


export function qsStringifyForSign(query: Query): string {
  return queryStringify(query, false);
}

const acceptOssQuery = ['uploads', 'uploadId', 'security-token', 'partNumber', 'response-content-disposition'];
const acceptOssQueryObj = Object.fromEntries(acceptOssQuery.map(key => [key, true]));
export async function getSignature({
  params, method, headers, query, debug,
}: { params: Params, method: Method, headers: Headers, query: Query, debug?: boolean }): Promise<string> {
  const dateOrExpires = headers.Date ?? headers['x-oss-date'] ?? query.Expires;
  const ossReg = /^x-oss-/;
  const ossHeaderKeys = Object.keys(headers).filter(key => ossReg.test(key)).sort();
  const ossQuery = Object.fromEntries(Object.entries(query)
    .filter(([key]) => ossReg.test(key) || acceptOssQueryObj[key])
    .map(t => t));
  const ossQueryString = qsStringifyForSign(ossQuery);
  const data = [
    method.toUpperCase(),
    headers['Content-Md5'] || '',
    headers['Content-Type'] || '',
    dateOrExpires,
    ...ossHeaderKeys.map((key) => {
      return `${key}:${headers[key].trim()}`;
    }),
    `/${params.bucket}/${params.key}${ossQueryString ? `?${ossQueryString}` : ''}`,
  ].join('\n');
  const result = await hmacsha1(params.accessKeySecret, data);
  if (debug) {
    console.groupCollapsed('生成OSS签名信息 %s 签名内容如下', result);
    console.info(data);
    console.group('URL为');
    const _queryString = queryStringify({ ...query, Signature: result });
    console.info(`https://${params.bucket}.${params.endPoint}/${params.key}?${_queryString || ''}`);
    console.groupEnd();
    console.groupEnd();
  }
  return result;
}

export default getSignature;
