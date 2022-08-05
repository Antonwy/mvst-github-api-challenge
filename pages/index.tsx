import type { NextPage } from 'next';
import Head from 'next/head';
import { Text, Container, Spacer, FormElement } from '@nextui-org/react';
import { SearchInput } from '../components/SearchInput';
import { useGithubSearch } from '../controller/githubApi';
import { ChangeEvent } from 'react';
import { SearchResultsList } from '../components/SearchResultsList';
import { ToastContainer } from 'react-toastify';

const Home: NextPage = () => {
  const { state, repositories, setSearch } = useGithubSearch();

  const handleSearchChange = (event: ChangeEvent<FormElement>) => {
    setSearch(event.target.value);
  };

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
        <SearchInput
          searchState={state}
          onChange={handleSearchChange}
          placeholder="Search repositories"
        />
        <Spacer />
        <SearchResultsList repositories={repositories} />
      </Container>
    </>
  );
};

export default Home;
