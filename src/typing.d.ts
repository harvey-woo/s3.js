import { Method, Query } from "./request";

export interface S3ClientConfig {
    endPoint: string;
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
    region: string;
    debug?: boolean;
}

export interface S3Client {
    constructor(config: S3ClientConfig): S3Client;
    getSignatureUrl(key: string, options?: {
        method?: Method;
        headers?: Headers;
        query?: Query;
        expires?: number;
    }): Promise<string>;
    putObject(key: string, body: string | Blob, options?: {
        method?: Method;
        headers?: Headers;
        query?: Query;
    }): Promise<Response>;
    deleteObject(key: string, options?: {
        method?: Method;
        headers?: Headers;
        query?: Query;
    }): Promise<Response>;
    headObject(key: string, options?: {
        method?: Method;
        headers?: Headers;
        query?: Query;
    }): Promise<Response>;
    getObject(key: string, options?: {
        method?: Method;
        headers?: Headers;
        query?: Query;
    }): Promise<Response>;
}