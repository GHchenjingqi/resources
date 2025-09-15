### nvm管理node版本
安装 

```javascript
npm install nvm
```

查看可用node版本

```html
nvm list available
```

查看已安装node版本 

```javascript
 nvm ls
```

查看当前版本

```html
nvm current
```

切换node版本

```javascript
nvm use 16.15.1
nvm use 18.20.2
```

### Git 配置
全局配置的用户名和邮箱

```javascript
 git config --global user.name
 git config --global user.email
```



设置全局用户名和邮箱

```javascript
 git config --global user.name "Your Name"
 git config --global user.email "email@example.com"
```

### npm/cnpm/yarn
npm/cnpm/yarn 等都是前端安装插件的工具，类似与python的pip 用于执行脚本。

```bash
# 安装
npm install *
cnpm install *
yarn add *

# 更新插件
npm update *

# 卸载
npm uninstall *
cnpm uninstall *
yarn remove *

# 初始化
npm init 
cnpm init
yarn init

# 发布
npm publish 
cnpm publish
yarn publish
```

#### npm 包上传官方仓库
1.注册npm官网

[https://www.npmjs.com](https://www.npmjs.com)

2.初始化项目

```plain
cnpm init  || npm init
```

3.npm登录

```plain
npm login
```

输入：用户名+密码+邮箱

4.上传npm包

```plain
npm publish
```

### 镜像源
查看镜像源

```javascript
npm config get registry
```

切换镜像源

```javascript
npm config set registry=https://registry.npmmirror.com/
```

官方源：[https://registry.npmjs.org/](https://registry.npmjs.org/)

淘宝源：[https://registry.npmmirror.com/](https://registry.npmmirror.com/)

清华源：[https://mirrors.tuna.tsinghua.edu.cn/](https://mirrors.tuna.tsinghua.edu.cn/)

阿里云：[https://npm.aliyun.com/](https://npm.aliyun.com/)

中国科技大学：[https://mirrors.ustc.edu.cn/npm/](https://mirrors.ustc.edu.cn/npm/)



### CMD 命令
```bash
# 进入
cd  [路径]

# 显示计算机信息
systeminfo

# 清屏
cls

# 显示目录文件
dir [路径]

# 新建文件夹
mkdir [文件夹名]

# 删除文件夹
rmdir [文件夹名]

# 删除文件
del [文件名]

# 复制文件
copy [源路径] [目标路径]

# 移动文件或重命名文件/文件夹
move [源路径] [目标路径]

# 开启/关闭命令回显
echo [信息]

# 查看网络信息
ipconfig

# 网速测试
ping [目标IP地址或域名]

# 列出正在运行的任务
tasklist 

# 结束进程
taskkill /PID [进程ID] /F
```



