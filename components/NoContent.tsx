import { Container, Spacer, Text } from '@nextui-org/react';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

interface NoContentProps {
  image: StaticImageData;
  message: string;
}

export const NoContent: FC<NoContentProps> = ({ image, message }) => {
  return (
    <Container
      display="flex"
      alignItems="center"
      direction="column"
      justify="center"
      css={{ p: 20, m: 0 }}
    >
      <Image width={200} height={200} src={image} alt="Empty search results" />
      <Spacer />
      <Text h3 css={{ color: '$gray900' }}>
        {message}
      </Text>
    </Container>
  );
};
