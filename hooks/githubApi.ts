import axios from 'axios';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Repository, RepositorySearchResponse } from '../models/repository';
import { sortOptions } from '../models/sortOptions';

axios.defaults.baseURL = 'https://api.github.com';

export enum GithubAPIState {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

interface UseGithubSearchReturnInterface {
  state: GithubAPIState;
  repositories: Repository[];

  /**
   * Current page for the pagination
   */
  currentPage: number;

  /**
   * Total number of pages for the pagination
   */
  totalPages: number;

  /**
   * To change the current page for the pagination
   */
  setPage: Dispatch<SetStateAction<number>>;

  /**
   * change search triggers, debounced api call
   */
  setQuery: Dispatch<SetStateAction<string>>;

  /**
   * change language filter, triggers debounced api call
   */
  setLanguage: Dispatch<SetStateAction<string | null>>;
  language: string | null;

  /**
   * change sort order, triggers debounced api call
   */
  setSortBy: Dispatch<SetStateAction<string | null>>;
  sortBy: string | null;
}

export const useGithubSearch = (
  initialQuery: string | null
): UseGithubSearchReturnInterface => {
  // router to push current query to url
  const router = useRouter();

  // state of the api call
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
    // save the current query
    router.push('/?q=' + query);

    try {
      setState(GithubAPIState.loading);

      const encodedQuery = encodeURIComponent(
        query + (language ? `+language:${language}` : '')
      );

      let url = `/search/repositories?q=${encodedQuery}`;

      // get correct sort value spelling for the github api
      const sortEntry = Object.entries(sortOptions).find(
        ([_, value]) => value === sortBy
      );

      if (sortEntry) url += `&sort=${sortEntry[0]}`;

      url += `&page=${currentPage}`;

      const response = await axios.get<RepositorySearchResponse>(url);

      setState(GithubAPIState.success);
      setRepositories(response.data.items);

      // 30 items are returned by default, so we can calculate the total pages
      const newTotalPages = response.data.total_count / 30;

      // when the total pages changed we need to update reset the pagination
      if (totalPages !== newTotalPages) {
        setTotalPages(Math.floor(response.data.total_count / 30));
        setPage(0);
      }
    } catch (error) {
      setState(GithubAPIState.error);
      setRepositories([]);
      setTotalPages(0);
    }
  };

  // debounced api call every 500ms
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
