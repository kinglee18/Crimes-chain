import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ResponsiveAppBar } from "../components/GlobalNavBar";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <ResponsiveAppBar></ResponsiveAppBar>
      </Head>

      <main className={styles.main}></main>
    </div>
  );
};

export default Home;
