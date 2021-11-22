import React from "react";
import Head from "next/head";
import styles from "./Home.module.scss";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import SearchForm from "../SearchForm/SearchForm";
import ResultItem from "../ResultItem/ResultItem";
import GithubLink from "../GithubLink/GithubLink";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="Github user search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.heading}>shortly</h1>
          <ThemeSwitcher />
        </div>
        <div className={styles.searchForm}>
          <SearchForm />
        </div>
        <ResultItem />
      </main>
      <div className={styles.githubLink}>
        <GithubLink />
      </div>
    </div>
  );
}
