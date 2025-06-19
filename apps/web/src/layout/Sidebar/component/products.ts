import type { TreeViewBaseItem } from '@mui/x-tree-view/models';

type TreeItemType = {
  id: string;
  label: string;
  disabled?: boolean;
  editable?: boolean;
  level?: number;
  icon?: string;
  path?: string;
};

export const MUI_X_PRODUCTS: TreeViewBaseItem<TreeItemType>[] = [
  {
    id: '1',
    label: '系统管理',
    level: 1,
    editable: false,
    icon: 'solar:box-minimalistic-bold',
    path: '/system',
    children: [
      { id: '2', label: '用户管理', editable: true, level: 2, icon: 'solar:smartphone-2-bold', path: '/about' },
      { id: '3', label: '角色管理', editable: true, level: 2, icon: 'solar:smartphone-2-bold', path: '/system/role' },
      {
        id: '4',
        label: '权限管理',
        editable: true,
        level: 2,
        icon: 'solar:smartphone-2-bold',
        path: '/system/permission',
        children: [
          { id: '12', label: '菜单管理', editable: true, level: 3, path: '/system/user' },
          { id: '13', label: '按钮管理', editable: true, level: 3, path: '/system/permission/button' },
          { id: '14', label: '数据权限', editable: true, level: 3, path: '/system/permission/data' },
          { id: '20', label: '图标管理', editable: true, level: 3, path: '/icon' },
        ],
      },
    ],
  },
  {
    id: '5',
    label: '门店管理',
    level: 1,
    icon: 'solar:home-angle-bold-duotone',
    path: '/store',
    children: [
      {
        id: '6',
        label: '门店管理',
        disabled: true,
        level: 2,
        icon: 'solar:home-angle-bold-duotone',
      },
      { id: '7', label: '门店列表', editable: true, level: 2, icon: 'solar:home-angle-bold-duotone', path: '/store/list' },
    ],
  },
  {
    id: '8',
    label: '商品管理',
    level: 1,
    icon: 'solar:home-angle-bold-duotone',
    path: '/product',
    children: [{ id: '9', label: '商品列表', level: 2, icon: 'solar:home-angle-bold-duotone', path: '/product/list' }],
  },
  {
    id: '10',
    label: '订单管理',
    level: 1,
    icon: 'solar:home-angle-bold-duotone',
    path: '/order',
    children: [{ id: '11', label: '订单列表', level: 2, icon: 'solar:home-angle-bold-duotone', path: '/order/list' }],
  },
];
