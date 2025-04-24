import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  // 添加客户端渲染状态
  const [isClient, setIsClient] = useState(false);

  // 在客户端挂载后设置isClient为true
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Dify Web Client</title>
        <meta name="description" content="Dify Web Client - 与AI高效对话" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isClient ? <Component {...pageProps} /> : <div className="min-h-screen flex items-center justify-center bg-gray-50">加载中...</div>}
    </>
  );
} 