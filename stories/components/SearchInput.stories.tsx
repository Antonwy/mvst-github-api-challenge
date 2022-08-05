import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchInput } from '../../components/SearchInput';
import { Search } from 'react-iconly';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

export const Style = Template.bind({});
Style.args = {
  placeholder: 'Search repositories',
  size: 'md',
  color: 'primary',
};
