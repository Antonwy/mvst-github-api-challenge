import {
  Button,
  Container,
  FormElement,
  Input,
  Loading,
  Row,
  Spacer,
  useTheme,
} from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, FC, useState } from 'react';
import { CloseSquare } from 'react-iconly';
import { GithubAPIState } from '../hooks/githubApi';

interface SearchInputProps {
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
   * onChange handler
   */
  onChange?: (event: ChangeEvent<FormElement>) => void;
  /**
   * clear search handler
   */
  clearSearch?: VoidFunction;
  /**
   * search state
   */
  searchState: GithubAPIState;
  /**
   * initial query
   */
  initialQuery?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  color = 'primary',
  size = 'md',
  placeholder,
  searchState = GithubAPIState.idle,
  onChange,
  clearSearch,
  initialQuery,
}) => {
  const [query, setQuery] = useState(initialQuery ?? '');
  const { theme } = useTheme();

  const handleSearchChange = (event: ChangeEvent<FormElement>) => {
    setQuery(event.target.value);
    if (onChange) onChange(event);
  };

  const clearSearchHandler = () => {
    setQuery('');
    if (clearSearch) clearSearch();
  };

  const loading = searchState == GithubAPIState.loading;

  return (
    <>
      <Input
        value={query}
        area-label={placeholder}
        aria-labelledby={placeholder}
        css={{ width: '300px' }}
        size={size}
        color={color}
        bordered
        placeholder={placeholder}
        onChange={handleSearchChange}
        contentRightStyling={false}
        data-testid="search-input"
        contentRight={
          <Container
            alignItems="center"
            justify="center"
            display="flex"
            direction="row"
            wrap="nowrap"
            css={{ m: 0, p: 0, overflow: 'clip' }}
          >
            <motion.div
              layout
              onClick={clearSearchHandler}
              data-testid="clear-search"
              className="clickable"
              style={{
                marginRight: 8,
                height: 20,
                pointerEvents: query ? 'all' : 'none',
              }}
              whileHover={{ scale: 1.1 }}
              animate={{
                opacity: query ? 1 : 0,
                scale: query ? 1 : 0.8,
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
    </>
  );
};
function useHistory() {
  throw new Error('Function not implemented.');
}
