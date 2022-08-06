import { Button, Card, CardProps, Grid, useTheme } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, forwardRef, useState } from 'react';
import { ChevronDown, Plus } from 'react-iconly';

interface SelectProps {
  elements: string[];
  selected: string | null;
  hint?: string;
  onSelect: (element: string | null) => void;
  maxColums?: number;
}

export const Select: FC<SelectProps> = ({
  elements,
  selected,
  onSelect,
  hint = 'Select',
  maxColums = 3,
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

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
          style={{ cursor: 'pointer', zIndex: 100, position: 'relative' }}
          transition={transition}
        >
          <motion.div transition={transition}>
            <Button
              flat
              css={{ px: '$6' }}
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
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              css={{
                zIndex: 100,
                position: 'absolute',
                top: 'calc(100% + 8px)',
                p: 12,
                overflow: 'auto',
                minWidth: 120 * maxColums,
                left: `calc(-${(120 * maxColums) / 2}px + 50%)`,
              }}
            >
              <Grid.Container gap={0.5}>
                {elements.map((el) => (
                  <Grid key={el} xs={12 / maxColums}>
                    <motion.div
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
                  </Grid>
                ))}
              </Grid.Container>
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
