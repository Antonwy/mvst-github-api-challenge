import axios from 'axios';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Repository, RepositorySearchResponse } from '../models/repository';

axios.defaults.baseURL = 'https://api.github.com';

export enum GithubRepositorySearchState {
  idle,
  loading,
  success,
  error,
}

interface UseGithubSearchReturnInterface {
  state: GithubRepositorySearchState;
  repositories: Repository[];
}

export const useGithubSearch = (): UseGithubSearchReturnInterface => {
  const router = useRouter();
  const [state, setState] = useState(GithubRepositorySearchState.idle);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const search: string =
    (Array.isArray(router.query.q) ? router.query.q[0] : router.query.q) || '';

  const searchRepositories = async (query: string): Promise<void> => {
    try {
      setState(GithubRepositorySearchState.loading);

      const encodedQuery = encodeURIComponent(query);

      const response = await axios.get<RepositorySearchResponse>(
        `/search/repositories?q=${encodedQuery}`
      );
      setState(GithubRepositorySearchState.success);
      setRepositories(response.data.items);
    } catch (error) {
      setState(GithubRepositorySearchState.error);
    }
  };

  const debouncedRepos = useMemo(() => {
    return _.debounce(searchRepositories, 500);
  }, []);

  useEffect(() => {
    if (search) debouncedRepos(search);

    return () => debouncedRepos.cancel();
  }, [search, debouncedRepos]);

  return {
    state,
    repositories,
  };
};
