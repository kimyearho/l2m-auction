import axios, {
 AxiosError,
} from 'axios';
import { defaultEnv } from '../config/env';
import crypto from 'crypto';
import https from 'https';

export interface ErrorResponse {
 status?: number;
 timestamp?: Date;
 errorResponse?: {
  errorCode?: string;
  message?: string;
 };
}

/**
 * Handle this problem with Node 18
 * write EPROTO B8150000:error:0A000152:SSL routines:final_renegotiate:unsafe legacy renegotiation disabled
 * see https://stackoverflow.com/questions/74324019/allow-legacy-renegotiation-for-nodejs/74600467#74600467
 * https://johnnyreilly.com/node-18-axios-and-unsafe-legacy-renegotiation-disabled
 **/
const allowLegacyRenegotiationforNodeJsOptions = {
 httpsAgent: new https.Agent({
  // for self signed you could also add
  // rejectUnauthorized: false,
  // allow legacy server
  secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
 }),
};


export const http = axios.create({
 ...allowLegacyRenegotiationforNodeJsOptions,
 baseURL: defaultEnv.API_URL,
 timeout: 3000,
})

http.interceptors.request.use((config) => {
 if (config.headers) {
  config.headers['Authorization'] = `Bearer ${defaultEnv.API_KEY}`;
 }
 return config;
});

http.interceptors.response.use(
 (response) => {
  // console.log('Response config >>>', response)
  return response;
 },
 async (error: AxiosError<ErrorResponse>) => {
  if (!error.response) return error;
  // const originalConfig = error.config;
 },
);