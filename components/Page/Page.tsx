import React from "react";
import Head from "next/head";

export interface PageProps {
  /** Page title displayed in the browser tab */
  title: string;
  /**
   * Page description for search engines.
   * It will fallback to title if not specified.
   */
  description?: string;
  /**
   * Page contents
   */
  children?: React.ReactNode;
}

export function Page({
  title,
  description,
  children,
}: PageProps): React.JSX.Element {
  return (
    <>
      <Head>
        <title>{`${title} | Majestic`}</title>
        <meta name="description" content={description || title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}
