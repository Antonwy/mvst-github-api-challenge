import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Select } from '../../components/Select';
import { SearchResultsListItem } from '../../components/SearchResultsListItem';
import { mockRepo } from '../../models/repository';

export default {
  title: 'Components/TestComp',
  component: SearchResultsListItem,
} as ComponentMeta<typeof SearchResultsListItem>;

const Template: ComponentStory<typeof SearchResultsListItem> = (args) => (
  <SearchResultsListItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  repository: mockRepo,
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const customSelect = await canvas.findByTestId('custom-select');

  userEvent.click(customSelect);

  const customSelectPopup = await canvas.findByTestId('custom-select-popup');

  expect(customSelectPopup).toBeDefined();

  userEvent.click(customSelect);

  expect(customSelectPopup).not.toBeVisible();
};
