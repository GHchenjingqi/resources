## 组合式 Composition API

组合式：使用导入的 API 函数来描述组件逻辑。Vue3 组合式 API 通常会与 ` script setup`搭配使用。用函数的方式，让代码更加优雅，并且相关代码有序的组织在一起。

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

选项式（Options  API）：通过对象的多个选项（对象属性和方法：data,methods...）描述组件（vue2x)。缺陷：修改一个功能或新增一个功能，分别需要在data,methods,computed等方法里新增代码，不便于维护和复用。

## 组合式函数

“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。

与组合式组件类似，组合式组件是在组件内使用vue组合式方法和属性。而组合式函数是将vue3的方法和属性直接定义到函数内部，便于多组件复用。

组合式api写法：

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

组合式函数写法：

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}
```

组合式函数 有点类似vue2里面的混入 mixins ，但是弥补了混入的以下缺点：

- 不清楚数据来源

- 命名空间冲突

- 跨mixin数据耦合

    

## 基础知识

### 1.模板语法

#### 文本插值

跟vue2一样，都使用 2个花括号{{ }} 表示HTML模板。

```vue
<span>Message: {{ msg }}</span>
```

#### HTML代码

跟vue2一样，都使用v-html插入一段html代码。

```vue
<div> <span v-html="rawHtml"></span></div>
<!-- 或 -->
<div> <span :html="rawHtml"></span></div>
```

#### 属性绑定

跟vue2一样，都使用v-指定绑定自定义属性。在绑定自定义属性时，绑定的值如果是null,undefined时，属性会自动移除。

```vue
<div v-bind:id="dynamicId"></div>
<!-- 或 -->
<div :id="dynamicId"></div>
```

布尔类型，同样的绑定值为假时，属性将会被忽略。

```vue
<button :disabled="isButtonDisabled">Button</button>
```

多个属性绑定

```vue
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}

<div v-bind="objectOfAttrs"></div>
```

动态参数

```vue
<a v-bind:[attributeName]="url"> ... </a>
<!-- 简写 -->
<a :[attributeName]="url"> ... </a>
```

### 2.class和style

#### 动态class

```vue
const isActive = ref(true)
const hasError = ref(false)

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

也可以使用对象的形式绑定:

```vue
const classObject = reactive({
  active: true,
  'text-danger': false
})

<div :class="classObject"></div>
```

使用数组绑定多个class:

```vue
const activeClass = ref('active')
const errorClass = ref('text-danger')

<div :class="[activeClass, errorClass]"></div>
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

在组件上使用动态class，单一根元素样式属性会在组件内最外层元素生效。多个根元素，需要通过 `$attrs` 接收样式。

```vue
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>

<MyComponent class="baz" />
```

 #### 动态style

绑定对象

```vue
const activeColor = ref('red')
const fontSize = ref(30)

<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

直接绑定对象

```vue
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})

<div :style="styleObject"></div>
```

样式多值的情况

```vue
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

#### 属性透传 - attribute

属性透传是指元素属性通过父组件传递进来，但是子组件没有声明定义这样的属性。透传的属性会与现有的属性合并。

- 单个元素为根元素时，透传的 attribute 会自动被添加到根元素上。
- 多个子元素为根元素时，可以通过 `:class="$attrs.class"` 接收属性

比仅仅属性可以透传，事件也可以透传到子组件内。如果不需要透传（inheritAttrs: false），可以在组件这样声明：

```vue
<script setup>
defineOptions({
  inheritAttrs: false
})
</script>
```

##### 透传属性获取

通过useAttrs方法获取透传属性。

```js
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
// 或
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```



###  3.条件和列表

#### v-if、v-else、v-else-if

条件渲染 通过v-if、v-else、v-else-if ,当满足条件后渲染。

```vue
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

#### v-show

v-show不能写在template上，v-if可以。因为v-show是通过元素的display属性控制显示隐藏的。

#### 列表渲染

v-for渲染数组

```vue
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])

<li v-for="(item, index) in items">
   {{ index }} - {{ item.message }}
</li>
```

v-for渲染对象

```vue
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
<ul>
  	<li v-for="(value, key) in myObject">
      {{ key }}: {{ value }}
    </li>
</ul>
```

