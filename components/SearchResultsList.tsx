import { FC, useState } from 'react';
import { Repository } from '../models/repository';
import 'react-toastify/dist/ReactToastify.css';
import Masonry from 'react-masonry-css';
import { SearchResultsListItem } from './SearchResultsListItem';
import { LayoutGroup } from 'framer-motion';

import Empty from '../assets/empty.png';
import Image from 'next/image';
import { Container, Spacer, Text } from '@nextui-org/react';
import { NoContent } from './NoContent';

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
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  if (repositories.length === 0)
    return <NoContent image={Empty} message="No results 😥" />;

  return (
    <LayoutGroup>
      {repositories.length > 1 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {repositories.map((repo) => (
            <SearchResultsListItem
              key={repo.id}
              repository={repo}
              selectRepo={setSelectedRepo}
              selectedRepo={selectedRepo}
            />
          ))}
        </Masonry>
      ) : repositories.length === 1 ? (
        <SearchResultsListItem
          repository={repositories[0]}
          selectRepo={setSelectedRepo}
          selectedRepo={selectedRepo}
        />
      ) : null}
    </LayoutGroup>
  );
};
