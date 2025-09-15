项目开源地址：[https://github.com/GHchenjingqi/reactDemo/tree/shopping](https://github.com/GHchenjingqi/reactDemo/tree/shopping)

## 项目搭建
### 1.安装Node或nvm切换到v20+;
### 2.使用vite安装react
```bash
npm create vite@latest myapp
```

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1754275600803-1d707b27-cbbd-48a7-858d-d7fcd1477e21.png)

选择 React，同时可以选择TS（SWC是Rust开发的编译器，运行快！）

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1754275617596-105c01f5-0bc1-478f-9625-ff8d95f31f22.png)

安装完毕后，进入项目目录并按照环境依赖，并运行项目。

```bash
cd myapp
# 安装
npm install
# 运行
npm run dev
```

### 3.安装 AntDesign UI
如何遇到版本不支持时，请参考异常问题1,安装官方兼容插件v5-patch-for-react-19。

```bash
npm install antd --save
# 兼容库
npm install @ant-design/v5-patch-for-react-19 --save
# 图标库
npm install @ant-design/icons@5.x --save
```

使用：按需加载

```jsx
import React from 'react';
import { DatePicker } from 'antd';

const App = () => {
  return <DatePicker />;
};

export default App;
```

## 后台框架搭建
![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1754288497813-47e144d7-e1aa-433c-be28-252699742401.png)

### 1.创建pages、routes、components目录，用于存放页面、路由和组件。
### 2.新建Layout.tsx文件，并添加以下代码
```tsx
import React , { useState } from 'react';
import { Layout as AntLayout, Menu ,Button, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined,  LoadingOutlined,
         MenuUnfoldOutlined, MenuFoldOutlined
       } from '@ant-design/icons';
import logo from '../assets/images/react.svg';
const { Header, Sider, Content } = AntLayout;
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {  token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const menuItems = [
    { key: '/',icon: <HomeOutlined/>, label: <Link to="/">Home</Link> },
    { key: '/about', icon: <LoadingOutlined/>, label: <Link to="/about">About</Link> },
  ];

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo">
          <img src={logo} alt="" />
          { collapsed ? null : <h1>React App</h1> }
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems}></Menu>
      </Sider>
      <AntLayout>
        <Header style={{ padding: 0, background: colorBgContainer }}> 
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
            />
        </Header>
        <Content style={{ margin: '24px 16px 0' ,background: colorBgContainer, borderRadius: borderRadiusLG,}}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
```

### 3.创建路由文件
```tsx
import React from 'react';
import { Route, Routes ,Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';

import Layout from '../components/Layout'; // 你之前的布局组件
// 创建一个用于需要布局的页面的路由包装器
const ProtectedLayout: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/" element={<Navigate to="/home" replace />} /> 
    </Routes>
  </Layout>
);
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/*" element={<ProtectedLayout />} />
  </Routes>
);

export default AppRoutes;
```

### 4.修改app.tsx
```tsx
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
function App() {
  return (
    <Router>
       <AppRoutes />
    </Router>
  )
}

export default App
```

### 5.创建home和about页面
```tsx
import React from 'react';
const HomePage: React.FC = () => (
  <div>
    <h1>欢迎来到后台管理系统</h1>
    <p>这是一个简单的示例。</p>
  </div>
);
export default HomePage;
```

## 登录及鉴权
### 1.环境变量添加
```basic
# .env.development
VITE_BASE_URL='/dev-api'
# .env.production
VITE_BASE_URL='/api'
```

### 2.接口地址配置 services
```tsx
const base = import.meta.env.VITE_BASE_URL;
// 登录
export const loginApi = base + '/login';
```

### 3.vite代理设置
```tsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 9000,
    host: true,
    open: true,
    proxy: {
      "/dev-api": {
        target: 'http://192.168.11.22:16080',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, ""),
      },
    }
  },

  plugins: [react()],
})
```

