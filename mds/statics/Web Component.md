### 定义及特点
web组件是是原生标准化组件，本质是浏览器支持的原生API,用于创建可复用的前端组件，跨框架兼容，支持VUE/React项目。

浏览器兼容：支持现代浏览器，IE需要webcomponentsjs兼容

```html
<!-- 引入垫片，兼容IE -->
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.8.0/webcomponents-bundle.js"></script>
<!-- 使用组件 -->
<my-button>兼容版按钮</my-button>
```

### 核心技术
+ Custom Elements - 自定义元素
+ Shadow DOM - 样式隔离
+ Html <font style="color:rgba(0, 0, 0, 0.85);">Templates</font> 模板

### 使用场景
+ 开发通用Ui组件
+ 构建微前端架构，解决不同框架组件兼容问题

### 核心知识
#### 1.Custom Elements
**自定义方式：**

+ 扩展html元素，“<button is='my-button'>”
+ 继承原生类

**生命周期狗子**：

+ constructor 组件实例化构造器
+ connectedCallback 组件挂载DOM时
+ disconnectedCallback 组件移除时
+ attributeChangedCallback(name, oldVal, newVal) 监听属性变化，需要配合
+ _<font style="color:#8A8F8D;">adoptedCallback 组件被移动到新文档时，跨文档</font>_

代码：

```javascript
class MyComponent extends HTMLElement {
  static observedAttributes = ['custom-href']
  constructor() {
    super();
  }
  connectedCallback(){
     console.log('MyButton 已挂载');
  }
  disconnectedCallback(){
     console.log('MyButton 已卸载');
  }
  attributeChangedCallback('custom-href', oldVal, newVal){
     console.log('MyButton 监听属性');
  }
}
// 注册组件，标签名必须包含连字符
customElements.define('my-button', MyComponent);
```

attributeChangedCallback 需要和observedAttributes配合使用。

#### 2.Shadow DOM 样式隔离
样式隔离，避免样式冲突。

两种模式：

+ open 外部通过 element.shadowRoot 访问
+ closed 外部无法访问

```javascript
class MyComponent extends HTMLElement {
  constructor() {
    super();
    // 创建 Shadow DOM，模式为 open
    const shadowRoot = this.attachShadow({ mode: 'open' });
    // 向影子 DOM 中添加内容
    shadowRoot.innerHTML = `
      <style>
        /* 样式仅作用于影子 DOM 内部 */
        div { color: red; }
      </style>
      <div>Shadow DOM 内容</div>
    `;
  }
}
```

样式穿透：

```html
::slotted(span){
  color: blue
}
```

#### 3.HTML Templates & Slots
定义组件的静态结构，内容不会被解析，仅在克隆猴生效，可通过 content.cloneNode(true) 克隆模版内容。

```html
<template id="buttonTemplate">
  <style>
    /* 样式隔离，仅作用于组件内部 */
    button {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
    }
  </style>
  <button>
    <!-- 插槽：接收外部传入的内容 -->
    <slot name="title">默认标题</slot>
    <slot>默认按钮</slot>
  </button>
</template>
<script>
class MyButton extends HTMLElement {
  constructor() {
    super(); // 必须调用父类构造函数
    // 挂载影子 DOM
    const shadow = this.attachShadow({ mode: 'open' });
    // 克隆模板内容并挂载
    const template = document.getElementById('buttonTemplate');
    shadow.appendChild(template.content.cloneNode(true));
  }
}

// 注册组件，标签名必须包含连字符
customElements.define('my-button', MyButton);
</script>
```

 Slots 插槽，用于接收外部传入的内容。

+ **<font style="color:rgb(0, 0, 0) !important;">默认插槽</font>**<font style="color:rgb(0, 0, 0);">：无名称的</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);"><slot></font>`<font style="color:rgb(0, 0, 0);">，接收所有未匹配的外部内容；</font>
+ **<font style="color:rgb(0, 0, 0) !important;">具名插槽</font>**<font style="color:rgb(0, 0, 0);">：</font>`<font style="color:rgb(0, 0, 0);"><slot name="title"></font>`<font style="color:rgb(0, 0, 0);">，接收外部</font><font style="color:rgb(0, 0, 0);"> </font>`<font style="color:rgb(0, 0, 0);">slot="title"</font>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">的内容；</font>
+ **<font style="color:rgb(0, 0, 0) !important;">默认内容</font>**<font style="color:rgb(0, 0, 0);">：</font>`<font style="color:rgb(0, 0, 0);"><slot>默认文本</slot></font>`<font style="color:rgb(0, 0, 0);">，外部无内容时显示。</font>



#### 4.自定义事件dispatchEvent
使用dispatchEvent触发抛出事件和参数

```javascript
this.dispatchEvent(new CustomEvent('card-click', {
  detail: { id: 123 }, // 参数
  bubbles: true, // 冒泡
  composed: true // 穿透
}));
```

#### 5.组件复用与模块化
将组件封装成独立的ES模块：

```javascript
// my-button.js
export class MyButton extends HTMLElement {
  // 组件逻辑...
}
customElements.define('my-button', MyButton);
```

#### 渲染动态数据-LitHtml插件
```bash
npm install lit-html
```

导入html和render

```javascript
import {html, render} from 'lit-html';

// 定义一个模板函数
const myTemplate = (name) => html`<div>Hello ${name}</div>`;

// 用一些数据渲染模板
render(myTemplate('earth'), document.body);
```



