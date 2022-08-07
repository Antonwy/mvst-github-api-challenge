import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Text, Container, Spacer, Row, Pagination } from '@nextui-org/react';
import { SearchInput } from '../components/SearchInput';
import { useGithubSearch } from '../hooks/githubApi';
import { SearchResultsList } from '../components/SearchResultsList';
import { ToastContainer } from 'react-toastify';
import {
  resultsVariantObj,
  rocketVariantObj,
  useResultsAnim,
} from '../hooks/resultsAnim';
import { motion } from 'framer-motion';
import Rocket from '../assets/rocket.png';
import Image from 'next/image';
import { Select } from '../components/Select';
import { languages } from '../models/languages';
import { sortOptions } from '../models/sortOptions';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      query:
        (Array.isArray(context.query.q)
          ? context.query.q[0]
          : context.query.q) ?? null,
    },
  };
};

interface HomeProps {
  query: string | null;
}

const Home: NextPage<HomeProps> = ({ query }) => {
  const {
    state,
    repositories,
    setQuery,
    language,
    setLanguage,
    sortBy,
    setSortBy,
    currentPage,
    totalPages,
    setPage,
  } = useGithubSearch(query);
  const { resultsVariant, showResults } = useResultsAnim(state);

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
        css={{ minHeight: '100vh' }}
      >
        <Text h1 css={{ fontSize: '$xl8', color: '$primary' }}>
          MVST
        </Text>
        <Text h1>Github Challenge</Text>

        <Spacer />

        <SearchInput
          initialQuery={query ?? ''}
          onChange={(event) => setQuery(event.target.value)}
          clearSearch={() => {
            return setQuery('');
          }}
          searchState={state}
          placeholder="Search repositories"
        />

        <Spacer y={0.5} />

        <Row justify="center" align="center">
          <Select
            elements={languages}
            selected={language}
            onSelect={(e) => setLanguage(e)}
            hint="Filter by language"
            big
          />

          <Spacer x={0.25} />

          <Select
            elements={Object.values(sortOptions)}
            selected={sortBy}
            onSelect={(e) => setSortBy(e)}
            hint="Sort by"
          />
        </Row>

        <Spacer y={0.5} />

        <motion.div
          animate={resultsVariant}
          variants={resultsVariantObj}
          initial="hide"
        >
          <SearchResultsList repositories={repositories} />
        </motion.div>

        <motion.div
          animate={{
            opacity: showResults ? 1 : 0,
            height: showResults ? 'auto' : 0,
            transition: { delay: showResults ? 1 : 0 },
          }}
        >
          <Pagination
            total={totalPages}
            initialPage={1}
            page={currentPage}
            onChange={setPage}
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: showResults ? 0 : 1,
            transition: { delay: showResults ? 0 : 1 },
          }}
        >
          <Text small css={{ textAlign: 'center', color: '$gray700' }}>
            search through all github repositories.
            <br /> Just type in your search prompt!🤘🏼
          </Text>
        </motion.div>

        {/* <motion.div
          variants={rocketVariantObj}
          animate={rocketVariant}
          initial="initial"
        >
          <Image
            height={400}
            width={400}
            layout="responsive"
            src={Rocket}
            alt="Rocket"
          />
        </motion.div> */}
      </Container>
    </>
  );
};

export default Home;
