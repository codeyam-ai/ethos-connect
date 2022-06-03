import { QueryRequest } from '../types/QueryCallTypes';
import apiCall from './apiCall';

const query = async (params: QueryRequest) => {
  const {
    network,
    address,
    abi,
    functionName,
    inputValues,
    host
  } = params;

  const { json: { response } } = await apiCall({
    relativePath: 'contracts/query',
    body: {
      network,
      address,
      abi,
      functionName,
      inputValues
    },
    method: 'POST',
    host
  });

  return response;
};

export default query;
