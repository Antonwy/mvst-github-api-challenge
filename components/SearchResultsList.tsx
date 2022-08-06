import { FC } from 'react';
import { Repository } from '../models/repository';
import 'react-toastify/dist/ReactToastify.css';
import Masonry from 'react-masonry-css';
import { SearchResultsListItem } from './SearchResultsListItem';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface SearchResultsListProps {
  repositories: Repository[];
}

const breakpointColumnsObj = {
  default: 4,
  1400: 3,
  1300: 3,
  1050: 2,
  700: 1,
};

export const SearchResultsList: FC<SearchResultsListProps> = ({
  repositories = [],
}) => {
  return (
    <>
      <AnimateSharedLayout>
        {repositories.length > 1 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {repositories.map((repo) => (
              <SearchResultsListItem key={repo.id} repository={repo} />
            ))}
          </Masonry>
        ) : repositories.length === 1 ? (
          <SearchResultsListItem repository={repositories[0]} />
        ) : null}
      </AnimateSharedLayout>
    </>
  );
};
