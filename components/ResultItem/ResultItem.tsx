import React, { useState } from "react";
import useStore, { ResultLink } from "../../state/store";
import styles from "./ResultItem.module.scss";
import classNames from "classnames";

export default function ResultItem() {
  const gResult: ResultLink | null = useStore((state) => state.result);
  const [copied, setCopied] = useState(false);

  const clickHandler = () => {
    if (gResult) {
      navigator.clipboard.writeText(gResult.fullShortLink).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
    }
  };

  return gResult ? (
    <div className={styles.container}>
      <p className={styles.result}>{gResult.shortLink}</p>
      <button
        onClick={clickHandler}
        className={classNames({
          [styles.button]: true,
          [styles.button__copied]: copied,
        })}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  ) : null;
}
