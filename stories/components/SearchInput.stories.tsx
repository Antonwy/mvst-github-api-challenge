import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { SearchInput } from '../../components/SearchInput';
import { expect } from '@storybook/jest';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

export const Default = Template.bind({});

Default.args = {
  placeholder: 'Search repositories',
  size: 'md',
  color: 'primary',
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const searchInput = canvas.getByTestId('search-input');
  const clearSearchButton = canvas.getByTestId('clear-search');

  await userEvent.type(searchInput, 'react router', { delay: 100 });
  expect(searchInput).toHaveValue('react router');

  console.log(searchInput);
  console.log(clearSearchButton);
  userEvent.click(clearSearchButton);

  await userEvent.type(searchInput, 'new query', { delay: 100 });

  expect(searchInput).toHaveValue('new query');
};