**v-for 和v-if 为什么不同时在一个元素上？**

vue3 因为 v-if的优先级高于v-for ,这意味 v-if条件无法访问到v-for作用域的变量。

```vue
// 这时会有报错：未定义
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

解决办法就是分到2个元素上。

```vue
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

### 4.事件处理

与vue2一样，v-on（简写@）指令来监听DOM事件。

#### 内联事件

```vue
const count = ref(0)

<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

#### 方法事件

```vue
function say(message) {
  alert(message)
}

<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

#### 事件修饰符

- stop 停止传递
- prevent 阻止事件的默认行为
- self 元素本身的触发时生效
- capture 
- once 仅触发一次
- passive 触摸事件监听，改善移动端滚动性能

#### 按键修饰符

```vue
<input @keyup.enter="submit" />
<input @keyup.page-down="onPageDown" />
// 组合键
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />
<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>

<!-- .exact 修饰符：仅符合条件的时候才触发 -->
<!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>
<!-- 仅当没有按下任何系统按键时触发 -->
<button @click.exact="onClick">A</button>
```

### 5.表单model

```vue
<input v-model="message" placeholder="edit me" />
<textarea v-model="message" placeholder="add multiple lines"></textarea>
<!-- 复选框 -->
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
<!-- 单选框 -->
<div>Picked: {{ picked }}</div>
<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>
<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
<!-- 选择器 -->
<div>Selected: {{ selected }}</div>
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

#### 表单修饰符

- lazy - 在change事件后更新，而不是input之后
- number - 自动转数字，转失败返回原始值
- trim - 去除输入两端的空格

#### defineModel

宏**defineModel**实现双向绑定。

```vue
<!-- 子组件.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>parent bound v-model is: {{ model }}</div>
</template>

<!-- 父组件.vue -->
<Child v-model="count" />
```

以上写法在3.4之前如下：

```vue
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

定义必填和默认值：

```js
// 使 v-model 必填
const model = defineModel({ required: true })

// 提供一个默认值
const model = defineModel({ default: 0 })
```

#### v-model接收参数

```vue
// 父组件 v-model:参数名
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>

// 子组件 defineModel(参数名) 获取
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

#### 自定义model修饰符

```vue
// 父组件 - 实现输入框第一个字母大写功能
<MyComponent v-model.capitalize="myText" />

// 子组件通过definedModel的setter方法实现自定义修饰符
<script setup>
 // 解构参数
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```



### 6.模板引用

与vue2不同，vue3里面的选择器ref定义需要和模板名字同名。

```vue
<input ref="input">

<script setup>
import { ref, onMounted } from 'vue'
const input = ref(null)
onMounted(() => {
  input.value.focus()
})
</script>
```

**v-for中模板引用**

在循环列表上使用ref模板引用得到包含所有元素的集合数组，但不保证顺序一致！

```vue
<script setup>
import { ref, onMounted } from 'vue'
const list = ref([])
// ref同名
const itemRefs = ref([])
// 得到元素集合数组
onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

### 7.组件

#### 定义组件

单文件组件定义

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

也可以在js文件中定义

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
  // 也可以针对一个 DOM 内联模板：
  // template: '#my-template-element'
}
```

使用组件

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

#### 传递props

同vue2一样，父组件通过prop向子组件传递参数，不过写法有所不同。

```
// 在父组件 定义一个title属性的参数
 <ButtonCounter title="组件标题" />
```

```vue
// 子组件
<script setup>
import { ref} from 'vue'
const props = defineProps(['title'])
console.log(props.title)
</script>

<template>
  <button>{{props.title}}</button>
</template>
```

子组件通过 **defineProps** 声明props参数，如果没有使用setup语法糖，就需要先定义参数，通过setup参数传递进去：

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

props 数据都遵循单向数据流的原则，子组件不可修改props参数。

props 类型校验

```js
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  // 在 3.4+ 中完整的 props 作为第二个参数传入
  propF: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
