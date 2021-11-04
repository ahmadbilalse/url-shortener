import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import styles from "./SearchForm.module.scss";
import { useLazyShorten } from "../../utils/shortenerApi";
import Loader from "../Loader/Loader";
import classNames from "classnames";

export default function SearchForm() {
  const [input, setInput] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);
  const [execute, { loading, error }] = useLazyShorten();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    execute(input);
  };

  const handleClear = (e: SyntheticEvent) => {
    setInput("");
    if (inputEl.current) {
      inputEl.current.focus();
    }
  };

  const handleChange = (e: SyntheticEvent) => {
    setInput((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <form className={classNames({
        [styles.container]: true,
        [styles.form__error]: error,
      })}>
        <input
          ref={inputEl}
          onChange={handleChange}
          value={input}
          placeholder="Enter URL here"
          className={styles.input}
          type="text"
        />
        <>
          {input ? (
            <div onClick={handleClear} className={styles.clearButton}>
              &#215;
            </div>
          ) : null}
          {loading ? (
            <Loader />
          ) : (
            <button onClick={handleSubmit} className={styles.button}>
              Shorten
            </button>
          )}
        </>
      </form>
      {error ? <p className={styles.error}>{error.message}</p> : null}
    </>
  );
}
