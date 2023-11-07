import { InnerSectionType, RecordType } from '@nucleus-cms/utils';
import { Box, Button, Icon, Interactable } from '@techstack/components';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  DragEvent,
} from 'react';
import { createPortal } from 'react-dom';

import ElementRenderer from '../ElementRenderer';

import { StyledSection } from './styled';

interface Props extends InnerSectionType {
  onChange: (value: RecordType[]) => void;
  onHoverChange: (hoveredElement: string, isTop: boolean) => void;
  hoveredElement: [string, boolean];
  onReorder: (thisId: string, thatId: string, top: boolean) => void;
}

const InnerSection = ({
  onChange,
  value,
  id,
  onHoverChange,
  hoveredElement: [hoveredId, isTop],
  onReorder,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [sectionModalIsOpen, setSectionModalIsOpen] = useState(false);

  const toggleSectionModal = () => {
    setSectionModalIsOpen(prevState => !prevState);
  };

  const findCorrectTarget = useCallback(
    (parentTarget: HTMLElement): HTMLElement => {
      return parentTarget.className.includes(id)
        ? parentTarget
        : findCorrectTarget(parentTarget.parentElement);
    },
    [id]
  );

  const handleOnDragOver = useCallback(
    (e: DragEvent<HTMLElement>) => {
      if (!isDragging) {
        e.preventDefault();
        let target = e.target as HTMLElement;
        if (!target.className.includes(id)) {
          target = findCorrectTarget(target.parentElement);
        }

        const box = target.getBoundingClientRect();
        const offsetTop = e.clientY - box.top - box.height / 2;

        const targetId = target.className
          .split(' ')
          .find((str: string) => str.startsWith('#'))
          .split('_')[1];

        onHoverChange(targetId, offsetTop < 0);
      }
    },
    [findCorrectTarget, id, isDragging, onHoverChange]
  );

  const handleOnDragEnd = () => {
    setIsDragging(false);
    onReorder(id, hoveredId, isTop);
  };

  const className = `innerSection_${id}`;

  const isHovered = hoveredId === id;

  const handleInnerRendererSetContent: Dispatch<
    SetStateAction<RecordType[]>
  > = (fn: (value: RecordType[]) => RecordType[]) => {
    console.log('handleInnerRendererSetContent', fn(value));
    onChange(fn(value));
  };

  const handleInitialInnerRendererSetContent = (type: string) => () => {
    console.log(onChange);
    if (type.includes('columns')) {
      const columns = parseInt(type.split('-')[0], 10);

      onChange([{ type: 'column', columns }] as RecordType[]);
    }
  };

  return (value ?? []).length > 0 ? (
    <ElementRenderer
      content={value as RecordType[]}
      setContent={handleInnerRendererSetContent}
    />
  ) : (
    <StyledSection
      draggable
      onDragOver={handleOnDragOver}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleOnDragEnd}
      className={`#${className}`}
      isTop={isTop}
      isHovered={isHovered}
    >
      <Interactable
        w={'full'}
        h={'15'}
        d='flex'
        alignItems={'center'}
        justifyContent={'center'}
        onClick={toggleSectionModal}
      >
        <Icon name={'plussquare'} />
      </Interactable>
      <>
        {sectionModalIsOpen &&
          createPortal(
            <>
              <Box
                position={'fixed'}
                w={'80vw'}
                h={'80vh'}
                top={'50%'}
                left={'50%'}
                // @ts-ignore
                style={{ transform: 'translate(-50%, -50%)' }}
                bg={'neutrals.0'}
                zIndex={1000}
                border={'1px solid black'}
              >
                <Box w={'full'} h={'full'}>
                  <Button
                    type={'button'}
                    onClick={handleInitialInnerRendererSetContent(
                      '2-columns'
                    )}
                  >
                    Add Two Columns
                  </Button>
                  <Button
                      type={'button'}
                      onClick={handleInitialInnerRendererSetContent(
                          '3-columns'
                      )}
                  >
                    Add Three Columns
                  </Button>
                </Box>
              </Box>
              <Interactable
                position={'fixed'}
                w={'100vw'}
                h={'100vh'}
                bg={'black'}
                opacity={'0.8'}
                zIndex={999}
                onClick={toggleSectionModal}
              >
                &nbsp;
              </Interactable>
            </>,
            document.body
          )}
      </>
    </StyledSection>
  );
};

export default InnerSection;
