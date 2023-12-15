export enum Method {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
}

export type Headers = Record<string, string>;

export type Query = Record<string, string>;

interface RequestConfig {
    method?: string;
    headers?: Headers;
    query?: Query;
    timeout?: number;
}

interface Response {}

type RequestInterceptor = [
    <T extends RequestConfig>(config: T) => T,
    ((error: any) => any)?,
]

type ResponseInterceptor = [
    <T extends Response>(response: T) => T,
    ((error: any) => any)?,
]

class RequestInstance {}


interface CreateRequestDefault {

}

export interface Request extends RequestInstance {
    create(config?: RequestConfig): RequestInstance;
}