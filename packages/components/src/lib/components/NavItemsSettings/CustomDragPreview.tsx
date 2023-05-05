import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview';

interface Props {
  monitorProps: DragLayerMonitorProps<unknown>;
}

const CustomDragPreview = (props: Props) => {
  const item = props.monitorProps.item;

  return (
    <div>
      <div>something</div>
      <div>{item.text}</div>
    </div>
  );
};

export default CustomDragPreview;
