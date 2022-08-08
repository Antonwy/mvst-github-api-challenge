import { Card, Container, Row, Spacer, Text } from '@nextui-org/react';
import { FC } from 'react';

interface FactProps {
  number: number | string;
  desc: string;
  icon?: React.ReactNode;
}

/**
 * number formatter that shortens large numbers to a shorter form
 * @param num
 * @param digits
 * @returns shortend number
 */
const numberFormatter = (num: number, digits = 1): string => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};

export const Fact: FC<FactProps> = ({ desc, number, icon }) => {
  const text = (
    <Text
      color="primary"
      b
      size={12}
      css={{
        whiteSpace: 'nowrap',
        maxLines: 1,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
    >
      {typeof number === 'number' ? numberFormatter(number) : number}
    </Text>
  );

  return (
    <Container
      display="flex"
      justify="center"
      alignItems="center"
      css={{ p: 12, bg: '$blue100', br: 8 }}
      direction="column"
    >
      {icon ? (
        <Row align="center" justify="center" style={{ height: 15 }}>
          {icon}
          <Spacer x={0.2} />
          {text}
        </Row>
      ) : (
        text
      )}

      <Spacer y={0.2} />
      <Text size={10}>{desc}</Text>
    </Container>
  );
};