### 4.请求封装
```tsx
import axios, {
  AxiosError
} from 'axios'; 


import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig, 
} from 'axios';

export interface ApiError {
  status?: number;
  message: string;
  data?: any;
  isNetworkError?: boolean;
  url?: string;
  method?: string;
}

const http = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 注意：请求拦截器的 config 类型是 InternalAxiosRequestConfig
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const data = config.data;

    if (
      data &&
      !(data instanceof FormData) &&
      !(data instanceof URLSearchParams) &&
      typeof data === 'object' &&
      !Array.isArray(data)
    ) {
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
      config.data = JSON.stringify(data);
    }

    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 注意：响应拦截器的 response 类型是 AxiosResponse
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError): Promise<ApiError> => {
    const response = error.response;
    const request = error.request;
    const config = error.config;

    const errorResponse: ApiError = {
      message: error.message || 'Unknown error',
      url: config?.url,
      method: config?.method?.toUpperCase(),
    };

    if (response) {
      errorResponse.status = response.status;
      errorResponse.data = response.data;
      errorResponse.message = response.statusText || errorResponse.message;

      switch (response.status) {
        case 400:
          errorResponse.message = '请求参数错误';
          break;
        case 401:
          errorResponse.message = '未授权，请重新登录';
          break;
        case 403:
          errorResponse.message = '权限不足';
          break;
        case 404:
          errorResponse.message = '请求的资源不存在';
          break;
        case 500:
          errorResponse.message = '服务器内部错误';
          break;
        default:
          errorResponse.message = `请求失败 [${response.status}]`;
      }
    } else if (request) {
      errorResponse.isNetworkError = true;
      errorResponse.message = '网络连接失败，请检查网络';
    } else {
      errorResponse.message = `请求配置错误: ${error.message}`;
    }
    // 跳转拦截，401未授权

    return Promise.reject(errorResponse);
  }
);

export function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return http(config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error: ApiError) => {
      return Promise.reject(error);
    });
}

export function get<T = any>(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({
    method: 'GET',
    url,
    params,
    ...config,
  });
}

export function post<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({
    method: 'POST',
    url,
    data,
    ...config,
  });
}

export function put<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({
    method: 'PUT',
    url,
    data,
    ...config,
  });
}

export function patch<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({
    method: 'PATCH',
    url,
    data,
    ...config,
  });
}

export function del<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>({
    method: 'DELETE',
    url,
    ...config,
  });
}

export default http;
```

注意：通过获取本地token，并在请求时携带token

```tsx
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const headers = { ...config.headers };
    const data = config.data;

    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return { ...config, headers };
})
```

### 5.全局token 设置
一般是在登录成功时，将后端返回token存储到本地。

```tsx
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  post(loginApi, values).then((res) => {
    if (res.code === 200) {
      const token = res.data.token;
      localStorage.setItem('authToken',"Bearer " + token); // 将 token 存储到 localStorage
      messageApi.open({
        type: 'success',
        content: '登录成功',
      });
    } else {
      messageApi.open({
        type: 'error',
        content: res.message,
      });
    }
  });
};
```

## 状态存储
### 1.安装Redux插件
```bash
npm install redux react-redux @reduxjs/toolkit
```

### 2.修改main入口
引入并使用全局状态管理

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import { Provider } from 'react-redux';
import { store } from './store/index.tsx';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

### <font style="color:rgb(44, 44, 54);">3.创建 Redux Store</font>
根目录创建store目录，并创建index.tsx文件

```tsx
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './datas/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
```

store目录创建datas目录，并创建user.tsx文件

```tsx
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  email: string;
  createTime: string;
  token: string;
  avatar: string;
  phone: string;
}


const initialState: UserState = {
  username: '',
  email: '',
  createTime: "",
  token: "",
  avatar: "",
  phone: "",
};
const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserInfo(state, action: { payload: UserState }) {
      return action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
```

### 4.修改状态
dispatch构造调用状态修改方法

```typescript
dispatch(changefn(data))
```

例如:

```typescript
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/datas/user';

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  const dispatch = useDispatch()
  post(loginApi, values).then((res: { code: number; data: { token: string; }; message: any; }) => {
    if (res.code === 200) {
      dispatch(setUserInfo(res.data))
      messageApi.open({
        type: 'success',
        content: '登录成功',
      });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      messageApi.open({
        type: 'error',
        content: res.message,
      });
    }
  });
};
```

### 5.获取状态
useSelector钩子获取状态

```typescript
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';

const UserGroup: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  return (
    <div className="header-user">
      { user.avatar ? <Avatar src={user.avatar} size={36} /> : <Avatar icon={<UserOutlined />} size={36} /> }
      <span>{user.username}</span>
    </div>
  );
}
```

