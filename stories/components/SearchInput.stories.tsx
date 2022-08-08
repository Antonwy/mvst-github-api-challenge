import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { SearchInput } from '../../components/SearchInput';
import { expect } from '@storybook/jest';
import { sleep } from '../helpers/sleep';

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

  const searchInput = await canvas.findByTestId('search-input');
  const clearSearchButton = await canvas.findByTestId('clear-search');

  await userEvent.type(searchInput, 'react router', { delay: 100 });
  expect(searchInput).toHaveValue('react router');

  console.log(clearSearchButton);
  userEvent.click(clearSearchButton);

  // wait 1 second for the input to be cleared
  await sleep(1000);

  await userEvent.type(searchInput, 'new query', { delay: 100 });

  expect(searchInput).toHaveValue('new query');
};
