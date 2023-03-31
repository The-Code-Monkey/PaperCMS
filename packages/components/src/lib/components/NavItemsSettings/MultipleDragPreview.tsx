import {Box} from "@techstack/components";

const MultipleDragPreview = (props) => {
  return (
    <Box
      color="error"
      // badgeContent={props.dragSources.length}
      // anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <div data-testid="custom-drag-preview">
        {props.dragSources.map((node) => (
          <div >
            <div>
              something
            </div>
            <div>{node.text}</div>
          </div>
        ))}
      </div>
    </Box>
  );
};


export default MultipleDragPreview
