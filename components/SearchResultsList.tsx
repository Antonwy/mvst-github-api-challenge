import { FC, useState } from 'react';
import { Repository } from '../models/repository';
import 'react-toastify/dist/ReactToastify.css';
import Masonry from 'react-masonry-css';
import { SearchResultsListItem } from './SearchResultsListItem';
import { LayoutGroup } from 'framer-motion';
import Empty from '../public/assets/empty.png';
import { NoContent } from './NoContent';
import { GithubAPIState } from '../hooks/githubApi';

interface SearchResultsListProps {
  /**
   * repositories to display
   */
  repositories: Repository[];

  /**
   * state of the github api to determine if we need to show the empty state
   */
  state: GithubAPIState;
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
  state,
}) => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

  if (repositories.length === 0 && state === GithubAPIState.success)
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
