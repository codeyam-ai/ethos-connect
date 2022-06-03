export type ApiCallResponse = {
    json: any;
    status: number;
};

export type ApiCallRequest = {
    relativePath: string,
    body: any,
    method?: string,
    host?: string
}
