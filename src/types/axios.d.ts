declare module "axios" {
    export interface AxiosRequestConfig {
        headers?: Record<string, string>;
    }

    export interface AxiosResponse<T = any> {
        data: T;
        status: number;
        statusText: string;
        headers: any;
        config: AxiosRequestConfig;
        request?: any;
    }

    export class AxiosError<T = any> extends Error {
        config: AxiosRequestConfig;
        code?: string;
        request?: any;
        response?: AxiosResponse<T>;
        isAxiosError: boolean;
        toJSON: () => object;
    }

    export function request<T = any>(
        config: AxiosRequestConfig
    ): Promise<AxiosResponse<T>>;
    export function get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>>;
    export function del<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>>;
    export function head<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>>;
    export function post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>>;
    export function put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>>;
    export function patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>>;

    const axios: {
        request: typeof request;
        get: typeof get;
        delete: typeof del;
        head: typeof head;
        post: typeof post;
        put: typeof put;
        patch: typeof patch;
    };

    export default axios;
}
