import { RouteObject } from '@modern-js/runtime/router';
import React, { lazy } from 'react';

/**
 * 路由配置接口
 */
export interface RouteConfig {
  path: string; // 路由路径
  component?: string; // 组件路径，相对于 src/pages
  children?: RouteConfig[]; // 子路由
  lazy?: boolean; // 是否懒加载
  meta?: {
    // 元数据
    title?: string; // 页面标题
    icon?: string; // 图标
    auth?: boolean; // 是否需要认证
    [key: string]: any; // 其他元数据
  };
}

/**
 * 将路由配置转换为 React Router 路由对象
 * @param routes 路由配置数组
 * @returns React Router 路由对象数组
 */
export const generateRoutes = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map(route => {
    const routeObject: RouteObject = {
      path: route.path,
    };

    // 处理组件
    if (route.component) {
      const Component = route.lazy
        ? lazy(() => import(/* @vite-ignore */ '@/' + route.component!))
        : require(/* @vite-ignore */ '@/' + route.component!).default;
      routeObject.element = React.createElement(Component);
    }

    // 处理子路由
    if (route.children) {
      routeObject.children = generateRoutes(route.children);
    }

    return routeObject;
  });
};

/**
 * 创建路由实例
 * @param routes 路由配置数组
 * @returns React Router 路由实例
 */
export const createRouter = (routes: RouteConfig[]) => {
  const routeObjects = generateRoutes(routes);
  console.log(routeObjects);
  return routeObjects;
};

// export default createRouter;
