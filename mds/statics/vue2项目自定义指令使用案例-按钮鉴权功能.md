功能描述：根据接口返回和前端自定义指令传参，进行鉴权匹配，鉴权通过显示按钮，否则页面不创建按钮元素。

功能实现：

### 1.自定义指令 
```javascript
export default const directive = {
    hasBtn:{
        inserted: hasPermission,
        update:hasPermission
    }
}

/*
* 判断根据父页面name和按钮名字判断是否有按钮权限
* 可根据name或id进行绑定页面按钮权限
* v-hasBtn="['parentName','btnName']"
*/
function hasPermission2(el,binding,vnode){
  let {value:[parentName,btnName]}=binding
  let has = false
  let btsGroups = store.state.buttons
  // 通过 vnode上下文获取路由信息
  const router = vnode.context.$router;
  const routerName = router.currentRoute.name；
  // 循环比较参数信息是否一致
  if (btsGroups && btsGroups.length > 0) {
    for (let index = 0; index < btsGroups.length; index++) {
      const btn = btsGroups[index];
      if (parentName== routerName && btn.name == btnName) {
        has = true
        break;
      }
    }
  }
  if (!has) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}
```

### 2.全局注入指令
```javascript
import directive from '@/directive'

// 全局注册自定义指令
Object.entries(directive).forEach(([key, value]) => void Vue.directive(key, value))
```

### 3.页面使用
```javascript
<div class="btn" @click="handlesendMsg(row)"  v-hasBtn="['editPage','send']">发布</div>
```

