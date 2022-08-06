import type { NextPage } from 'next';
import Head from 'next/head';
import { Text, Container, Spacer } from '@nextui-org/react';
import { SearchInput } from '../components/SearchInput';
import { useGithubSearch } from '../controller/githubApi';
import { SearchResultsList } from '../components/SearchResultsList';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const { state, repositories } = useGithubSearch();

  const { repo } = router.query;

  const showRepository = repo ? true : false;

  return (
    <>
      <Head>
        <title>MVST Github Search</title>
        <meta name="description" content="MVST Github API Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        closeButton={false}
        style={{
          padding: '16px',
        }}
      />
      <Container
        justify="center"
        alignItems="center"
        display="flex"
        direction="column"
        wrap="nowrap"
      >
        <Text h1 css={{ fontSize: '$xl8', color: '$primary' }}>
          MVST
        </Text>
        <Text h1>Github Challenge</Text>
        <Spacer />
        <SearchInput searchState={state} placeholder="Search repositories" />
        <Spacer />
        <SearchResultsList repositories={repositories} />
      </Container>
    </>
  );
};

export default Home;
