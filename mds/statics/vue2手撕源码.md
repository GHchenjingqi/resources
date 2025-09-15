### VUE源码学习

#### 1.vue模板解析实现

通过遍历根节点的子元素（childNodes） ，再根据节点类型nodeType 过滤模板变量符号{{}}，然后通过textContent替换对应文本的数据，元素类型递归编译模板。

```html
<div id="app">
    <h1>{{str}}</h1>
    <p>{{ss}}</p>
</div>

<script>
    class Que{
        constructor(options){
            // 跟元素
            this.$el = document.querySelector(options.el)
            this.$data = options.data

            // 模板编译
            this.complie(this.$el)
        }
        complie(nodes){
            nodes.childNodes.forEach(item=>{
                if(item.nodeType == 1 && item.childNodes.length>0){
                    // 节点类型为元素，且子元素存在开始递归
                    this.complie(item)
                }
                // 文本节点
                if(item.nodeType == 3){
                    // 匹配模板正则
                    let reg = /\{\{(.*?)\}\}/g
                    // 原始内容
                    let texts = item.textContent 
                    item.textContent = texts.replace(reg,(match,vmkey)=>{
                        // 去除模板变量的 左右空格
                        vmkey = vmkey.trim()
                        return this.$data[vmkey]
                    })
                }
            })
        }
    }
    // 实例化对象
    new Que({
        el:"#app",
        data:{
            str:"123",
            ss:"4354"
        }
    })
</script>
```

#### 2.vue生命周期实现

vue页面每次都会执行前4个生命周期：beforeCreate， created， beforeMount，mounted。

实现方式：在构造函数中，调用函数钩子并改变this指向到构造函数。data数据在created前解构，el元素和模板编译在mount之前完成。

```js
class Que{
    constructor(options){
        if(typeof options['beforeCreate'] == 'function'){
            options['beforeCreate'].bind(this)()
        }
        // create 时能获取到data数据
        this.$data = options.data
        if(typeof options['created'] == 'function'){
            options['created'].bind(this)()
        }
        if(typeof options['beforeMount'] == 'function'){
            options['beforeMount'].bind(this)()
        }
        // mounted阶段可以获取到跟元素
        this.$el = document.querySelector(options.el)
        // 模板编译
        this.complie(this.$el)
        if(typeof options['mounted'] == 'function'){
            options['mounted'].bind(this)()
        }
    }
    complie(nodes){...}
}
// 实例化对象
new Que({
    el:"#app",
    data:{
        str:"123",
    },
    beforeCreate(){
        console.log("beforeCreate:",this.$el,this.$data)
    },
    created(){
        console.log("created:",this.$el,this.$data)
    },
    beforeMount(){
        console.log("beforeMount:",this.$el,this.$data)
    },
    mounted(){
        console.log("mounted:",this.$el,this.$data)
    }
})
```

#### 3.vue事件添加实现

vue的methods事件调用是在编译模板时获取到事件名，并创建事件监听函数放置到事件队列里面。

通过 **hasAttribute** 判断元素节点是否有v-click的指令，有就用 **getAttribute** 获取到事件名，然后再创建监听click点击事件**addEventListener**，调用options里面methods里面的这个方法，并把点击事件的event事件传入到方法中。

```html
<div id="app">
    <h1>{{str}}</h1>
    <button @click="btnEvent">点击</button>
</div>
<script>
    class Que{
        constructor(options){
            ...
            // 将参数备份
            this.$options = options
            // 模板编译
            this.complie(this.$el)
            if(typeof options['mounted'] == 'function'){
                options['mounted'].bind(this)()
            }
        }
        complie(nodes){
            nodes.childNodes.forEach(item=>{
                if(item.nodeType == 1){
                    // 判断元素是否绑定有 @事件
                    if(item.hasAttribute('@click')){
                        // 获取事件名称
                        let vmEventKey = item.getAttribute('@click')
                        vmEventKey = vmEventKey.trim()
                        item.addEventListener('click',(event)=>{
                            this.eventfn = this.$options.methods[vmEventKey].bind(this)
                            this.eventfn(event)
                        })
                    }

                    // 递归
                    if(item.childNodes.length>0){
                        this.complie(item)
                    }
                }
                // 文本节点
                if(item.nodeType == 3){
                    ...
                }
            })
        }
    }
    new Que({
        el:"#app",
        data:{
            str:"123",
            ss:"4354"
        },
        methods:{
            btnEvent(e){
                console.error(e)
            }
        }
    })
</script>
```

#### 4.vue数据劫持

vue2的数据劫持是通过 Object.defineProperty(this,key,{get,set}) 实现，复杂数据结构通过递归循环遍历进行数据劫持。

```js
proxyData(){
    for(let key in this.$data){
        Object.defineProperty(this,key,{
            get(){
                return this.$data[key]
            },
            set(val){
                this.$data[key] = val
                return ture
            }
        })
    }
}
```

vue3的数据劫持是通过 new Proxy(target,handler)

#### 5.vue双向绑定

