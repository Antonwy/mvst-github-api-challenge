import { ComponentMeta, ComponentStory } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { SearchResultsListItem } from '../../components/SearchResultsListItem';
import { mockRepo } from '../../models/repository';

export default {
  title: 'Components/SearchResultItem',
  component: SearchResultsListItem,
} as ComponentMeta<typeof SearchResultsListItem>;

const Template: ComponentStory<typeof SearchResultsListItem> = (args) => (
  <SearchResultsListItem {...args} />
);

export const Collapsed = Template.bind({});
export const Expanded = Template.bind({});

Collapsed.args = {
  repository: mockRepo,
  selectRepo: (_) => {},
  selectedRepo: null,
};

Expanded.args = {
  ...Collapsed.args,
  selectedRepo: mockRepo.node_id,
};
