import {
  Avatar,
  Button,
  Card,
  Container,
  Row,
  Spacer,
  Text,
  Link as UILink,
  useTheme,
} from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { Star, Swap } from 'react-iconly';
import { toast } from 'react-toastify';
import { Repository } from '../models/repository';
import { Fact } from './Fact';
import { Tag } from './Tag';

interface SearchResultsListItemProps {
  repository: Repository;
  selectRepo: (repo: string | null) => void;
  selectedRepo: string | null;
}

export const SearchResultsListItem: FC<SearchResultsListItemProps> = ({
  repository,
  selectRepo,
  selectedRepo,
}) => {
  const { theme } = useTheme();

  const showRepository = selectedRepo
    ? selectedRepo === repository.node_id
    : false;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(repository.clone_url);
    toast.success('Copied to clipboard!');
  };

  const onRepoClicked = () => {
    if (showRepository) {
      selectRepo(null);
    } else {
      selectRepo(repository.node_id);
    }
  };

  return (
    <motion.div
      layout
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.25 },
      }}
      style={{ cursor: 'pointer' }}
      onClick={onRepoClicked}
    >
      <Card
        variant={'flat'}
        css={{
          width: '300px',
          p: 18,
          mb: 15,
          bg: showRepository ? '$blue50' : '$gray50',
        }}
      >
        <motion.div layout="position">
          <Card.Header css={{ padding: 0 }}>
            <Avatar
              src={repository.owner.avatar_url}
              squared
              alt="Github Repository owner image"
            />
            <Container>
              <Text h4 css={{ maxLines: 1, whiteSpace: 'nowrap' }}>
                {repository.name}
              </Text>
              <Text small css={{ color: '$gray700' }}>
                {repository.owner.login}
              </Text>
            </Container>
          </Card.Header>
        </motion.div>

        <AnimatePresence>
          {showRepository && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card.Body
                css={{
                  pb: 0,
                  pl: 0,
                  pr: 0,
                  pt:
                    !repository.description && repository.topics.length == 0
                      ? 0
                      : 12,
                }}
              >
                <Container css={{ p: 0 }}>
                  <Text color="$gray900" size={14}>
                    {repository.description}
                  </Text>

                  <Spacer y={0.5} />

                  <Row justify="space-evenly" align="center" css={{ gap: 12 }}>
                    <Fact
                      number={repository.stargazers_count}
                      icon={
                        <Star
                          set="bold"
                          size={15}
                          primaryColor={theme?.colors.blue600.value}
                        />
                      }
                      desc={'Stars'}
                    />
                    <Fact
                      number={repository.forks_count}
                      icon={
                        <Swap
                          set="bold"
                          size={15}
                          primaryColor={theme?.colors.blue600.value}
                        />
                      }
                      desc={'Forks'}
                    />
                    {repository.language && (
                      <>
                        <Fact number={repository.language} desc={'Language'} />
                      </>
                    )}
                  </Row>

                  <Spacer y={0.5} />

                  <Row wrap="wrap">
                    {repository.topics.slice(0, 8).map((topic) => (
                      <Tag key={topic}>{topic}</Tag>
                    ))}
                  </Row>

                  {repository.topics.length > 0 && <Spacer y={0.5} />}
                </Container>
              </Card.Body>

              <Card.Divider />

              <Card.Footer css={{ p: 0, mt: 12 }}>
                <Button onPress={copyToClipboard} auto>
                  Clone
                </Button>
                <Spacer />
                <UILink
                  icon
                  color="primary"
                  target="_blank"
                  href={repository.html_url}
                  css={{ fontSize: 12 }}
                >
                  Visit source code on GitHub.
                </UILink>
              </Card.Footer>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
