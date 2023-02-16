import { DragEvent, useCallback, useState } from 'react';
import { Icon, Interactable } from '@techstack/components';

import { InnerSectionType } from '../../../app/utils';

import { StyledSection } from './styled';

interface Props extends InnerSectionType {
  onChange: (value: any) => void;
  onHoverChange: (hoveredElement: string, isTop: boolean) => void;
  hoveredElement: [string, boolean];
  onReorder: (thisId: string, thatId: string, top: boolean) => void;
}

const InnerSection = ({
  onChange,
  value,
  type,
  id,
  onHoverChange,
  hoveredElement: [hoveredId, isTop],
  onReorder,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const findCorrectTarget = useCallback(
    (parentTarget: any): any => {
      return parentTarget.className.includes(id)
        ? parentTarget
        : findCorrectTarget(parentTarget.parentElement);
    },
    [id]
  );

  const handleOnDragOver = useCallback(
    (e: any) => {
      if (!isDragging) {
        e.preventDefault();
        let target = e.target;
        if (!target.className.includes(id)) {
          target = findCorrectTarget(target.parentElement);
        }

        const box = target.getBoundingClientRect();
        const offsetTop = e.clientY - box.top - box.height / 2;
        console.log(target.className);

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

  console.log(id);

  const className = `innerSection_${id}`;

  const isHovered = hoveredId === id;

  return (
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