### 6.持久化存储
Redux 在使用的过程中，遇到页面刷新，数据会丢失，这时候就需要使用持久化存储。

下面是用redux-persist 实现持久化的过程。

安装：

```bash
npm install redux-persist
```

修改 stroe/index 入口文件

```tsx
import { configureStore,combineReducers  } from '@reduxjs/toolkit';
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
// 引入 reducer
import userReducer from './datas/user';

// 1. 定义持久化配置
const persistConfig = {
  key: 'root',       // 存储键名
  storage,           // 存储引擎 (localStorage)
  version: 1,        // 版本号 (改变时自动清除旧数据)
  // 可选配置:
  whitelist: ['user'], // 只持久化 user 状态
  // blacklist: ['otherReducer'], // 排除某些 reducer
};

// 2. 创建持久化 reducer
const rootReducer = combineReducers({
  user: userReducer,
  // ...
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. 配置 store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略 redux-persist 的 action 类型
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 4. 创建 persistor 对象
export const persistor = persistStore(store);

// 5. 导出类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

main入口文件修改：

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; 
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate 
        loading={null} // 可替换为加载组件如 <LoadingScreen />
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
```

清理持久化数据：

```tsx
import { persistor } from '@/store/index';
// 清理
persistor.purge()
// 或
window.localStorage.clear()
```

## 动态菜单
动态菜单实现之后，在本地添加菜单将无效，需要配合后端返回需要展示的菜单。同时，后端返回的菜单必须本地存在！否则也不显示。

### 1.创建菜单组件
Menus.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Menu, } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeOutlined, LoadingOutlined,
} from '@ant-design/icons';
import { get } from '@/utils/request';
import { getMenusApi } from '@/services';

type ItemType = {
    id: number;
    icon?: string;
    title: string;
    path: string;
    hide: boolean;
}
type MenuItems = {
    key: string;
    icon?: React.ReactNode;
    label: React.ReactNode;
}

// 菜单图标
const getIcon = (icon: string) => {
    switch (icon) {
        case 'HomeOutlined':
            return <HomeOutlined />
            break;
        case 'LoadingOutlined':
            return <LoadingOutlined />
            break;
        default:
            break;
    }
}
const getMenuItem = (arr: ItemType[]) => {
    return arr.map((item) => {
        if (!item.hide) {
            return {
                key: item.path,
                icon: item.icon ? getIcon(item.icon) : null,
                label: <Link to={item.path}>{item.title}</Link>,
            };
        }
        return undefined;
    }).filter((item) => item != undefined);;
}

const Menus: React.FC = () => {
    const location = useLocation();
    const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
    useEffect(() => {
        get(getMenusApi).then((res: { code: number; data: ItemType[]; message: any; }) => {
            if (res.code === 200) {
                let item = getMenuItem(res.data)
                setMenuItems(item)
            }
        });
    }, []);

    return (
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems}></Menu>
    );
};

export default Menus;
```

### 2.布局引入
Layout文件中引入组件

```tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as AntLayout,  Button, theme } from 'antd';
import {   MenuUnfoldOutlined, MenuFoldOutlined,} from '@ant-design/icons';
import logo from '@/assets/images/react.svg';
import Breadcrumbs from '@/components/BreadCrumbs';
import Menus from '@/components/Menus';
import UserGroup from '@/components/UserGroup';

const { Header, Sider, Content } = AntLayout;
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  return (
    <>
      <AntLayout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="logo">
            <img src={logo} alt="" />
            {collapsed ? null : <h1>React App</h1>}
          </div>
          <Menus />
        </Sider>
        <AntLayout>
          <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Breadcrumbs />
            <UserGroup />
          </Header>
          <Content style={{ margin: '24px 16px 0', background: colorBgContainer, borderRadius: borderRadiusLG, }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children || <Outlet />}
            </div>
          </Content>
        </AntLayout>
      </AntLayout>
    </>
  );
};

export default Layout;
```

## 异常问题
### 1.[antd: compatible] antd v5 support React is 16 ~ 18. see https://u.ant.design/v5-for-19 for compatible.
解决办法：安装兼容代码 v5-patch-for-react-19

```bash
npm install @ant-design/v5-patch-for-react-19 --save
```

在页面入口文件main.tsx引入使用：

```javascript
import '@ant-design/v5-patch-for-react-19';
```

