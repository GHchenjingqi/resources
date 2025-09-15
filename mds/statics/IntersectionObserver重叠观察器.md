<font style="color:rgb(27, 27, 27);">IntersectionObserver 的出现是为了解决页面互相交叉的监听器，在此之前，经常用元素offsetTop去计算，更加消耗性能。IntersectionObserver 目前应用最多的场景就是“懒加载”、“无缝滚动/翻页”、“动画触发”等。</font>

### <font style="color:rgb(27, 27, 27);">用法</font>
```javascript
let callback = (entries, observer) => {
  entries.forEach((entry) => {
    // 每个条目描述一个目标元素观测点的交叉变化：
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};
let options = {
   root: null,
   rootMargin: 0,
   threshold: 0.1
}
let observer = new IntersectionObserver(callback, options);
// 注册挂载观察器
observer.observe(target);

// 页面离开时/销毁时
observer.disconnect()
```

options 参数

+ root  <font style="color:rgb(27, 27, 27);">目标的祖先，用于与目标判断交集。默认值和null指向浏览器视口document。</font>
+ rootMargin 根间距，<font style="color:rgb(27, 27, 27);">用于增大或缩小根元素四周边框。默认值为全零（上、右、下、左），可以为负值。</font>
+ threshold  触发<font style="color:rgb(27, 27, 27);">阈值（0-1），默认值为 0，只要与root相遇就触发；值为1时，目标完全被root包含时触发。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1751941853907-952c996d-e691-43c1-b6a3-7672c9974a38.png)



### 案例
#### 1.懒加载
```javascript
obverimg(){
  const imgs = document.querySelectorAll('[data-src]')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(item => {
      if (item.isIntersecting) {
        item.target.src = item.target.dataset.src 
        observer.unobserve(item.target) // 停止观察当前元素 避免不可见时候再次调用callback函数
      }
    })
  },{
    root: null,
    rootMargin:'0px 0px -500px 0px', // 下方向，向上偏移500
    threshold:0.5
  })
  imgs.forEach(item => {
    observer.observe(item)
  })
}
```

其中，可以通过rootMargin 和threshold调整触发的位置。rootMargin 为负时，可以朝着方向跳转位置。

rootMargin 下值为-500px，效果：

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1751942410666-38622304-bd47-491b-92e8-92201cbe8374.png)

rootMargin 下值为-200px，效果：

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1751942381998-32cde702-40c4-4eb5-9a4b-411ac8c24855.png)



#### 2.瀑布流+懒加载
```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>瀑布流+懒加载</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
    <style>
      #app {
        position: relative;
        width: 100%;
        margin: 0 auto;
      }

      .item {
        position: absolute;
        width: 240px;
        margin-bottom: 20px;
        text-align: center;
        background-color: #f0f0f0;
        transition: all 0.3s ease;
      }

      .item img {
        width: 100%;
        display: block;
        transition: opacity 0.3s;
      }

      .item img[data-src] {
        opacity: 0;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <div class="item" v-for="(item, index) in imgs" :key="index" 
        :data-index="index"
        :style="{ height: item.height ? item.height + 'px' : '150px' }">
        <img :src="item.loaded ? item.url : './loading.gif'" 
          :data-src="item.loaded ? null : item.url" 
          alt=""
          @load="onImageLoad(index, $event)"
          @error="onImageError(index, $event)">
      </div>
    </div>
    <script>
      var app = new Vue({
        el: '#app',
        data: () => {
          return {
            imgs: Array.from({length: 100}, (_, i) => ({
              url: `https://picsum.photos/200/${300 + (i % 5) * 50}?random=${i+1}`,
              height: null,
              loaded: false,
              error: false
            })),
            columnHeights: [],
            itemWidth: 240,
            gap: 20,
            observer: null
          }
        },
        mounted() {
          this.initObserver();
          window.addEventListener('resize', this.debounce(this.layoutItems, 200));
          this.layoutItems(); // 初始布局
        },
        beforeDestroy() {
          if (this.observer) {
            this.observer.disconnect();
          }
          window.removeEventListener('resize', this.debounce(this.layoutItems, 200));
        },
        methods: {
          debounce(func, wait) {
            let timeout;
            return function() {
              const context = this;
              const args = arguments;
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                func.apply(context, args);
              }, wait);
            };
          },
          initObserver() {
            this.observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const img = entry.target;
                  const index = parseInt(img.parentElement.getAttribute('data-index'));
                                
                                // 只处理未加载且未出错的图片
                                if (!this.imgs[index].loaded && !this.imgs[index].error && img.dataset.src) {
                                    // 标记为已加载(即使加载失败也标记，避免重复尝试)
                                    this.$set(this.imgs, index, {
                                        ...this.imgs[index],
                                        loaded: true
                                    });
                                    
                                    // 更新src触发加载
                                    img.src = img.dataset.src;
                                    img.removeAttribute('data-src');
                                    
                                    // 从观察者中移除
                                    this.observer.unobserve(img);
                                }
                            }
                        });
                    }, {
                        root: null,
                        rootMargin: '0px 0px 200px 0px', // 提前200px加载
                        threshold: 0.5
                    });

                    // 初始观察所有图片
                    this.$nextTick(() => {
                        document.querySelectorAll('.item img[data-src]').forEach(img => {
                            this.observer.observe(img);
                        });
                    });
                },
                onImageLoad(index, event) {
                    const img = event.target;
                    // 计算等比例缩放后的高度
                    const displayWidth = this.itemWidth;
                    const naturalWidth = img.naturalWidth || displayWidth;
                    const naturalHeight = img.naturalHeight || naturalWidth;
                    const height = (naturalHeight / naturalWidth) * displayWidth;
                    
                    // 更新图片高度
                    this.$set(this.imgs, index, {
                        ...this.imgs[index],
                        height: height,
                        error: false
                    });
                    
                    // 淡入效果
                    img.style.opacity = 1;
                    
                    // 延迟布局以避免频繁重排
                    setTimeout(() => {
                        this.layoutItems();
                    }, 50);
                },
                onImageError(index, event) {
                    // 标记为加载错误，避免重复尝试
                    this.$set(this.imgs, index, {
                        ...this.imgs[index],
                        error: true,
                        height: 150 // 保持默认高度
                    });
                },
                layoutItems() {
                    const container = document.getElementById('app');
                    const containerWidth = container.clientWidth;
                    const columns = Math.floor(containerWidth / (this.itemWidth + this.gap));
                    if (columns <= 0) return;
                    
                    this.columnHeights = new Array(columns).fill(0);
                    
                    const items = document.querySelectorAll('.item');
                    items.forEach((item, index) => {
                        if (index >= this.imgs.length) return;
                        
                        const imgData = this.imgs[index];
                        const itemHeight = imgData.height || 150;
                        
                        const minHeight = Math.min(...this.columnHeights);
                        const columnIndex = this.columnHeights.indexOf(minHeight);
                        
                        const left = columnIndex * (this.itemWidth + this.gap);
                        const top = minHeight;
                        
                        item.style.left = `${left}px`;
                        item.style.top = `${top}px`;
                        item.style.width = `${this.itemWidth}px`;
                        
                        this.columnHeights[columnIndex] = top + itemHeight + this.gap;
                    });
                    
                    container.style.height = `${Math.max(...this.columnHeights)}px`;
                }
            }
        });
    </script>
</body>

</html>
```

