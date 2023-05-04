import {Box, Icon, Interactable} from "@techstack/components";

const CustomNode = ({ testIdPrefix = "", ...props }) => {
  const { id } = props.node;
  const { isOpen } = props;
  const indent = (props.depth - 1) * 24;

  const handleClick = (e) => {
    props.onClick(e, props.node);
  };

  const handleToggle = (e) => {
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

  console.log(props);

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
        // @ts-ignore
        transition='transform linear 0.1s'
        // @ts-ignore
        transform={isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
      >
        {props.node.droppable && (
          <Interactable alignItems='center' d='flex' onClick={handleToggle}>
            <Icon name={isOpen ? 'arrowdown' : 'arrowright'} />
          </Interactable>
        )}
      </Box>
      <div>
        {props.node.text}
      </div>
    </Interactable>
  );
};

export default CustomNode;
