import {useEffect, useState} from "react";
import {
  Tree,
  MultiBackend,
  getBackendOptions,
  DndProvider,
  isAncestor
} from "@minoru/react-dnd-treeview";
import CustomNode from "./CustomNode";
import MultipleDragPreview from "./MultipleDragPreview";
import CustomDragPreview from "./CustomDragPreview";
import {NavItemType} from "../../types";

interface Props {
  navItems: {
    content: Array<NavItemType>;
    setting: string;
  }
  onChange: (setting: string, value: any) => void;
}

const NavItemsSettings = ({ navItems, onChange }: Props) => {

  const [selectedNodes, setSelectedNodes] = useState([]);
  const [tree, setTree] = useState(navItems.content);
  const [isDragging, setIsDragging] = useState(false);
  const [isCtrlPressing, setIsCtrlPressing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "escape") {
        setSelectedNodes([]);
      } else if (e.ctrlKey || e.metaKey) {
        setIsCtrlPressing(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === "control" || e.key.toLowerCase() === "meta") {
        setIsCtrlPressing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleSingleSelect = (node) => {
    setSelectedNodes([node]);
  };

  const handleMultiSelect = (clickedNode) => {
    const selectedIds = selectedNodes.map((n) => n.id);

    // ignore if the clicked node is already selected
    if (selectedIds.includes(clickedNode.id)) {
      return;
    }

    // ignore if ancestor node already selected
    if (
      selectedIds.some((selectedId) =>
        isAncestor(tree, selectedId, clickedNode.id)
      )
    ) {
      return;
    }

    let updateNodes = [...selectedNodes];

    // if descendant nodes already selected, remove them
    updateNodes = updateNodes.filter((selectedNode) => {
      return !isAncestor(tree, clickedNode.id, selectedNode.id);
    });

    updateNodes = [...updateNodes, clickedNode];
    setSelectedNodes(updateNodes);
  };

  const handleClick = (e, node) => {
    if (e.ctrlKey || e.metaKey) {
      handleMultiSelect(node);
    } else {
      handleSingleSelect(node);
    }
  };

  const handleDragStart = (node) => {
    const isSelectedNode = selectedNodes.some((n) => n.id === node.id);
    setIsDragging(true);

    if (!isCtrlPressing && isSelectedNode) {
      return;
    }

    if (!isCtrlPressing) {
      setSelectedNodes([node]);
      return;
    }

    if (!selectedNodes.some((n) => n.id === node.id)) {
      setSelectedNodes([...selectedNodes, node]);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsCtrlPressing(false);
    setSelectedNodes([]);
  };

  const handleDrop = (newTree, options) => {
    const { dropTargetId } = options;

    setTree(
      newTree.map((node) => {
        if (selectedNodes.some((selectedNode) => selectedNode.id === node.id)) {
          return {
            ...node,
            parent: dropTargetId
          };
        }

        return node;
      })
    );

    setSelectedNodes([]);
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div>
        <Tree
          rootId={0}
          tree={tree}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          canDrop={(tree, options) => {
            if (
              selectedNodes.some(
                (selectedNode) => selectedNode.id === options.dropTargetId
              )
            ) {
              return false;
            }
          }}
          render={(node, options) => {
            const selected = selectedNodes.some(
              (selectedNode) => selectedNode.id === node.id
            );

            return (
              <CustomNode
                node={node}
                {...options}
                isSelected={selected}
                isDragging={selected && isDragging}
                onClick={handleClick}
              />
            );
          }}
          dragPreviewRender={(monitorProps) => {
            if (selectedNodes.length > 1) {
              return <MultipleDragPreview dragSources={selectedNodes} />;
            }

            return <CustomDragPreview monitorProps={monitorProps} />;
          }}
        />
      </div>
    </DndProvider>
  )
}

export default NavItemsSettings;
