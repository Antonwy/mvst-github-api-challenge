import { Card, Text } from '@nextui-org/react';
import { FC } from 'react';

interface TagProps {
  children: React.ReactNode;
}

export const Tag: FC<TagProps> = ({ children }) => {
  return (
    <Card
      variant="flat"
      css={{
        py: 4,
        px: 6,
        mt: 3,
        mr: 3,
        borderRadius: 4,
        width: 'auto',
        bg: '$blue200',
      }}
    >
      <Text
        size={12}
        css={{
          color: '$primary',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          maxLines: 1,
          m: 0,
        }}
      >
        {children}
      </Text>
    </Card>
  );
};
