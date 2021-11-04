import { ResultLink } from './../state/store';
import { useState } from "react";
import useStore from "../state/store";
import { ValidationError } from './error';

const NO_URL_SPECIFIED = 1;
const INVALID_URL = 2;

export const shorten = async (url: string) => {
  const query = `https://api.shrtco.de/v2/shorten?url=${url}`;
  const result = await fetch(query).then((response) => {
    return response.json();
  }).then(data => {
    if (data.ok) {
      return data;
    } else {
      if (data.error_code === NO_URL_SPECIFIED || data.error_code === INVALID_URL) {
        return new ValidationError('Invalid URL');
      } else {
        return new Error('Something went wrong');
      }
    }
  });
  return result;
}

export const useLazyShorten = (): [Function, { data: any, loading: boolean, error: Error | undefined }] => {
  const gSetResult = useStore(state => state.setResult);
  const [data, setData] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  const execute = (input: string) => {
    setLoading(true);
    shorten(input).then((val) => {
      if (val instanceof Error) {
        throw val;
      } else {
        const result: ResultLink = {
          originalLink: val.result.original_link,
          shortLink: val.result.short_link,
          fullShortLink: val.result.full_short_link,
        }
        setError(undefined);
        gSetResult(result);
      }
    }).catch((e) => {
      if (e instanceof TypeError) {
        setError(new Error('Something went wrong, please check your internet connection'));
      } else {
        setError(e);
      }
    }).finally(() => {
      setLoading(false);
    });
  }

  return [
    execute, { data, loading, error },
  ];
}
