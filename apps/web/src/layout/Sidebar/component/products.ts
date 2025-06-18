import type { TreeViewBaseItem } from '@mui/x-tree-view/models';

type TreeItemType = {
  id: string;
  label: string;
  disabled?: boolean;
  editable?: boolean;
  level?: number;
  icon?: string;
};

export const MUI_X_PRODUCTS: TreeViewBaseItem<TreeItemType>[] = [
  {
    id: '1',
    label: '系统管理',
    level: 1,
    editable: false,
    icon: 'solar:box-minimalistic-bold',
    children: [
      { id: '2', label: '用户管理', editable: true, level: 2, icon: 'solar:smartphone-2-bold' },
      { id: '3', label: '角色管理', editable: true, level: 2, icon: 'solar:smartphone-2-bold' },
      {
        id: '4',
        label: '权限管理',
        editable: true,
        level: 2,
        icon: 'solar:smartphone-2-bold',
        children: [
          { id: '12', label: '菜单管理', editable: true, level: 3 },
          { id: '13', label: '按钮管理', editable: true, level: 3 },
          { id: '14', label: '数据权限', editable: true, level: 3 },
        ],
      },
    ],
  },
  {
    id: '5',
    label: '门店管理',
    level: 1,
    icon: 'solar:home-angle-bold-duotone',
    children: [
      {
        id: '6',
        label: '门店管理',
        disabled: true,
        level: 2,
        icon: 'solar:home-angle-bold-duotone',
      },
      { id: '7', label: '门店列表', editable: true, level: 2, icon: 'solar:home-angle-bold-duotone' },
    ],
  },
  {
    id: '8',
    label: '商品管理',
    level: 1,
    icon: 'solar:home-angle-bold-duotone',
    children: [{ id: '9', label: '商品列表', level: 2, icon: 'solar:home-angle-bold-duotone' }],
  },
  {
    id: '10',
    label: '订单管理',
    level: 1,
    icon: 'solar:home-angle-bold-duotone',
    children: [{ id: '11', label: '订单列表', level: 2, icon: 'solar:home-angle-bold-duotone' }],
  },
];