```



#### 子组件emit触发父方法

同vue2一样，子组件通过emit调用父组件方法，从而实现子传父。不过写法不同。

```vue
<script setup>
import { ref } from 'vue'
const tt = ref('组件标题')
// 父级方法
const TitleHandle =(e)=>{
    tt.value = e
}
</script>
// 父
<ButtonCounter :title="tt.value" @changeTitle='TitleHandle' />
```

```vue
// 子组件
<script setup>
const emit = defineEmits(['changeTitle'])
emit('changeTitle','修改标题了')
</script>

// 没有使用setup语法糖
export default {
  emits: ['changeTitle'],
  setup(props, ctx) {
    ctx.emit('changeTitle')
  }
}
```

### 8.插槽 - slot

插槽用于存放自定义的html结构数据。

#### 默认插槽

插槽只有一个时，就是默认插槽。

```vue
<button type="submit">
  <slot></slot>
</button>
```

插槽可以有默认值，当插槽未传值时，就显示默认值。有数据传递时显示传递的数据。

```vue
<button type="submit">
  <slot>保存</slot>  // 默认值
</button>
```

#### 具名插槽

一个组件内有多个插槽时，就可以给每个插槽定义一个name属性分配唯一的ID。

```vue
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot name="main"></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

// 使用具名插槽
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
  <template #main>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

指定具名插槽通过 v-slot:name 或者 #name 。

#### 动态插槽名

插槽名称也可以是一个变量，写法：

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

#### 插槽作用域

由于插槽的内容无法访问子组件的状态和数据，插槽数据绑定的时候就需要把数据传递出去，便于子组件插槽内容使用。插槽作用域内容返回的是一个对象。

```vue
// 插槽定义
<slot name="header" message="hello"></slot>

// 组件
<MyComponent>
  <template #header="{message}">
    {{ message }}
  </template>
</MyComponent>
```

### 9.自定义指令

自定义指令由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。

自定义指令写法

```vue
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}

<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>
```

全局自定义指令：

```js
const app = createApp({})

// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  /* ... */
})
```

#### 指令钩子

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

#### 钩子参数

指令的钩子会传递以下几种参数：

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。
- `binding`：一个对象，包含以下属性。
    - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
    - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
    - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
    - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
    - `instance`：使用该指令的组件实例。
    - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。
- `prevNode`：代表之前的渲染中指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

#### 简化写法

对于自定义指令来说，一个很常见的情况是仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令。

```vue
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})

<div v-color="color"></div>
```

获取自定义指令对象的属性

```vue
<div v-demo="{ color: 'white', text: 'hello!' }"></div>

app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

### 10.插件

插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。

插件安装使用

```js
// 定义插件
const myPlugin = {
  install(app, options) {
    // 配置此应用
  }
}
// plugins/i18n.js
export default {
  install: (app, options) => {
    // 在这里编写插件代码
  }
}

// 入口js
import { createApp } from 'vue'

const app = createApp({})
app.use(myPlugin, {
  /* 可选的选项 */
})
```

### 11 .内置组件

#### Transition过渡动画组件

进入或离开时触发transition动画组件，注意需要定义css

```vue
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>


/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

**过渡组件命名**

```vue
<Transition name="name">
  ...
</Transition>

// css可以根据指定这个过渡组件
.name-enter-active,
.name-leave-active {
  transition: opacity 0.5s ease;
}

.name-enter-from,
.name-leave-to {
  opacity: 0;
}
```

同样通过name可以使用css3的动画属性animation。

```css
<Transition name="bounce">
  <p v-if="show" style="text-align: center;">
    Hello here is some bouncy text!
  </p>
</Transition>

//css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
```

#### TransitionGroup 

用法同Transition，区别

- 默认不渲染元素，需要通过tag绑定渲染的元素。
- 元素列表都必须有唯一key
- 过渡动画会在列表的子元素上

```css
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

#### keepAlive 

缓存组件在动态组件切换的时候为了保存组件的数据，可以使用keepAlive组件，非活跃的组件数据会被缓存下来。不然数据每次都会被清空。 

```
<!-- 非活跃的组件将会被缓存！ --> 
<KeepAlive>   
	<component :is="activeComponent" />
