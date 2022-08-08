import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';

const MVSTGithubApiChallenge = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </ThemeProvider>
  );
};

export default MVSTGithubApiChallenge;