vue的双向绑定数据是在数据编译阶段对每一个模板变量创建一个监听器，当数据代理完成之后，执行一个数据监听的方法：如果发现数据触发了set，就去调用监听器的更新方法更改页面的数据。

```vue

<div id="app">
    <h1>{{str}}</h1>

    <button @click="btnEvent">点击</button>
</div>

<script>
    // 监听器
    class Watch{
        constructor(vm, key,node,attr){
            // 对象
            this.vm = vm
            // 属性名称
            this.key = key
            // 节点
            this.node = node 
            // 改变文本内容的字符串
            this.attr = attr
        }
        // 执行更新页面数据
        updata(){
            this.node[this.attr] = this.vm[this.key]
        }
    }
    class Que{
        constructor(options){
            this.$options = options
            this.$watchEvent = {}
            if(typeof options['beforeCreate'] == 'function'){
                options['beforeCreate'].bind(this)()
            }
            // create 时能获取到data数据
            this.$data = options.data
            // 数据代理
            this.proxyData()
            // 数据监听
            this.observe()
            if(typeof options['created'] == 'function'){
                options['created'].bind(this)()
            }
            if(typeof options['beforeMount'] == 'function'){
                options['beforeMount'].bind(this)()
            }
            // mounted阶段可以获取到跟元素
            this.$el = document.querySelector(options.el)

            // 模板编译
            this.complie(this.$el)
            if(typeof options['mounted'] == 'function'){
                options['mounted'].bind(this)()
            }
        }
        // 代理函数
        proxyData(){
            ...
        }
        // 数据监听
        observe(){
            for(let key in this.$data){
                let value = this.$data[key]
                let that = this
				// 数据劫持，发现数据更改就同步更新页面数据
                Object.defineProperty(this.$data,key,{
                    get(){
                        return value
                    },
                    set(val){
                        value = val
                        if (that.$watchEvent[key]) {
                            that.$watchEvent[key].forEach((item,index)=>{
                                item.updata()
                            })
                        }
                    }
                })
            }
        }
        // 模板编译
        complie(nodes){
            nodes.childNodes.forEach(item=>{
                if(item.nodeType == 1){
                    // 判断元素是否绑定有 @事件
                    if(item.hasAttribute('@click')){
                        // 获取事件名称
                        let vmEventKey = item.getAttribute('@click')
                        vmEventKey = vmEventKey.trim()
                        item.addEventListener('click',(event)=>{
                            this.eventfn = this.$options.methods[vmEventKey].bind(this)
                            this.eventfn(event)
                        })
                    }

                    // 递归
                    if(item.childNodes.length>0){
                        this.complie(item)
                    }
                }
                // 文本节点
                if(item.nodeType == 3){
                    // 匹配模板正则
                    let reg = /\{\{(.*?)\}\}/g
                    // 原始内容
                    let texts = item.textContent 
                    item.textContent = texts.replace(reg,(match,vmkey)=>{
                        // 去除模板变量的 左右空格
                        vmkey = vmkey.trim()
                        let watch = new Watch(this,vmkey,item,'textContent')
                        if(this.hasOwnProperty(vmkey)){
                            if(this.$watchEvent[vmkey]){
                                this.$watchEvent[vmkey].push(watch)
                            }else{
                                // 第二次清空再push
                                this.$watchEvent[vmkey] = []
                                this.$watchEvent[vmkey].push(watch)
                            }
                        }
                        return this.$data[vmkey]
                    })
                }
            })
        }
    }
    new Que({
        el:"#app",
        data:{
            str:"123",
        },
        methods:{
            btnEvent(){
                this.str = "122223"
            }
        }
    })
</script>
```

#### 6.vue表单数据的响应式

v-model的数据响应式是在编译阶段捕获到 v-model 指令，从而创建了一个input的监听事件，并放置到了事件循环中。当页面输入框的值发生变化，就会更新修改data里面的数据。data的数据改变又触发了模板变量的监听器的updata方法，最后更新页面DOM元素的值。

```js
...
// 模板编译
complie(nodes){
    nodes.childNodes.forEach(item=>{
        if(item.nodeType == 1){
            // 判断元素是否绑定有 @事件
            if(item.hasAttribute('@click')){
                // 获取事件名称
                let vmEventKey = item.getAttribute('@click')
                vmEventKey = vmEventKey.trim()
                item.addEventListener('click',(event)=>{
                    this.eventfn = this.$options.methods[vmEventKey].bind(this)
                    this.eventfn(event)
                })
            }
            // model双向绑定
            if(item.hasAttribute('v-model')){
                // 获取事件名称
                let vmKey = item.getAttribute('v-model')
                vmKey = vmKey.trim()
                // 获取输入的值
                if(this.hasOwnProperty(vmKey)){
                    item.value = this[vmKey]
                }
                // 创建事件监听
                item.addEventListener('input',(event)=>{
                    this[vmKey] = item.value 
                })
            }

            // 递归
            if(item.childNodes.length>0){
                this.complie(item)
            }
            ...
```

**数据响应式**：数据的变化会自动运行数据相关的函数，从而触发页面数据的更新。
