import { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GithubAPIState } from './githubApi';

interface ResultsAnimProps {
  h1Variant: 'small' | 'big';
  h2Variant: 'small' | 'big';
  resultsVariant: 'show' | 'hide';
  showResults: boolean;
}

/**
 * Framer motion variants for the results animation should show if the search query is not empty
 */
export const resultsVariantObj: Variants = {
  show: {
    opacity: [0, 0, 1],
    height: 'auto',
    transition: {
      duration: 1,
      ease: 'easeOut',
      times: [0, 0.75, 1],
    },
  },
  hide: {
    height: 0,
    opacity: [1, 0, 0],
    transition: {
      duration: 1,
      ease: 'easeOut',
      times: [0, 0.5, 1],
    },
  },
};

/**
 * Framer motion variants for the h1 animation should be small if the search query is not empty
 */
export const h1VariantsObj: Variants = {
  small: {
    fontSize: ['84px', '44px', '44px'],
    lineHeight: ['84px', '44px', '44px'],
    transition: {
      duration: 1,
      ease: 'easeOut',
      times: [0, 0.5, 1],
    },
  },
  big: {
    fontSize: '84px',
    lineHeight: '84px',
    transition: {
      delay: 0.25,
      duration: 1,
      ease: 'easeOut',
      times: [0, 0.5, 1],
    },
  },
};

/**
 * Framer motion variants for the h2 animation should be small if the search query is not empty
 */
export const h2VariantsObj: Variants = {
  small: {
    fontSize: ['28px', '14px', '14px'],
    lineHeight: ['34px', '20px', '20px'],
    transition: {
      duration: 1,
      ease: 'easeOut',
      times: [0, 0.5, 1],
    },
  },
  big: {
    fontSize: '28px',
    lineHeight: '34px',
    transition: {
      duration: 1,
      delay: 0.25,
      ease: 'easeOut',
      times: [0, 0.5, 1],
    },
  },
};

/**
 * Custom hook that manages all the animations that are shown when the search query changes
 * @param state state of the github api
 * @returns animation variants and if the results should be shown
 */
export const useResultsAnim = (state: GithubAPIState): ResultsAnimProps => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (state === GithubAPIState.success) {
      setShowResults(true);
    } else if (state === GithubAPIState.idle) {
      setShowResults(false);
    }
  }, [state]);

  return {
    resultsVariant: showResults ? 'show' : 'hide',
    h1Variant: showResults ? 'small' : 'big',
    h2Variant: showResults ? 'small' : 'big',
    showResults,
  };
};
