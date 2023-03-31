const CustomNode = ({ testIdPrefix = "", ...props }) => {
  const { id, droppable, data } = props.node;
  const indent = props.depth * 24;

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

  return (
    <div
      style={{ paddingInlineStart: indent }}
      data-testid={`${testIdPrefix}custom-node-${id}`}
      onClick={handleClick}
    >
      <div>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            has children:
          </div>
        )}
      </div>
      <div>
        {props.node.text}
      </div>
    </div>
  );
};

export default CustomNode;
