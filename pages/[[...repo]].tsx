import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import {
  Text,
  Container,
  Spacer,
  Row,
  Pagination,
  useTheme,
} from '@nextui-org/react';
import { SearchInput } from '../components/SearchInput';
import { GithubAPIState, useGithubSearch } from '../hooks/githubApi';
import { SearchResultsList } from '../components/SearchResultsList';
import { ToastContainer } from 'react-toastify';
import {
  h1VariantsObj,
  h2VariantsObj,
  resultsVariantObj,
  useResultsAnim,
} from '../hooks/resultsAnim';
import { motion } from 'framer-motion';
import { Select } from '../components/Select';
import { languages } from '../models/languages';
import { sortOptions } from '../models/sortOptions';
import { NoContent } from '../components/NoContent';
import ErrorImg from '../assets/error.png';

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
  const { resultsVariant, showResults, h1Variant, h2Variant } =
    useResultsAnim(state);
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>MVST Github Search</title>
        <meta name="description" content="MVST Github API Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* first render style bug */}
      <script>0</script>
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
        css={{ minHeight: '100vh', p: 0, m: 0 }}
      >
        <motion.h1
          style={{
            color: theme?.colors.primary.value,
            margin: 0,
            padding: 0,
            marginTop: 20,
          }}
          initial="big"
          variants={h1VariantsObj}
          animate={h1Variant}
        >
          MVST
        </motion.h1>
        <motion.h2
          style={{
            color: theme?.colors.gray900.value,
            margin: 0,
            padding: 0,
          }}
          initial="big"
          variants={h2VariantsObj}
          animate={h2Variant}
        >
          Github Challenge
        </motion.h2>

        <Spacer />

        <SearchInput
          initialQuery={query ?? ''}
          onChange={(event) => setQuery(event.target.value)}
          clearSearch={() => {
            return setQuery('');
          }}
          searchState={state}
          placeholder="Search repositories 🔎"
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
          {state === GithubAPIState.error ? (
            <NoContent
              image={ErrorImg}
              message="🚨 An error appeared, try again later! 🚨"
            />
          ) : (
            <SearchResultsList repositories={repositories} />
          )}
        </motion.div>

        {totalPages > 1 && (
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
        )}

        <motion.div
          animate={{
            opacity: showResults ? 0 : 1,
            transition: { delay: showResults ? 0 : 1 },
          }}
        >
          <Text small css={{ textAlign: 'center', color: '$gray700' }}>
            search for all github repositories.
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
