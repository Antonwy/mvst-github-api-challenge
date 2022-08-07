import {
  Button,
  Card,
  CardProps,
  Container,
  useTheme,
} from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, forwardRef, useState } from 'react';
import { ChevronDown, Plus } from 'react-iconly';
import useMediaQuery from '../hooks/mediaquery';

interface SelectProps {
  /**
   * Which elements should be selectable?
   */
  elements: string[];
  /**
   * Which element is currently selected?
   */
  selected: string | null;
  /**
   * Hint that should be displayed when no element is selected
   */
  hint?: string;
  /**
   * onSelect handler
   */
  onSelect: (element: string | null) => void;
  /**
   * Should the select popup be big => multiple columns?
   */
  big?: boolean;
}

export const Select: FC<SelectProps> = ({
  elements,
  selected,
  onSelect,
  hint = 'Select',
  big = false,
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isSmall = useMediaQuery(500);

  const transition = {
    ease: 'easeInOut',
    type: 'tween',
  };

  const handleElementClick = (el: string) => {
    setIsOpen(false);

    onSelect(el === selected ? null : el);
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <motion.div
          style={{ cursor: 'pointer', zIndex: 98, position: 'relative' }}
          transition={transition}
        >
          <motion.div transition={transition}>
            <Button
              flat
              css={{ px: '$6' }}
              data-testid="custom-select"
              icon={
                selected ? (
                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                      alignItems: 'center',
                      justifyItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <ChevronDown
                      set="bold"
                      size={16}
                      primaryColor={theme!.colors.blue600.value}
                    />
                  </motion.div>
                ) : (
                  <Plus
                    size={16}
                    set="curved"
                    primaryColor={theme!.colors.blue600.value}
                  />
                )
              }
              onClick={() => {
                return setIsOpen(!isOpen);
              }}
              auto
            >
              {selected ?? hint}
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <MotionCard
              data-testid="custom-select-popup"
              initial={{
                opacity: 0,
                scale: 0,
                originY: 'top',
                originX: 'left',
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{ opacity: 0, scale: 0 }}
              css={{
                zIndex: 100,
                position: 'absolute',
                top: 'calc(100% + 8px)',
                p: 12,
                overflow: 'auto',
                width: big ? (isSmall ? '200px' : '300px') : 'auto',
                maxHeight: 300,
              }}
            >
              <Container
                direction="row"
                display="flex"
                css={{ p: 0, m: 0, gap: '$4' }}
              >
                {elements.map((el) => (
                  <motion.div
                    key={el}
                    transition={{
                      layout: { ease: 'easeInOut', type: 'tween' },
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Button
                      auto
                      flat
                      color={el === selected ? 'secondary' : 'primary'}
                      css={{ p: 12 }}
                      onClick={() => handleElementClick(el)}
                    >
                      {el}
                    </Button>
                  </motion.div>
                ))}
              </Container>
            </MotionCard>
          )}
        </AnimatePresence>
      </div>
      {isOpen && (
        <div
          className="fullscreen"
          style={{ zIndex: 99 }}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

const CardForwardComp = forwardRef<HTMLDivElement, CardProps>(
  function motionCard(props, ref) {
    return <Card ref={ref} {...props} />;
  }
);

export const MotionCard = motion(CardForwardComp);
