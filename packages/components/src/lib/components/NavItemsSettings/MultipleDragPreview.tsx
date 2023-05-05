import { NodeModel } from '@minoru/react-dnd-treeview';
import { Box } from '@techstack/components';

interface Props {
  dragSources: NodeModel[];
}

const MultipleDragPreview = (props: Props) => {
  return (
    <Box
      color='error'
      // badgeContent={props.dragSources.length}
      // anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <div data-testid='custom-drag-preview'>
        {props.dragSources.map(node => (
          <div key={node.id}>
            <div>something</div>
            <div>{node.text}</div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default MultipleDragPreview;
