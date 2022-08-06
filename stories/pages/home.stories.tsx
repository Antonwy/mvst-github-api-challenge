import Home from '../../pages/[[...repo]]';

export default {
  title: 'Pages/Home',
  component: Home,
} as ComponentMeta<typeof Home>;

export const HomePage = () => <Home />;
