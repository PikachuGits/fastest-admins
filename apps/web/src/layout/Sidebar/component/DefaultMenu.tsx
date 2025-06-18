import * as React from 'react';
import { Children, useState, useEffect } from 'react';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { type TreeItemProps, TreeItemRoot, TreeItemContent, TreeItemGroupTransition } from '@mui/x-tree-view/TreeItem';
import { TreeItemIcon } from '@mui/x-tree-view/TreeItemIcon';
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider';
import { useTreeItem } from '@mui/x-tree-view/useTreeItem';
import { Box, Typography, Button, ListItemButton, ListItemText } from '@mui/material';
import { MUI_X_PRODUCTS } from './products';
// 导入所需的图标
import { Iconify } from '@fastest/components';
import { useNavigate, useLocation } from '@modern-js/runtime/router';
// ========================== 类型定义 ==========================

/**
 * 菜单项的基础类型定义
 */
interface MenuItem {
  id: string;
  label: string;
  type: 'level1' | 'level2' | 'level3';
  icon?: React.ReactNode;
  parentId?: string;
  secondaryLabel?: string;
  children?: MenuItem[];
}

// ========================== 工具函数 ==========================

/**
 * 在树形结构中查找指定 ID 的节点
 * @param nodes 树形数据数组
 * @param targetId 目标节点 ID
 * @returns 找到的节点或 undefined
 */
function findNodeInTree(nodes: any, targetId: any): any {
  for (const node of nodes) {
    // 如果找到目标节点，直接返回
    if (node.id === targetId) {
      return node;
    }

    // 如果当前节点有子节点，递归查找
    if (node.children && node.children.length > 0) {
      const foundInChild: any = findNodeInTree(node.children, targetId);
      if (foundInChild) {
        return foundInChild;
      }
    }
  }

  return undefined;
}

/**
 * 获取从根节点到目标节点的完整路径
 * @param nodes 树形数据数组
 * @param targetId 目标节点 ID
 * @param path 当前路径（用于递归）
 * @returns 包含所有父级节点 ID 的数组
 */
function getNodePath(nodes: any, targetId: any, path: string[] = []): string[] {
  for (const node of nodes) {
    const currentPath = [...path, node.id];

    // 如果找到目标节点，返回完整路径
    if (node.id === targetId) {
      return currentPath;
    }

    // 如果当前节点有子节点，递归查找
    if (node.children && node.children.length > 0) {
      const foundPath = getNodePath(node.children, targetId, currentPath);
      if (foundPath.length > 0) {
        return foundPath;
      }
    }
  }

  return [];
}

/**
 * 判断节点是否为叶子节点（没有子节点）
 * @param nodes 树形数据数组
 * @param nodeId 节点 ID
 * @returns 是否为叶子节点
 */
function isLeafNode(nodes: any, nodeId: string): boolean {
  const node = findNodeInTree(nodes, nodeId);
  return node && (!node.children || node.children.length === 0);
}

/**
 * 根据路径查找对应的节点
 * @param nodes 树形数据数组
 * @param targetPath 目标路径
 * @returns 找到的节点或 undefined
 */
function findNodeByPath(nodes: any, targetPath: string): any {
  for (const node of nodes) {
    // 如果找到匹配的路径，直接返回
    if (node.path === targetPath) {
      return node;
    }

    // 如果当前节点有子节点，递归查找
    if (node.children && node.children.length > 0) {
      const foundInChild: any = findNodeByPath(node.children, targetPath);
      if (foundInChild) {
        return foundInChild;
      }
    }
  }

  return undefined;
}

// ========================== 自定义组件 ==========================

/**
 * 自定义树形菜单项组件
 * 使用 MUI Tree View 的底层组件构建完全自定义的树形项
 */
const CustomTreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(function CustomTreeItem({ itemId, label, children, disabled, ...other }, ref) {
  // 使用 useTreeItem 钩子获取树形项的上下文和状态
  const {
    getContextProviderProps, // TreeItemProvider 的 props
    getRootProps, // 根元素（li）的 props
    getContentProps, // 内容区域的 props
    getGroupTransitionProps, // 子项展开过渡的 props
    status, // 当前项的状态（expanded, selected, disabled 等）
  } = useTreeItem({
    itemId,
    label,
    children,
    disabled,
    rootRef: ref,
  });

  // 从数据源中查找当前项的完整信息
  const nodeData = findNodeInTree(MUI_X_PRODUCTS, itemId);
  const { level = 1, icon, path } = nodeData || {};

  // 计算子项数量，用于绘制连接线
  const childrenCount = Children.count(children);

  // ========================== 样式配置 ==========================

  /**
   * 根元素样式 - 控制缩进和定位
   */
  const rootStyles = {
    marginLeft: level !== 1 ? '16px' : '0',
    paddingLeft: level !== 1 ? '10px' : '0',
  };

  /**
   * 内容区域样式 - 控制内容布局
   */
  const contentStyles = {
    margin: '0 0 2px 0',
    padding: 0,
  };

  /**
   * 按钮样式 - 统一的交互样式
   */
  const baseButtonStyles = {
    backgroundColor: 'transparent !important',
    width: '100%',
    textAlign: 'left' as const,
    justifyContent: 'flex-start',
    textTransform: 'none' as const,
    position: 'relative' as const,
    '&:hover': {
      backgroundColor: 'transparent !important', // 或你想要的颜色
    },
  };

  const buttonStyles = {
    ...baseButtonStyles,
    '&:before': {
      content: '""',
      position: 'absolute',
      left: '-12px',
      width: '12px',
      height: '12px',
      backgroundColor: '#efefef',
      mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat`,
      WebkitMask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat`,
    },
  };

  /**
   * 子级菜单的连接线样式
   */
  const connectionLineStyles = {
    color: status.disabled ? 'grey' : 'inherit',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
  };

  /**
   * 垂直连接线样式 - 连接父子项
   */
  const verticalLineStyles = {
    position: 'relative' as const,
    '&:before': {
      top: '0px',
      left: '14px',
      width: '1.5px',
      content: '""',
      position: 'absolute',
      backgroundColor: '#efefef',
      bottom: 'calc(36px - 2px - 12px / 2)',
      height: `calc(${childrenCount * 36}px - 24px)`,
    },
  };

  // ========================== 渲染标签内容 ==========================

  /**
   * 渲染不同层级的标签内容
   */
  const renderLabelContent = () => {
    if (level === 1) {
      // 一级菜单：简单文本显示
      return (
        <div
          style={{
            color: status.disabled ? 'grey' : 'inherit',
            width: '100%',
          }}
        >
          {label}
        </div>
      );
    }

    // 子级菜单：带连接线的显示
    return (
      <Box sx={connectionLineStyles}>
        <Typography variant="body2">{label}</Typography>
      </Box>
    );
  };

  // ========================== 主要渲染 ==========================

  return (
    <TreeItemProvider {...getContextProviderProps()}>
      {/* 根容器 */}
      <TreeItemRoot {...getRootProps()} ref={ref} sx={rootStyles}>
        {/* 内容区域 */}
        <TreeItemContent {...getContentProps()} sx={contentStyles}>
          {/* <ListItemButton component="a" href={path} sx={level === 1 ? baseButtonStyles : buttonStyles}>
            <ListItemText primary={renderLabelContent()} />
          </ListItemButton> */}
          <Button variant="text" color="inherit" sx={level === 1 ? baseButtonStyles : buttonStyles}>
            {/* 图标显示 */}
            {icon && <Iconify icon={icon} className="text-base w-24 h-24 text-gray-500 cursor-pointer flex-shrink-0 mr-2" />}
            {/* 标签内容 */}
            {renderLabelContent()}
            {/* 展开/收起图标 */}
            <TreeItemIcon status={status} />
          </Button>
        </TreeItemContent>

        {/* 子项容器（如果有子项） */}
        {children && <TreeItemGroupTransition {...getGroupTransitionProps()} sx={verticalLineStyles} />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
});

// ========================== 主组件 ==========================

/**
 * 自定义树形视图组件
 * 提供完整的树形导航功能，支持多级菜单和自定义样式
 */
export default function CustomRichTreeView() {
  const navigate = useNavigate();
  const location = useLocation();
  // ========================== 状态管理 ==========================

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // ========================== 路由回显逻辑 ==========================

  /**
   * 根据当前路由初始化菜单状态
   */
  useEffect(() => {
    const currentPath = location.pathname;

    // 根据当前路径查找对应的菜单节点
    const matchedNode = findNodeByPath(MUI_X_PRODUCTS, currentPath);

    if (matchedNode) {
      // 获取完整路径（包含所有父级节点）
      const fullPath = getNodePath(MUI_X_PRODUCTS, matchedNode.id);

      // 设置选中状态
      setSelectedItems(fullPath);

      // 设置展开状态（展开所有父级节点）
      if (fullPath.length > 1) {
        // 移除最后一个元素（当前节点），只展开父级节点
        const parentPath = fullPath.slice(0, -1);
        setExpandedItems(parentPath);
      }

      console.log('Route matched:', {
        currentPath,
        matchedNode: matchedNode.id,
        fullPath,
        expandedPath: fullPath.slice(0, -1),
      });
    } else {
      console.log('No menu item matches current route:', currentPath);
    }
  }, [location.pathname]);

  // ========================== 事件处理 ==========================

  /**
   * 处理菜单项选择事件
   * 当选中叶子节点时，同时选中所有父级节点并导航
   */
  const handleSelectedItemsChange = (_event: React.SyntheticEvent | null, itemIds: string[]) => {
    if (!itemIds || itemIds.length === 0) {
      return;
    }

    // 获取最后选中的项（最新选中的项）
    const lastSelectedId = itemIds[itemIds.length - 1];
    const nodeData = findNodeInTree(MUI_X_PRODUCTS, lastSelectedId);

    if (!nodeData) {
      return;
    }

    // 如果是叶子节点且有路径，则导航到对应页面
    if (isLeafNode(MUI_X_PRODUCTS, lastSelectedId) && nodeData.path) {
      console.log('Navigating to:', nodeData.path);
      navigate(nodeData.path);
      // 注意：导航后会触发 useEffect，自动更新菜单状态
    } else {
      // 如果是父级节点，只展开/收起，不导航
      const isCurrentlyExpanded = expandedItems.includes(lastSelectedId);
      if (isCurrentlyExpanded) {
        // 收起当前节点
        setExpandedItems(prev => prev.filter(id => id !== lastSelectedId));
      } else {
        // 展开当前节点
        setExpandedItems(prev => [...prev, lastSelectedId]);
      }
    }
  };

  /**
   * 处理菜单项展开/收起事件
   */
  const handleExpandedItemsChange = (_event: React.SyntheticEvent | null, itemIds: string[]) => {
    setExpandedItems(itemIds);
  };

  // ========================== 自定义图标组件 ==========================

  /**
   * 收起状态的图标
   */
  const CollapseIcon = () => (
    <Box sx={{ margin: '0 5px' }}>
      <Iconify icon="eva:arrow-ios-downward-fill" className="text-base text-gray-500 cursor-pointer" />
    </Box>
  );

  /**
   * 展开状态的图标
   */
  const ExpandIcon = () => (
    <Box sx={{ margin: '0 5px' }}>
      <Iconify icon="eva:arrow-ios-forward-fill" className="text-base text-gray-500 cursor-pointer" />
    </Box>
  );

  // ========================== 主要渲染 ==========================

  return (
    <Box
      sx={{
        borderRadius: '8px',
        backgroundColor: '#fff',
      }}
    >
      <RichTreeView
        sx={{
          '& [data-focused]': {
            color: '#00A76F !important', // 或你想要的颜色
            backgroundColor: 'rgba(0, 167, 111, 0.08) !important', // 或你想要的颜色
          },
          '& [data-selected]': {
            color: '#00A76F !important', // 或你想要的颜色
            backgroundColor: 'rgba(0, 167, 111, 0.08) !important', // 或你想要的颜色
            '&:hover': {
              color: '#00A76F !important', // 或你想要的颜色
              backgroundColor: 'rgba(0, 167, 111, 0.08) !important', // 或你想要的颜色
            },
          },
        }}
        aria-label="file system navigator"
        items={MUI_X_PRODUCTS}
        selectedItems={selectedItems}
        onSelectedItemsChange={handleSelectedItemsChange}
        expandedItems={expandedItems}
        onExpandedItemsChange={handleExpandedItemsChange}
        multiSelect={true}
        slots={{
          item: CustomTreeItem,
          collapseIcon: CollapseIcon,
          expandIcon: ExpandIcon,
        }}
      />
    </Box>
  );
}
