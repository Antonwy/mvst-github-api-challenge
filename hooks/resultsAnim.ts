import { Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GithubAPIState } from './githubApi';

interface ResultsAnimProps {
  rocketVariant: 'launch' | 'land';
  resultsVariant: 'show' | 'hide';
  showResults: boolean;
}

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

export const rocketVariantObj: Variants = {
  launch: {
    y: -400,
    x: -400,
    transition: {
      duration: 2,
      ease: 'circOut',
    },
  },
  land: {
    y: 0,
    x: 0,
    transition: {
      duration: 2,
      ease: 'circOut',
    },
  },
  initial: {
    height: 400,
    width: 400,
    position: 'fixed',
    top: 0,
    left: 150,
  },
};

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
    rocketVariant: showResults ? 'launch' : 'land',
    showResults,
  };
};
