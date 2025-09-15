## 一、官方安装


VUE3 默认安装（官方）基于 vite创建项目，这可以通过 package.json 的scripts 脚本命令看出，与vite创建的项目一致！



```plain
 "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```



### 1.安装


```plain
npm create vue@latest
```



### 2.初始化


```plain
 cd <your-project-name>
 npm install
 npm run devabc
```



### 3.打包


```plain
npm run build
```



vue3动态引入本地图片

```javascript
const geticon = function(icon){
  return new URL(
    // 本地资源路径
    `/src/assets/images/${icon}.png`,
    import.meta.url
  ).href
}
```

## 二、使用 vite安装


### 1.安装


```plain
 npm create vite@latest
```



### 2.输入项目名称，选择框架：vue/react... ,选择脚本：js/TS


### 3.初始化


```plain
  cd test2
  npm install
  npm run dev
```

## 三、使用技巧
### 1.动态引入img
` import logo from "@/assets/logo.svg";  `



### 2.css样式穿透
vue2x版本 使用 /deep/ 或者 >>> 可以穿透子组件使样式生效。

vue3版本 使用以下方法：

```javascript
:deep(.el-input__inner){
	background-color: 'red';
}
```

### 3.<font style="color:rgb(31, 35, 40);">使用边框组件(</font><font style="color:rgb(34, 34, 38);">datav3</font><font style="color:rgb(31, 35, 40);">)时，页面显示正常，跳转时路由报错</font>
_**<font style="color:rgb(79, 79, 79);">Cannot read properties of null (reading '$el')</font>**_

<font style="color:rgb(79, 79, 79);">解决办法：路由开启缓存，保证组件不被销毁！</font>

```vue
<router-view v-slot="{ Component }">
  <keep-alive>
      <component :is="Component"></component>
  </keep-alive>
</router-view>
```

### 4.vite项目设置代理接口，解决跨域问题
```javascript
server: {
    port: 9081,
    proxy: {
      '/api': {
        target: "http://192.168.11.8:8080/", // 接口地址
        changeOrigin: true, // 允许跨域
        secure: false,
        ws: false,
        rewrite:(path) => path.replace(/^\/api/, '')
      }
    },
  },
```

### 5.vue-cli 创建的vue项目设置代理接口，解决跨域问题
```javascript
devServer: {
    port: 8081,
    proxy: {
      '/fxzc': {
        target: api,
        onProxyRes: cookiePathRewriter,
        pathRewrite: {
          '^/fxzc': '/fxzc',
        },
        wx: true,
        logLevel: 'debug',
        secure: false,
      }
    }
}
```

### 6.vue如何判断是开发环境还是生成环境？
**process.env.NODE_ENV** 在生产环境返回 <font style="color:rgb(77, 77, 77);">“production”</font>，在开发环境返回 “development”。

```javascript
if(process.env.NODE_ENV === "development"){}
```

也可以手动设置返回标识，在项目根目录创建 <font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">.env.development 和 .env.production 文件。</font>

```javascript
NODE_ENV=production
```

### 7.vite打包后白屏，路径是绝对路径，怎么修改？
在vue.config.js里面配置 base属性（相当于vue-cli里配置publicPath）

```javascript
export default defineConfig({
  base: './',
}
```

### 8.vite项目打包后，开发环境直接访问动态路由详情页面正常，部署到服务器之后，页面404或报错：<font style="color:rgb(34, 34, 38);">Failed to load module script: Expected a JavaScript module script but the server responded with a MI...</font>
在vue.config.js里面配置 base属性（相当于vue-cli里配置publicPath）

```javascript
export default defineConfig({
  base: '/',
}
```

在服务器<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">Nginx</font>设置伪静态

```javascript
server {  
    listen 80;  
    server_name yourdomain.com;  
  
    location / {  
        try_files $uri $uri/ /index.html;  
    }  
}
```

### 9.vue3 动态路由生成
```javascript
const modules = import.meta.glob('@/views/three/*.vue')

for (let key in modules) {
    // 排除views下的components子组件文件夹
    let paths = key.replace('/src/views/three/', '/').replace('/index.vue', '').replace('.vue', '').toLowerCase()
    let names = paths.replace('/', '')
    routes[0].children.push({
        path:paths,
        name:names,
        component: modules[key].default || modules[key],
    })
}
```

### 10.vue3混入mixin和hook的区别
混入：

```javascript
// mixins.js
export default {  
  data() {  
    return {  
      mixinData: 'This is data from mixin'  
    };  
  },  
  created() {  
    console.log('Mixin created hook called');  
  },  
  methods: {  
    mixinMethod() {  
      console.log('This is a method from mixin');  
    }  
  }  
};

// 页面可以直接使用 混入的数据
<template>  
  <div>  
    <p>{{ mixinData }}</p>  
    <button @click="mixinMethod">Call Mixin Method</button>  
  </div>  
</template>  
  
<script>  
import myMixin from './myMixin.js';  
  
export default {  
  mixins: [myMixin],  
  data() {  
    return {  
      componentData: 'This is data from the component'  
    };  
  },  
  mounted() {  
    console.log('Component mounted hook called');  
  }  
};  
</script>
```

hook

```javascript
// mixins.js
import { ref } from 'vue';

export const useCounter = () => {
  const count = ref(0);
  const increment = () => {
    count.value++;
  };

  return {
    count,
    increment,
  };
};

// 页面
<template>  
  <div>  
    <p>Count: {{ count }}</p>  
    <button @click="increment">Increment</button>  
  </div>  
</template>  
  
<script setup>  
import { useCounter } from './mixins.js'; // 注意文件路径可能需要调整  
const { count, increment } = useCounter();  
    
</script>
```

### 11.vue3 父调子方法
子组件方法：

```vue
<script setup>
const  feachData=()=>{}
defineExpose({
    feachData
});
</script>
```

父

```vue
<Echart3D ref="Echatre3D" />
  
if (Echatre3D.value) {
    Echatre3D.value.feachData(val);
}
```



### 12.v-memo 指令
<font style="color:rgb(17, 17, 17);"> v-memo 指令用于缓存一个模板的子树DOM，只有依赖值变化，才能更新缓存DOM区域。</font>

<font style="color:rgb(17, 17, 17);">应用场景如下：</font>

+ **<font style="color:rgb(44, 44, 54);">静态内容优化</font>**
+ **<font style="color:rgb(44, 44, 54);">列表优化</font>**
+ **<font style="color:rgb(44, 44, 54);">高成本计算的结果缓存</font>**

```javascript
<div v-for="item in list" :key="item.id" v-memo="(item.id === selected)">
  <p>ID: {{item.id}} - selected: {{item.id === selected}}</p>
  <p>...more child nodes</p>
</div>
```

### 13.路由传参
+ **Query传参** - 会显示在地址栏

query 传参需要配合path属性。router 传值，route接收。

```javascript
// 传递
import { useRouter } from 'vue-router';
const router = useRouter();
const toDetail = (id) => {
  router.push({
    path: '/info',
    query: {
      id
    }
  });
};

// 接收
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.query.id);
```

+ **Params传参**

params传参需要配合name属性。router 传值，route接收。

```javascript
// 传递
import { useRouter } from 'vue-router';
const router = useRouter();
const toDetail = (id) => {
  router.push({
    name: 'Info',
    params: {
      id
    }
  });
};

// 接收
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.id); 
```

+ **动态路由传参**

动态路由需要在配置路由参数，如下：

```javascript
// 配置
const routes = [
  {
    path: '/info/:id',
    name: 'Info',
    component: () => import('@/view/Table/info.vue')
  }
]

// 接收
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.id); 
```

