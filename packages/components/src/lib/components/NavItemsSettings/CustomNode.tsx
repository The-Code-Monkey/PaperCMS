import { NodeModel } from '@minoru/react-dnd-treeview';
import { Box, Icon, Interactable } from '@techstack/components';

interface Props {
  node: NodeModel;
  isSelected: boolean;
  isDragging: boolean;
  onClick: (e, node: NodeModel) => void;
  onToggle: () => void;
  isOpen: boolean;
  depth: number;
  testIdPrefix?: string;
}

const CustomNode = ({ testIdPrefix = '', ...props }: Props) => {
  const { id } = props.node;
  const { isOpen } = props;
  const indent = (props.depth - 1) * 24;

  const handleClick = e => {
    props.onClick(e, props.node);
  };

  const handleToggle = e => {
    e.stopPropagation();
    props.onToggle();
  };

  if (props.isSelected) {
    // props.containerRef.current?.classList.add(styles.selected);
  } else {
    // props.containerRef.current?.classList.remove(styles.selected);
  }

  if (props.isDragging) {
    // props.containerRef.current?.classList.add(styles.dragging);
  } else {
    // props.containerRef.current?.classList.remove(styles.dragging);
  }

  return (
    <Interactable
      alignItems='center'
      d='flex'
      h='8'
      paddingInlineStart={indent}
      data-testid={`${testIdPrefix}custom-node-${id}`}
      onClick={handleClick}
    >
      <Box
        alignItems='center'
        cursor='pointer'
        d='flex'
        h='7'
        justifyContent='center'
        w='7'
        transition='transform linear 0.1s'
        // transform={isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
      >
        {props.node.droppable && (
          <Interactable alignItems='center' d='flex' onClick={handleToggle}>
            <Icon name={isOpen ? 'ArrowDown' : 'ArrowRight'} />
          </Interactable>
        )}
      </Box>
      <div>{props.node.text}</div>
    </Interactable>
  );
};

export default CustomNode;