</KeepAlive>
```

- include 那些组件生效- 接收组件name名，多个以，分割 或数组

- exclude 排除那些组件- 接收组件name名，多个以，分割 或数组

- max 设置最大缓存组件数 - 超过最长限度后，最早缓存数据会被释放缓存生命周期函数

```js
 <script setup> 
 import { onActivated, onDeactivated } from 'vue'  
 onActivated(() => {   // 调用时机为首次挂载   // 以及每次从缓存中被重新插入时 })  
 onDeactivated(() => {   // 在从 DOM 上移除、进入缓存   // 以及组件卸载时调用 }) 
 </script>
```



#### Teleport 

模态组件用于把弹出层“传送”到DOM结构的指定位置。to 通过to指定到元素节点。disabled 指定场景下禁用 

```html
<button @click="open = true">Open Modal</button>  
<Teleport to="body" :disabled="isMobile">   
    <div v-if="open" class="modal"> 
        <p>Hello from the modal!</p>     
		<button @click="open = false">Close</button>   
	</div> 
</Teleport>
```



#### Suspense 

异步组件用于处理异步数据组件的处理。Suspense 组件有2个插槽：#default 和 #fallback。Suspense 遇到任何异步都会进入挂起状态，显示fallback组件，所有异步完成之后进入完成状态，显示默认组件。

```html
<Suspense>   
<!-- 具有深层异步依赖的组件 -->   
<Dashboard />   
<!-- 在 #fallback 插槽中显示 “正在加载中” -->   
<template #fallback>Loading... </template> 
</Suspense>
```

## 生明周期

与vue2相比，vue3的生命周期函数移除了beforeCreat和created阶段，改成了setup，卸载函数从destroyed 改成了 onUnmounted，vue3其他的生命周期函数在前面加on，具体如下：

- setup()  创建时
- onBeforeMount  挂载前
- onMounted 挂载时
- onBeforeUpdate 组件更新前
- onUpdated 组件更新时
- onBeforeUnmount  卸载前
- onUnmounted 卸载时

当页面组件用到缓存keep-alive时，会出现2个特殊的生命周期：

- onActivated 缓存组件页面进入时
- onDeactivated  缓存组件页面离开时

捕获子组件异常状态的钩子函数：

- onErrorCaptured 异常函数

    ​    

**vue3定义全局变量：app.config.globalProperties 。**

**TS 扩展全局属性：**

```ts
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```



## 函数

### setup 

关键字setup这个表示，在编译时进行一些处理，让我们更简洁的使用组合式API。setup在解析其它组件选项之前被调用（beforeCreat之前）。this指向了undefined。

默认两种写法：

```vue
// 方法一：语法糖版本
<script setup>
...
</script>
```

```vue
// 方法二：函数版本
<script>
export default {
  setup() {
  	...
    // 必须有return
    return {
        
    }
  }
}
</script>
```

函数版本接收2个参数：props和context。同时setup函数必须返回一个对象，用于将组件的参数和方法抛出，让其他组件访问。

- props 组件接收到的所有参数
- context 组件实例相关的属性和方法

```vue
<script>
import { ref } from 'vue';
export default {
  name:'HIVUE',
  setup(props,context) {
  	const msg = ref('你好，vue！')
    const changeMsg = ()=>{
        msg.value = 'vue3'
    }
    // 必须有return
    return {
        msg,
        changeMsg
    }
  }
}
</script>
```

注意：vue3在setup函数中，不能使用this访问选项式的方法和数据。

**setup返回值有2种：**

- 包含页面变量的对象
- 页面渲染函数

```js
export default {
  name:'vue3',
  setup() {
    // 返回一个渲染函数,页面内容被渲染成hhhh
    return function(){
    	return 'hhhhhh'
    }
  }
}
```

##### **setup语法糖写法缺点** - 组件无法命名缺失了name属性，默认使用文件名作为组件 name。

### 如何在setup语法糖前提下，自定义组件的名字？

使用插件：vite-plugin-vue-setup-extend

然后再 script 上加 name属性：

```html
<script setup name='组件名称'>
...
</script>
```

### Ref 和Reactive 

声明响应数据，使用Ref和Reactive 。

Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 `Map`。Ref 会使它的值具有深层响应性。**Ref定义的响应式基本类型数据，需要通过`.value`访问。**

ref 既可以定义基本类型，也可以定义 对象类型的数据。

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
// 定义对象
const obj = ref({name:'2222'})  
function increment() {
  count.value++
  // 响应式的vue变成的对象，同理定义数组响应式的value就是数组类型
  obj.value.name = '张三'
}
</script>
```

Reactive 声明**响应式对象（引用类型变成响应式对象）**。ref声明对象时，也是调用了reactive。reactive返回的事代理后（proxy）的对象。

```vue
import { reactive } from 'vue'
const state = reactive({ count: 0 })
```

#### reactive 的局限性：

- **只能用于对象类型**（对象，数组，和Map，Set集合），不能声明 string,number原始类型

- **使用解构赋值后，响应式会丢失**，需要使用 toRefs 转一下响应式数据

    ```js
    const obj = reactive({name:'qeqw'})
    // 这样得到的name还是响应式的数据
    let {name} = toRefs(obj)
    ```

- 重复赋值，响应式会丢失

在项目中，常用ref定义基本类型，使用reactive 定义引用类型。

### computed -计算属性

计算属性会根据响应数据依赖值变化，然后同步更新。当依赖值不发生变化时，计算属性就具备缓存功能。而方法总是会在调用时执行，计算属性依赖值不变，不会重新执行。

```vue
// 只读的计算属性
const now = computed(() => Date.now())
```

计算属性（函数表达式）默认是只读的。但特殊场景也可写。计算属性可以通过 getter和setter来创建。

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
// 下面会触发计算属性的可写方法
fullName.value = 'John Doe'
</script>
```

计算属性的值类型其实就是 ref类型的响应式数据，需要通过调用 ref.value 进行读写。

### watch

监听一个属性，发生变化时触发。

```js
watch(name,(newv,oldv)=>{
	// 回调
},{
  //开启首次监听
  immediate: true, // 首次监听
  deep:true, // 深度监听
  once: true // 仅监听一次
})
```

watch不能监听响应式**对象的属性值**，需要通过getter方法

```js
const obj = reactive({ count: 0 })
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

#### **watch 只能监听以下4中数据：**

- ref定义的数据
- reactive定义的数据，隐式的就是强制深度监听，无法关闭监听！！！
- 函数返回值（getter函数）
- 一个包含上述内容的数组

#### 如何解除watch监听事件？

watch创建时返回的是一个函数，解除时调用该函数就可以自动解除对应的监听事件。

```js
const watEvent =watch(name,(newv,oldv)=>{
	// 回调
}
// 移除监听
watEvent()
```



### watchEffect

watchEffect会自动追踪其内部回调函数中使用的任何响应式数据，并在这些数据变化时重新运行该回调函数，无需指定依赖项。

```js
const state = reactive({
  count: 0,
  message: 'Hello'
})
watchEffect(() => {
  // 当count，message变化时自动触发
  console.log(`Count is now ${state.count}.`)
  console.log(`Message is now "${state.message}".`)
})
```

停止watchEffect监听使用 watchEffect(() => {})

```
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```

### 依赖注入Provide/inject

依赖注入有2部分组成：Provide - 提供数据，Inject - 注入数据 。主要是用于解决深层次数据传递的问题（祖孙组件通信）。

#### Provide提供数据

写法：provide(key,value)

```vue
<script setup>
import { provide } from 'vue'

provide( 'message', 'hello!')
</script>
```

全局提供依赖：

```js
import { createApp } from 'vue'
const app = createApp({})
app.provide( 'message',  'hello!')
```

#### Inject注入数据

接收provide的数据，需用inject。在需要的子组件写：

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

inject 接收默认数据，当收到数据之后会把默认数据替换。

```js
const value = inject('message', '这是默认值')
```

### toValue

`toValue()` 是一个在 3.3 版本中新增的 API。它的设计目的是将 ref 或 getter 规范化为值。如果参数是 ref，它会返回 ref 的值；如果参数是函数，它会调用函数并返回其返回值。否则，它会原样返回参数。

```js
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // 如果 maybeRefOrGetter 是一个 ref 或 getter，
  // 将返回它的规范化值。
  // 否则原样返回。
  const value = toValue(maybeRefOrGetter)
}
```

