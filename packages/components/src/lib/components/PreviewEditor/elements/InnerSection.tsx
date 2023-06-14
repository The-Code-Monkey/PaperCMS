import { InnerSectionType, RecordType } from '@nucleus-cms/utils';
import { Icon, Interactable } from '@techstack/components';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  DragEvent,
} from 'react';

import ElementRenderer from '../ElementRenderer';

import { StyledSection } from './styled';

interface Props extends InnerSectionType {
  onChange: (value) => void;
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
  > = fn => {
    if (typeof fn === 'function') {
      onChange(fn(value ?? []));
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
      >
        {id}
        <Icon name={'plussquare'} />
      </Interactable>
    </StyledSection>
  );
};

export default InnerSection;
