import * as React from 'react';
import Stack from '@mui/material/Stack';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, type TreeItemProps, type TreeItemSlotProps } from '@mui/x-tree-view/TreeItem';
import { MUI_X_PRODUCTS } from './products';
import Box from '@mui/material/Box';

// 第一级菜单样式
const firstLevelStyles = {
  root: {
    '& .MuiTreeItem-label': {
      fontSize: '12px',
    },
  },
  iconContainer: {
    opacity: 0,
    transition: 'all 0.2s ease-in-out',
    width: 0,
  },
  content: {
    color: '#919EAB',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'text.primary',
    },
  },
};

// 子级菜单样式
const subLevelStyles = {
  root: {
    '& .MuiTreeItem-label': {
      fontSize: '16px',
    },
  },
  iconContainer: {
    display: 'none',
  },
  content: {
    color: '#919EAB',
    '&:hover': {
      color: 'text.primary',
    },
  },
};

/**
 * 自定义图标容器组件
 */
const CustomIconContainer = React.forwardRef(function CustomIconContainer(props: any, ref: React.Ref<HTMLDivElement>) {
  const { id, ...other } = props;
  const isFirstLevel = !id?.includes('-');
  const [isHovered, setIsHovered] = React.useState(false);

  if (!isFirstLevel) {
    return null;
  }

  return (
    <Box
      ref={ref}
      {...other}
      sx={{
        ...firstLevelStyles.iconContainer,
        opacity: isHovered ? 1 : 0,
        width: isHovered ? '6px' : 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
});

/**
 * 自定义内容组件
 */
const CustomContent = React.forwardRef(function CustomContent(props: any, ref: React.Ref<HTMLDivElement>) {
  const { id, ...other } = props;
  const isFirstLevel = !id?.includes('-');
  const styles = isFirstLevel ? firstLevelStyles : subLevelStyles;

  return <Box className="custom-content" ref={ref} {...other} sx={styles.content} />;
});

/**
 * 自定义树形菜单组件
 */
const CustomTreeItem = React.forwardRef(function CustomTreeItem(props: TreeItemProps, ref: React.Ref<HTMLLIElement>) {
  const { id } = props;
  const isFirstLevel = !id?.includes('-');
  const styles = isFirstLevel ? firstLevelStyles : subLevelStyles;

  return (
    <TreeItem
      {...props}
      ref={ref}
      sx={styles.root}
      slots={{
        iconContainer: CustomIconContainer,
        content: CustomContent,
      }}
    />
  );
});

export default function ContentSlotProps() {
  return <RichTreeView defaultExpandedItems={['pickers']} items={MUI_X_PRODUCTS} slots={{ item: CustomTreeItem }} />;
}
