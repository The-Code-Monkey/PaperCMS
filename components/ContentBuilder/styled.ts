import styled from 'styled-components';
import { Accordion, Box } from '@techstack/components';

export const StyledItem = styled.div<{ isDragging?: boolean }>`
  user-select: none;
  padding: ${p => p.theme.space[5]};
  margin: 0 0 ${p => p.theme.space[3]} 0;
  background: ${p =>
          p.isDragging ? p.theme.colors.neutrals[9] : p.theme.colors.neutrals[7]};
  border-radius: ${p => p.theme.radii[2]};
  cursor: move;
  cursor: grab;
`;

export const StyledList = styled.div<{ isDraggingOver?: boolean }>`
  background: ${p =>
          p.isDraggingOver ? p.theme.colors.neutrals[6] : p.theme.colors.neutrals[5]};
  padding: ${p => p.theme.space[4]} 0;
  border-radius: ${p => p.theme.radii[2]};
`;

export const EditorWrapper = styled(Box)`
  width: 100%;

  > div {
    width: 100%;
  }
`;

export const StyledAccordion = styled(Accordion)``;