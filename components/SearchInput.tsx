import {
  Container,
  FormElement,
  Input,
  Loading,
  Spacer,
  useTheme,
} from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { CloseSquare } from 'react-iconly';
import { GithubRepositorySearchState } from '../controller/githubApi';

interface SearchInputProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * How large should the button be?
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Input view label
   */
  placeholder: string;
  /**
   * search state
   */
  searchState: GithubRepositorySearchState;
}

export const SearchInput: FC<SearchInputProps> = ({
  color = 'primary',
  size = 'md',
  placeholder,
  searchState = GithubRepositorySearchState.idle,
}) => {
  const router = useRouter();
  const { theme } = useTheme();

  const searchValue = router.query.q || '';

  const handleSearchChange = (event: ChangeEvent<FormElement>) => {
    if (event.target.value) router.push('/?q=' + event.target.value);
    else clearSearch();
  };

  const clearSearch = () => {
    router.push('/');
  };

  const loading = searchState == GithubRepositorySearchState.loading;

  console.log();

  return (
    <Input
      value={router.query.q ?? ''}
      css={{ width: '300px' }}
      size={size}
      color={color}
      bordered
      placeholder={placeholder}
      onChange={handleSearchChange}
      contentRightStyling={false}
      contentRight={
        <Container
          alignItems="center"
          justify="center"
          display="flex"
          direction="row"
          wrap="nowrap"
          css={{ m: 0, p: 0 }}
        >
          <motion.div
            layout
            onClick={clearSearch}
            className="clickable"
            style={{ marginRight: 8, height: 20 }}
            whileHover={{ scale: 1.1 }}
            animate={{
              opacity: searchValue ? 1 : 0,
              scale: searchValue ? 1 : 0.8,
              pointerEvents: searchValue ? 'all' : 'none',
            }}
          >
            <CloseSquare
              set="bold"
              size={20}
              primaryColor={theme!.colors.gray600.value}
            />
          </motion.div>
          <AnimatePresence>
            {loading && (
              <motion.div
                key="loading"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                initial={{ opacity: 0, width: 0, marginRight: 0, scale: 0.0 }}
                animate={{ opacity: 1, width: 15, marginRight: 8, scale: 1 }}
                exit={{ opacity: 0, width: 0, marginRight: 0, scale: 0.0 }}
              >
                <Loading size="xs" />
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      }
    />
  );
};
function useHistory() {
  throw new Error('Function not implemented.');
}
