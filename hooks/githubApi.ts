import axios from 'axios';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { languages } from '../models/languages';
import { Repository, RepositorySearchResponse } from '../models/repository';
import { sortOptions } from '../models/sortOptions';

axios.defaults.baseURL = 'https://api.github.com';

export enum GithubAPIState {
  idle,
  loading,
  success,
  error,
}

interface UseGithubSearchReturnInterface {
  state: GithubAPIState;
  repositories: Repository[];
  currentPage: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
  setQuery: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<string | null>>;
  language: string | null;
  setSortBy: Dispatch<SetStateAction<string | null>>;
  sortBy: string | null;
}

export const useGithubSearch = (
  initialQuery: string | null
): UseGithubSearchReturnInterface => {
  const router = useRouter();
  const [state, setState] = useState(GithubAPIState.idle);
  const [query, setQuery] = useState<string>(initialQuery ?? '');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [language, setLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [currentPage, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(currentPage);

  const searchRepositories = async (
    query: string,
    sortBy: string | null,
    language: string | null,
    currentPage: number
  ): Promise<void> => {
    router.push('/?q=' + query);

    try {
      setState(GithubAPIState.loading);

      const encodedQuery = encodeURIComponent(
        query + (language ? `+language:${language}` : '')
      );

      let url = `/search/repositories?q=${encodedQuery}`;

      const sortEntry = Object.entries(sortOptions).find(
        ([_, value]) => value === sortBy
      );

      if (sortEntry) url += `&sort=${sortEntry[0]}`;

      url += `&page=${currentPage}`;

      const response = await axios.get<RepositorySearchResponse>(url);

      setState(GithubAPIState.success);
      setRepositories(response.data.items);
      setTotalPages(Math.floor(response.data.total_count / 30));
    } catch (error) {
      setState(GithubAPIState.error);
    }
  };

  const debouncedRepos = useMemo(() => {
    return _.debounce(searchRepositories, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query) debouncedRepos(query, sortBy, language, currentPage);
    else {
      setState(GithubAPIState.idle);
      router.push('/');
    }

    return () => debouncedRepos.cancel();
  }, [query, debouncedRepos, sortBy, language, currentPage]);

  return {
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
  };
};
