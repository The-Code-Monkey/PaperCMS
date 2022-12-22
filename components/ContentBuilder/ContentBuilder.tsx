import { Box, Button } from '@techstack/components';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DraggableStateSnapshot,
} from '@hello-pangea/dnd';

import { RecordType } from '../../app/utils';

import { StyledList, StyledItem } from './styled';
import InputRenderer from './InputRenderer';

const blockTypes = ['/textarea', '/image', '/image-text'];

interface Props {
  content: Array<RecordType>;
  onChange: (value: Array<RecordType>) => void;
}

const ContentBuilder = ({ content, onChange }: Props) => {
  const [state, setState] = useState(content);

  const handleOnChange = (e: any, index: number) => {
    setState(prevState => {
      const newState = [...prevState];
      if (blockTypes.includes(e.target.value)) {
        newState[index].type = e.target.value.replace('/', '');
        newState[index].value = '';
      } else {
        newState[index].value = e.target.value;
      }
      return newState;
    });
  };

  const handleContentRemove = (index: number) => () => {
    setState(prevState => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  const handleContentAdd = () => {
    const id = uuid();

    setState(prevState => {
      const newState = [...prevState];
      newState.push({
        id,
        order: newState.length,
      });
      return newState;
    });
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
    setState(prevState => {
      let newState = [...prevState];
      if (result.combine) {
        newState.splice(result.source.index, 1);
        return newState;
      }
      if (
        !result.destination ||
        result.destination.index === result.source.index
      )
        return prevState;

      newState = reorder(
        [...prevState],
        result.source.index,
        result.destination.index
      );

      return newState;
    });
  };

  const handleOnBlur = () => {
    onChange(state);
  };

  const renderItem = (
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
    index: number,
    field: RecordType
  ) => {
    return (
      <StyledItem
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        style={provided.draggableProps.style}
      >
        <Box d='flex' flexDirection='row' gap='5' mt='3'>
          <InputRenderer
            field={field}
            handleOnChange={handleOnChange}
            blockTypes={blockTypes}
            index={index}
            onBlur={handleOnBlur}
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
    );
  };

  const renderState = state.map((field, index) => {
    return (
      // eslint-disable-next-line react/jsx-key
      <Draggable draggableId={field.id} index={index}>
        {(provided, snapshot) => renderItem(provided, snapshot, index, field)}
      </Draggable>
    );
  });

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
              {renderState}
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
        bg='neutrals.7'
      >
        Add new item
      </Button>
    </Box>
  );
};

export default ContentBuilder;
