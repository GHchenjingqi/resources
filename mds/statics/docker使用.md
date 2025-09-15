### 一.<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">Docker 核心组件</font>
#### 1.<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">Images (镜像)</font>
<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">只读模板，包含创建容器所需的所有文件和配置。</font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">通过 </font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">Dockerfile </font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">构建或从仓库拉取。</font>

<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">常用命令：</font>

```basic
docker build -t my-image .  # 构建镜像
docker images              # 列出本地镜像
docker pull nginx          # 从仓库拉取镜像
docker rmi my-image        # 删除镜像
```

#### 2.<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">Containers (容器)</font>
<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">镜像的运行实例，包含应用程序及其所有依赖项。容器之间相互隔离。</font>

<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">常用命令：</font>

```basic
docker run -d -p 80:80 my-image  # 运行容器
docker ps                       # 查看运行中的容器
docker stop container-id        # 停止容器
docker rm container-id          # 删除容器
docker exec -it container-id sh # 进入容器
```

#### 3.<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">Volumes (卷)</font>
<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">解决容器内数据持久化问题，</font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">可以在容器间共享。</font>

<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">常用命令：</font>

```basic
docker volume create my-vol     # 创建卷
docker run -v my-vol:/app/data # 挂载卷
docker volume ls               # 列出卷
docker volume inspect my-vol   # 检查卷详情
```

#### 4.Networks (网络)
<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">容器间通信的机制：默认有 bridge、host、none 三种网络模式。</font>

<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">常用命令：</font>

```basic
docker network create my-net    # 创建网络
docker run --network=my-net    # 使用指定网络
docker network ls              # 列出网络
docker network inspect my-net  # 检查网络详情
```

#### 5.<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">Dockerfile (构建文件)</font>
<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">定义如何构建 Docker 镜像的文本文件。</font>

<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">常见指令：</font>

```basic
FROM node:16         # 基础镜像
WORKDIR /app         # 工作目录
COPY . .             # 复制文件
RUN npm install      # 执行命令
EXPOSE 3000          # 暴露端口
CMD ["npm", "start"] # 启动命令
```

#### 6.<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">Docker Compose (编排)</font>
<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">用于定义和运行多容器 Docker 应用程序的工具。</font>

<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">示例：</font>

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

<font style="color:rgba(0, 0, 0, 0.9);">各组件关系图解:</font>

```yaml
Dockerfile → (构建) → Image → (实例化) → Container
                     ↑
Registry (Docker Hub/私有仓库)
```

### 二.window镜像源设置
![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1750037751966-7e8fc30d-6039-433c-b12f-9bb85818bbe6.png)

打开docker桌面应用，点击设置，替换registry-mirrors

```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://2a6bf1988cb6428c877f723ec7530dbc.mirror.swr.myhuaweicloud.com",
    "https://docker.m.daocloud.io",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://your_preferred_mirror",
    "https://dockerhub.icu",
    "https://docker.registry.cyou",
    "https://docker-cf.registry.cyou",
    "https://dockercf.jsdelivr.fyi",
    "https://docker.jsdelivr.fyi",
    "https://dockertest.jsdelivr.fyi",
    "https://mirror.aliyuncs.com",
    "https://dockerproxy.com",
    "https://mirror.baidubce.com",
    "https://docker.m.daocloud.io",
    "https://docker.nju.edu.cn",
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://docker.mirrors.ustc.edu.cn",
    "https://mirror.iscas.ac.cn",
    "https://docker.rainbond.cc"
  ]
}
```

### 三.常用命令
```bash
# docker步骤
dockerfile 	定制镜像文件
docker build 	构建镜像
docker run	运行镜像，得到一个容器进程（container）

# 容器
docker run *    启动（容器）服务进程 - * 进程id或进程name
docker stop *  停止服务进程 - * 进程id或进程name
docker start *  再次启用服务进程 - * 进程id或进程name
docker ps        查看正在运行的进行
docker ps -a    查看容器所有的服务（包括未启动的）	
docker rm *     删除容器 - * 进程id或进程name(需要先暂停服务）


# 镜像（dockerhub网站）
docker pull  author/仓库名	     拉去镜像到本地
docker push *		     上传镜像到dockerhub
docker commit  进程id  name        将容器进程保存成镜像
docker image ls                             查看本地所有镜像
docker rmi  *                                 删除镜像
	

# docker volume   		 数据存存储到指定位置，避免数据污染

# 启动多个容器
docker-compose up
docker-compose down
```

### 四.前端构建/运行docker镜像
下面案例以Vite创建的单页面应用为例。

#### 1.<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">创建Dockerfile</font>
在项目根目录创建 `Dockerfile` 文件(无扩展名)，用于编写构建命令，内容如下：

```dockerfile
# 使用官方Node镜像作为构建环境
# 使用 Node 18
FROM node:18-alpine as builder 
# 添加这些行安装必要的依赖
RUN apk add --no-cache openssl 

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 使用Nginx作为生产服务器
FROM nginx:alpine

# 从构建阶段复制构建好的文件到Nginx目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### 2.创建忽略文件.dockerignore
在项目根目录创建 `.dockerignore` 文件-可选，避免复制不必要的文件

```plain
node_modules
.git
.DS_Store
dist
```

#### 3.<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">构建Docker镜像</font>
```basic
# -t my-spa-app 给镜像命名
# . 表示使用当前目录的Dockerfile
docker build -t my-spa-app .
```

执行完之后，如下：

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1750041291950-8a2419a0-8573-436b-9214-51da48e94a3c.png)

打开docker应用 —— 在Builds下就可看到我们构建的镜像了。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1750041539627-755fa5b1-bba3-4cb1-a75d-d3759e6ec792.png)

#### 4.<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">运行Docker容器</font>
```basic
docker run -d -p 8080:80 --name my-spa-container my-spa-app
```

+ <font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">-d </font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">后台运行</font>
+ <font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">-p 8080:80 </font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">将主机的8080端口映射到容器的80端口</font>
+ <font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">--name </font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">给容器命名</font>
+ <font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">my-spa-app </font><font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">使用的镜像名称</font>

<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">然后就可以在containers里看到我们的服务了。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1750043541987-ba1500d8-d81f-4ccf-a598-1f99b4bd6e89.png)



当然上面的步骤仅在本地构建和运行docker镜像。下面是发布到 <font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">Docker Hub 方式。</font>

### <font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">五.发布到Docker Hub</font>
#### 1.<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">注册 Docker Hub 账号</font>
前往 [hub.docker.com](https://hub.docker.com) 注册（如果还没有账号）

#### 2.登录 Docker Hub
```basic
# 本地终端登录
docker login
```

#### 3.**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">给镜像打标签</font>**
```basic
# docker tag my-spa-app 你的用户名/my-spa-app:版本号
# 例如
docker tag my-spa-app zhangsan/my-spa-app:v1.0
```

#### 4.**推送镜像到 Docker Hub**
```plain
# docker push 你的用户名/my-spa-app:版本号
# 例如
docker push zhangsan/my-spa-app:v1.0
```

#### 5.新服务器拉去镜像
```plain
# docker pull 你的用户名/my-spa-app:版本号
# docker run -d -p 80:80 --name spa-app 你的用户名/my-spa-app:版本号
# 例如
docker pull zhangsan/my-spa-app:v1.0
docker run -d -p 80:80 --name spa-app zhangsan/my-spa-app:v1.0
```



