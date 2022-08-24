import Head from "next/head";
import { ResponsiveAppBar } from "./GlobalNavBar";
import React from "react";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <ResponsiveAppBar></ResponsiveAppBar>
      </Head>
      <main>{children}</main>
    </>
  );
}