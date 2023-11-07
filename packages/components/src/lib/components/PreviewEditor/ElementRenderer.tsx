import { InnerSectionType, RecordType, ColumnType } from '@nucleus-cms/utils';
import { Box, Carousel, CarouselProps } from '@techstack/components';
import {
  Dispatch,
  DragEvent,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { SiteThemeContext } from './context';
import InnerSection from './elements/InnerSection';
import Editor from './fields/Editor';

interface Props {
  content: Array<RecordType>;
  setContent: Dispatch<SetStateAction<RecordType[]>>;
  columns?: number;
}

const ElementRenderer = ({ content, setContent, columns }: Props) => {
  const SiteConfig = useContext(SiteThemeContext);

  const [hoveredElement, setHoveredElement] = useState<[string, boolean]>([
    '',
    false,
  ]);

  const handleOnHoverChange = (hoveredElement: string, isTop: boolean) => {
    setHoveredElement([hoveredElement, isTop]);
  };
  const handleOnReorder = (thisId: string, thatId: string, top: boolean) => {
    const thisContentIndex = content.findIndex(item => item.id === thisId);
    const thisContent = content[thisContentIndex];
    const thatContentIndex = content.findIndex(item => item.id === thatId);
    if (top && thatContentIndex !== -1 && thisContentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState.splice(thisContentIndex, 1);
        newState.splice(
          thatContentIndex < thisContentIndex
            ? thatContentIndex
            : thatContentIndex - 1,
          0,
          thisContent
        );
        return newState;
      });
    } else if (!top && thatContentIndex !== -1 && thisContentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState.splice(thisContentIndex, 1);
        newState.splice(
          thatContentIndex < thisContentIndex
            ? thatContentIndex + 1
            : thatContentIndex,
          0,
          thisContent
        );
        return newState;
      });
    }

    handleOnHoverChange('', false);
  };
  const handleOnChangeEditor = (index: string, value: string) => {
    const contentIndex = content.findIndex(item => item.id === index);
    if (contentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState[contentIndex].value = value;
        return newState;
      });
    }
  };

  const handleOnChange = (index: string) => (value: RecordType['value']) => {
    const contentIndex = content.findIndex(item => item.id === index);
    if (contentIndex !== -1) {
      setContent(prevState => {
        const newState = [...prevState];
        newState[contentIndex].value = value;
        return newState;
      });
    }
  };

  const handleOnDrop =
    (ids: Array<number>) => (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      setContent(prevState => {
        const newState = [...prevState];

        const droppedItem = JSON.parse(event.dataTransfer.getData('text'));

        if (!newState[ids[0]].value) {
          newState[ids[0]].value = [];
        }

        if (!newState[ids[0]].value[ids[1]]) {
          newState[ids[0]].value[ids[1]] = [];
        }

        newState[ids[0]].value[ids[1]] = [droppedItem];

        return newState;
      });
    };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      d={'flex'}
      flexDir={columns ? 'row' : 'column'}
      w={`calc(100% / ${columns ?? 1})`}
      gap={5}
    >
      {content.map((item, itemIndex) => {
        switch (item.type) {
          case 'textarea': {
            return (
              <Editor
                item={item}
                styles={{ ...(SiteConfig?.styles.content ?? {}) }}
                onChange={handleOnChangeEditor}
                onHoverChange={handleOnHoverChange}
                hoveredElement={hoveredElement}
                onReorder={handleOnReorder}
              />
            );
          }
          case 'carousel': {
            return <Carousel {...(item.value as unknown as CarouselProps)} />;
          }
          case 'inner-section': {
            return (
              <InnerSection
                key={item.id}
                {...(item as InnerSectionType)}
                onChange={handleOnChange(item.id)}
                onHoverChange={handleOnHoverChange}
                hoveredElement={hoveredElement}
                onReorder={handleOnReorder}
              />
            );
          }
          case 'column': {
            return (
              <Box d={'flex'} flexDir={'row'} gap={4}>
                {Array((item as ColumnType).columns)
                  .fill(null)
                  .map((_, index) => {
                    const column =
                      (item as ColumnType)?.value?.[index] ??
                      ([
                        { type: 'unknown', indexes: [itemIndex, index] },
                      ] as Array<RecordType>);

                    if (column) {
                      return (
                        <ElementRenderer
                          key={index}
                          content={column}
                          setContent={setContent}
                          columns={(item as ColumnType).columns}
                        />
                      );
                    }
                  })}
              </Box>
            );
          }
          default: {
            const className = `default_${item.id}`;

            return (
              <div
                style={{
                  width: '100%',
                  height: '50px',
                  border: '1px solid',
                  borderColor: 'black',
                  textAlign: 'center',
                  padding: '10px',
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className={className}
                onDragOver={allowDrop}
                onDrop={handleOnDrop(item.indexes)}
              >
                {item.type}: Drop element from left to here to add
              </div>
            );
          }
        }
      })}
    </Box>
  );
};

export default ElementRenderer;
