onlyoffice是前后端配合才能实现的在线word/pdf/xls编辑预览的插件库。官方地址：[https://api.onlyoffice.com/](https://api.onlyoffice.com/)



下面是我在项目中开发的2个插件，左右各一个。左边信息补录和交互，右边插件展示相关视频和图片。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1751509951881-be9459f6-3bcd-4122-8a07-3967e885c033.png)



后端部分这里不再啰嗦，一般都是java + docker部署镜像，服务器起一个API服务供前端调用。下面分享一下我在vue2项目里面的使用onlyoffice + 开发插件的经验。

### 1.前端vue项目
我没有通过npm安装依赖的方式使用，而是使用了动态创建script的方式。如果项目白屏，那就是api接口异常，让后端检测镜像服务是否正常启动。

```javascript
async loadScript() {
  return new Promise((resolve) => {
    // 创建 script 元素
    var script = document.createElement('script');
    // 后端镜像api服务，用于加载onlyoffice框架
    script.src = window.AppConfig.onlyofficeApi + 'web-apps/apps/api/documents/api.js';
    document.head.appendChild(script);
    script.onload = function () {
      console.log('脚本加载完成');
    };
    script.onerror = function () {
      console.error('脚本加载失败');
    };
  });
},
```

加载onlyoffice代码：

```javascript
documentReady() {
  const curIP = window.location.protocol + "//" + window.location.host + "/";
  let that = this
  const API = window.AppConfig.api
  const docKey = "IllegalNotify_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
  let token = localStorage.getItem('Authorization')
  if (!that.caseNo || !token) return
  const docurl = `${API}fxzc/case/folder/getDossier?caseId=${that.caseNo}&fileType=DOCUMENT&Authorization=${token}`
  that.docEditor = new DocsAPI.DocEditor("placeholder", {
    document: {
      // 文件类型
      fileType: "docx",
      key: docKey,
      title: '案件文书',
      // 文件地址
      url: docurl,
      // 允许评论，下载，编辑
      permissions: {
        comment: true,
        download: true,
        edit: true
      }
    },
    documentType: "text",
    editorConfig: {
      // 编辑模式
      mode: "edit",
      lang: "zh-CN",
      // 右上角用户信息
      user: {
        name: that.realname,
        image: that.avatar
      },
      // 保存时回调接口
      callbackUrl: `${API}fxzc/case/folder/callback?caseId=${that.caseNo}&fileType=DOCUMENT&Authorization=${token}`,
      plugins: {
        // 自动打开插件
        allowExternalUrls: true,
        // 自动加载插件的id
        autostart: ['asc.{juanzhongzushou01asd}', 'asc.{juanzhongzushou01bsd}'],
      },
      // 自定义
      customization: {
        // 默认字体
        font: {
          name: "微软雅黑",
          size: "14px"
        },
        notification: true,
        // 主题样式
        uiTheme: "theme-gray",
        zoom: -2,
        // 不显示帮助，关于，macros
        help: false,
        about: false,
        macros: false,
        compactHeader: true,
        toolbarHideFileName: true,
        references: false,
        // 强制保存开启
        forcesave: true,
        anonymous: {
          request: true
        },
        // 自动保存
        autosave: true
      }
    }
  });
  // 示例：传递用户名和操作类型
  window.addEventListener('message', (e) => {
    // console.log("接收到的消息：", e.data);
    if (e.data) {
      if (typeof e.data === "string") {
        const resMessage = JSON.parse(e.data);
        const { event, data } = resMessage;
        let params = {
          "caseNo": that.caseNo,
          "token": token,
          "Api": API,
          "curIP": curIP,
        }
        if (event == 'onInfo') {
          if (resMessage.data && resMessage.data.event == "plugininitisokAsd") {
            setTimeout(() => {
              // 父页面给onlyoffice插件传参数
              that.docEditor.serviceCommand("ASC_Params", params)
            }, 10);
          }
          // 父接收子插件传递的参数，并在页面加载图片
          if (resMessage.data && resMessage.data.event == "previewImage") {
            const url = resMessage.data.imgSrc
            Zoomtastic.show(url);
          }                 
        }
      }
    }
  }, false);
}
```

#### 父页面传参
如果插件内需要与后端交互，最好把token和api地址传递进去。

```javascript
docEditor.serviceCommand("ASC_Params", params)
```

#### 父页面接参
子插件会通过postmessage向父页面传递自定义信息，我们在event值为"onInfo"时接收参数。

```javascript
 window.addEventListener('message', (e) => {
      if (e.data) {
        if (event == 'onInfo') {
           // 插件内自定义的参数类型 resMessage.data.event == "previewImage"
        }
      }
 }
```

### 2.子插件开发
官方插件开发有2种模式，一种基于sdk的形式，最后打包成插件；还有一种直接用html开发。

官方插件：[https://api.onlyoffice.com/samples/docs/plugin-and-macros/plugin-samples/](https://api.onlyoffice.com/samples/docs/plugin-and-macros/plugin-samples/)

无论那种开发方式，最终输出都是下面的目录结构：

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1751509633743-8a3e7ad1-a961-4842-bc8e-4b667f54aeca.png)

插件目录最少包含：

+ scripts/main.js  脚本执行文件
+ config.json  插件配置文件，配置插件名称、版本、guid等
+ index.html 插件入口文件，最终插件布局，传统html+js+css实现布局即可。

有的还会多出 resources （存放icon图标或静态资源）和 translations（多语言）目录。



#### 插件配置
包含 name - 插件名称 /guid - 唯一id /baseUrl/variations

```json
{
  "name": "案件信息",
  "guid": "asc.{abcdefghijk}",
  "baseUrl": "",
  "variations": [
    {
      "description": "卷宗管理组手",
      "url": "index.html",
      "icons": [
        "resources/img/icon.png",
        "resources/img/icon@2x.png"
      ],
      "EditorsSupport": [
        "word"
      ],
      "isViewer": true,
      "isVisual": true,
      "isModal": false,
      "isInsideMode": true,
      "initDataType": "js",
      "initData": "",
      "isUpdateOleOnResize": true,
      "buttons": [],
      "events": [
        "onClick",
        "onInternalCommand"
      ]
    }
  ]
}
```

events 一点要加入子插件需要交互的类型，例如：onClick点击事件，**onInternalCommand**插件接收信息。

#### 插件事件
插件初始化-init，建议所有的事件都在初始化函数内开发实现。

```javascript
window.Asc.plugin.init = async function (initData) {
  // 你的功能代码
}
```

插件接收父页面参数

```javascript
window.parent.Common.Gateway.on('internalcommand', ({ command, data }) => {
    if (command === 'ASC_Params') {
      // 处理传递参数信息
      
    }
})
```

插件向外发消息，自定义event类型：previewImage。

```javascript
window.parent.Common.Gateway.sendInfo({ event: 'previewImage', imgSrc:  element.src });
```

插件向文档光标处插入段落

```javascript
window.Asc.plugin.callCommand(() => {
  const oDocument = Api.GetDocument();
  const oParagraph = Api.CreateParagraph();
  oParagraph.AddText("段落内容~");
  oDocument.InsertContent([oParagraph], true);
}, false);
```

 插件向文档光标处插入文本

```javascript
Asc.plugin.executeMethod("InputText", ['文本内容~'])
```

使用以上api就已经够开发一个纯功能型的插件了，更多复杂的交互需要查看官方文档了。

