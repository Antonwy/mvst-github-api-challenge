import {
  Avatar,
  Button,
  Card,
  Container,
  Link,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react';
import { FC } from 'react';
import { toast } from 'react-toastify';
import { Repository } from '../models/repository';
import 'react-toastify/dist/ReactToastify.css';
import Masonry from 'react-masonry-css';

interface SearchResultsListProps {
  repositories: Repository[];
}

const breakpointColumnsObj = {
  default: 4,
  1300: 3,
  1000: 2,
  700: 2,
  600: 1,
};

export const SearchResultsList: FC<SearchResultsListProps> = ({
  repositories = [],
}) => {
  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {repositories.slice(0, 10).map((repo) => (
          <SearchResultsListItem key={repo.id} repository={repo} />
        ))}
      </Masonry>
      {/* <Grid.Container gap={2} alignItems="center" justify="center">
        {repositories.slice(0, 10).map((repo) => (
          <Grid key={repo.id} xs={12} md={4} xl={3}>
            <SearchResultsListItem repository={repo} />
          </Grid>
        ))}
      </Grid.Container> */}
    </>
  );
};

interface SearchResultsListItemProps {
  repository: Repository;
}

export const SearchResultsListItem: FC<SearchResultsListItemProps> = ({
  repository,
}) => {
  const copyToClipboard = () => {
    toast.success('Copied to clipboard!');
  };

  return (
    <>
      <Card variant="bordered" css={{ p: 18, mb: 15 }}>
        <Card.Header css={{ padding: 0 }}>
          <Avatar
            src={repository.owner.avatar_url}
            squared
            alt="Github Repository owner image"
          />
          <Container>
            <Text h4>{repository.name}</Text>
            <Text small css={{ color: '$gray700' }}>
              {repository.owner.login}
            </Text>
          </Container>
        </Card.Header>

        <Card.Body css={{ p: '18px 0px' }}>
          <Container css={{ p: 0 }}>
            <Text color="$gray900" size={14}>
              {repository.description}
            </Text>

            {repository.topics && <Spacer y={0.5} />}

            <Row wrap="nowrap">
              {repository.topics.slice(0, 5).map((topic) => (
                <Card
                  variant="flat"
                  css={{
                    padding: '$2',
                    mr: 4,
                    borderRadius: 4,
                    width: 'auto',
                  }}
                  key={topic}
                >
                  <Text size={12}>{topic}</Text>
                </Card>
              ))}
            </Row>
          </Container>
        </Card.Body>

        <Card.Footer css={{ p: 0 }}>
          <Button onPress={copyToClipboard} auto>
            Clone
          </Button>
          <Spacer />
          <Link icon color="primary" target="_blank" href={repository.html_url}>
            Visit source code on GitHub.
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
};
