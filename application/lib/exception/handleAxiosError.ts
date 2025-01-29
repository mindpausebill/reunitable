import logger from './logger';
import { AxiosError } from 'axios';

export class NorthStarError {
  title: string;
  message: string;
  detail: string;

  constructor(title: string, message?: string, detail?: string) {
    logger.error({ title, message, detail }, 'NorthStarError');
    this.title = title;
    this.message = message || '';
    this.detail = detail || '';
  }
}

export function handleAxiosError<T>(e: unknown): T {
  // We cannot infer what this error is
  if (!(e instanceof Error)) {
    throw new NorthStarError('unknownError', 'unknownMessage', JSON.stringify(e, undefined, 2));
  }

  // This is a generic javascript Error
  const axErr = e as AxiosError<unknown>;
  if (axErr.isAxiosError === undefined || axErr.response === undefined) {
    throw new NorthStarError(e.name, e.message, JSON.stringify(e, undefined, 2));
  }

  // This is an Axios Error but there was no server response
  const responseData = axErr.response.data;
  if (responseData === undefined || responseData === null || responseData === '') {
    throw new NorthStarError(e.name, e.message, axErr.response.statusText);
  }

  // There was a server response...
  throw new NorthStarError(
    'HTTP Request Error',
    axErr.message,
    JSON.stringify(
      {
        time: new Date(),
        data: axErr.response.data,
        path: axErr.request.path
      },
      undefined,
      2
    )
  );
}
