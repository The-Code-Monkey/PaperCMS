import { Box, Button, Input } from '@techstack/components';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

import { RecordType } from '../../app/utils';

import { StyledList, StyledItem } from './styled';

interface Props {
  content: Array<RecordType>;
  onChange: (value: Array<RecordType>) => void;
}

const ContentBuilder = ({ content, onChange }: Props) => {
  const [state, setState] = useState<Array<RecordType>>(content);

  const handleOnChange = (index: number) => (e: any) => {
    const newState = state;
    newState[index].value = e.target.value;
    onChange(newState);
  };

  const handleContentRemove = (index: number) => () => {
    const newState = state;
    newState.splice(index, 1);
    onChange(newState);
  };

  const handleContentAdd = () => {
    const id = uuid();
    const newState = state;
    newState.push({
      id,
      type: 'text',
      value: id,
      order: newState.length,
    });
    onChange(newState);
  };

  const reorder = (
    list: Array<RecordType>,
    startIndex: number,
    endIndex: number
  ): Array<RecordType> => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (result.combine) {
      const newState = [...state];
      newState.splice(result.source.index, 1);
      onChange(newState);
      return;
    }

    if (!result.destination || result.destination.index === result.source.index)
      return;

    console.log('here', result.source.index, result.destination.index);

    const newState = reorder(
      state,
      result.source.index,
      result.destination.index
    );

    onChange(newState);
  };

  useEffect(() => {
    setState(content);
  }, [content]);

  return (
    <Box>
      Content builder:
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <StyledList
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {state.map((field, index) => {
                return (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <StyledItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        <Box
                          d='flex'
                          flexDirection='row'
                          gap='5'
                          mt='3'
                          key={`${field.type}_${field.id}`}
                        >
                          <Input
                            name={`${field.id}`}
                            defaultValue={field.value}
                            onChange={handleOnChange(index)}
                            type={field.type as any}
                          />
                          <Button
                            iconName={'trash'}
                            variant='error'
                            onClick={handleContentRemove(index)}
                            // @ts-ignore
                            type='button'
                          />
                        </Box>
                      </StyledItem>
                    )}
                  </Draggable>
                );
              })}
            </StyledList>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        mt='3'
        iconName={'plus'}
        variant={'primary'}
        onClick={handleContentAdd}
        // @ts-ignore
        type='button'
      >
        Add new item
      </Button>
    </Box>
  );
};

export default ContentBuilder;
