import { FormElement, Input, Loading } from '@nextui-org/react';
import { ChangeEvent, FC } from 'react';
import {
  GithubRepositorySearchState,
  useGithubSearch,
} from '../controller/githubApi';

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
   * handle search input change
   */
  onChange?: (event: ChangeEvent<FormElement>) => void;
  /**
   * search state
   */
  searchState: GithubRepositorySearchState;
}

export const SearchInput: FC<SearchInputProps> = ({
  color = 'primary',
  size = 'md',
  placeholder,
  onChange,
  searchState = GithubRepositorySearchState.idle,
}) => {
  console.log(searchState);
  return (
    <Input
      css={{ width: '300px' }}
      size={size}
      color={color}
      clearable
      bordered
      placeholder={placeholder}
      onChange={onChange}
      contentRight={
        searchState == GithubRepositorySearchState.loading && (
          <Loading size="xs" />
        )
      }
    />
  );
};
