import { ApiCallRequest, ApiCallResponse } from "../types/ApiCallTypes";
import { appBaseUrl } from "./constants";



const apiCall = async (params: ApiCallRequest): Promise<ApiCallResponse> => {
  if (!params.method) {
    params.method = "GET";
  }

  if (!params.host) {
    params.host = appBaseUrl;
  }

  const data = {
    method: params.method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params.body),
  };

  const response = await fetch(`${params.host}/api/${params.relativePath}`, data);
  const json = await response.json();
  const { status } = response;
  return { json, status };
};

export default apiCall;