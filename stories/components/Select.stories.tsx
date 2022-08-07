import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Select } from '../../components/Select';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    big: { control: 'boolean' },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});

Default.args = {
  elements: ['Github', 'Gitlab', 'Bitbucket'],
  selected: null,
  hint: 'Select',
  big: false,
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
