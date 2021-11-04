import { ResultLink } from './../state/store';
import { useState } from "react";
import useStore from "../state/store";

export const shorten = async (url: string) => {
  const query = `https://api.shrtco.de/v2/shorten?url=${url}`
  const result = await (await fetch(query)).json();
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
      const result: ResultLink = {
        originalLink: val.result.original_link,
        shortLink: val.result.short_link,
        fullShortLink: val.result.full_short_link,
      }
      gSetResult(result);
    }).catch((e) => {
      if (typeof e === "string") {
        setError(new Error(e));
      } else if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error('Something went wrong'));
      }
    }).finally(() => {
      setLoading(false);
    });
  }

  return [
    execute, { data, loading, error },
  ];
}
