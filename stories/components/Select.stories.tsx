import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Select } from '../../components/Select';
import { sleep } from '../helpers/sleep';

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

  await sleep(1000);

  const customSelectPopup = await canvas.findByTestId('custom-select-popup');

  expect(customSelectPopup).toBeVisible();

  userEvent.click(customSelect);

  await sleep(1000);

  expect(customSelectPopup).not.toBeVisible();
};
