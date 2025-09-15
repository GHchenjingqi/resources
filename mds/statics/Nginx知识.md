### 1.Nginx是什么？
Nginx是一个轻量级/高性能的反向代理web服务器。可以实现反向代理、负载均衡及高并发（2-3万，官方检测支持5万）连接请求。



### 2.为什么要用nginx？
+ 跨平台
+ 使用简单
+ 支持反向代理
+ 稳定性搞：高并发链接
+ 消耗内存小
+ 支持GZIP压缩
+ 支持开启浏览器缓存

### 3.为什么Nginx的性能高？
事件处理机制：**<font style="color:#DF2A3F;">异步非阻塞 </font>**，提供了一个队列，排队解决。

### 4.Nginx基本配置都有哪些属性？
文件位置：nginx-1.24.0\conf\nginx.conf

```nginx
# 运行Nginx的用户和组
user nginx;

# 工作进程数，通常设置为CPU核心数或auto自动检测
worker_processes auto;

# 错误日志路径和级别
error_log /var/log/nginx/error.log warn;

# 主进程ID存储位置
pid /var/run/nginx.pid;

# 事件模块配置
events {
    # 每个工作进程的最大连接数
    worker_connections 1024;
    
    # 使用高效的事件模型(Linux下推荐epoll)
    use epoll;
    
    # 允许同时接受多个新连接
    multi_accept on;
}

# HTTP模块配置
http {
    # 包含MIME类型定义文件
    include /etc/nginx/mime.types;
    
    # 默认MIME类型
    default_type application/octet-stream;
    
    # 日志格式定义
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                   '$status $body_bytes_sent "$http_referer" '
                   '"$http_user_agent" "$http_x_forwarded_for"';
    
    # 访问日志路径和格式
    access_log /var/log/nginx/access.log main;
    
    # 启用高效文件传输
    sendfile on;
    
    # 优化数据包发送，减少网络报文数量
    tcp_nopush on;
    
    # 禁用Nagle算法，提高响应速度
    tcp_nodelay on;
    
    # 客户端连接保持时间
    keepalive_timeout 65;
    
    # 启用Gzip压缩
    gzip on;
    gzip_vary on;
    
    # 设置用于压缩响应的最小长度
    gzip_min_length 1024;
    
    # 指定哪些MIME类型需要压缩
    gzip_types text/plain text/css text/xml text/javascript 
               application/javascript application/xml+rss application/json;
    
    # 服务器配置
    server {
        # 监听端口
        listen 80;
        
        # 服务器域名
        server_name example.com www.example.com;
        
        # 根目录设置
        root /usr/share/nginx/html;
        
        # 默认索引文件
        index index.html index.htm;
        
        # 静态文件缓存设置
        location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
            expires 7d;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 5.什么是正向代理？
正向代理就是客户端和目标服务器之间的中间服务器。它**<font style="color:#601BDE;">代表客户端</font>**去访问目标服务器，并将结果返回给客户端。

举例：“**<font style="color:#DF2A3F;">我在郑州想喝胖东来啤酒，通过代购去买，代购买完寄给我”</font>**

+ 我是客户端
+ 代购是正向代理
+ 胖东来是目标服务器

在正向代理的过程中，目标服务器不知道客户端是谁！保护了客户端。

**应用场景：**

+ 突破ip限制-翻墙
+ 隐藏客户端ip
+ 加速访问

### 6.什么事反向代理？
反向代理也是位于客户端和目标服务器之间，但**<font style="color:#2F4BDA;">反向代理代理的是目标服务器</font>**，用户不知道真实的服务器地址。

举例：“我从1688/拼多多进货，然后摆地摊，路过的人买了我的商品”。

+ 路过的人是客户端
+ 我是反向代理
+ 1688是目标服务器

在反向代理过程中，客户端不知道目标服务器！保护了目标服务器。

**应用场景：**

+ 负载均衡-分发多台服务器
+ 隐藏真实ip
+ 动静分离，反向代理处理静态资源

### 7.正向代理和反向代理的区别？
| <font style="color:#2c2c36;">对比项</font> | <font style="color:#2c2c36;">反向代理（Reverse Proxy）</font> | <font style="color:#2c2c36;">正向代理（Forward Proxy）</font> |
| --- | --- | --- |
| <font style="color:#2c2c36;">位置</font> | <font style="color:#2c2c36;">靠近</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">服务器端</font> | <font style="color:#2c2c36;">靠近</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">客户端</font> |
| <font style="color:#2c2c36;">谁配置</font> | <font style="color:#2c2c36;">由</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">服务端管理员</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">配置</font> | <font style="color:#2c2c36;">由</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">客户端用户</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">配置</font> |
| <font style="color:#2c2c36;">目的</font> | <font style="color:#2c2c36;">保护后端、负载均衡、统一入口</font> | <font style="color:#2c2c36;">保护客户端、访问控制、突破限制</font> |
| <font style="color:#2c2c36;">谁可见</font> | <font style="color:#2c2c36;">客户端</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">看不到真实服务器</font> | <font style="color:#2c2c36;">服务器</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">看不到真实客户端</font> |
| <font style="color:#2c2c36;">典型场景</font> | <font style="color:#2c2c36;">Nginx 转发请求给 Node.js</font> | <font style="color:#2c2c36;">公司上网代理、翻墙工具</font> |


### 8.<font style="color:rgb(37, 41, 51);">负载均衡有哪些算法？</font>
+ 轮询（默认）

```nginx
upstream backserver { 
  server 192.168.0.14; 
  server 192.168.0.15; 
} 
```

+ 指定权重

```nginx
upstream backserver { 
  server 192.168.0.14 weight=8; 
  server 192.168.0.15 weight=10; 
} 
```

+ ip绑定hash

```nginx
upstream backserver { 
  ip_hash; 
  server 192.168.0.14:88; 
  server 192.168.0.15:80; 
} 
```

+ fair(第三方模块） 根据页面大小和加载市场智能金乡负载均衡。

```nginx
upstream backserver { 
   server server1; 
   server server2; 
   fair; 
} 
```

### 9.Nginx为什么要做动静分离？如何做？
为什么：动静分离将不经常改变的资源分离出来，交于Nginx反向代理处理并进行缓存(nginx处理静态资源能力强），从而可以极大程度上减轻服务器压力，提高项目加载速度，而动态部分再转发给后端服务器，从而实现动静分离。

```nginx
location /image/ {
     root   /usr/local/static/;
     autoindex on;
}
```

### 10.如何用：常见代理配置
#### a.Nginx如何配置反向代理？
```nginx
server {
    listen 80;
    server_name api.example.com;
    
    # 反向代理到后端应用
    location / {
        # 后端服务器地址
        proxy_pass http://localhost:3000;
        
        # 传递原始主机头
        proxy_set_header Host $host;
        
        # 传递客户端真实IP
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # 传递原始协议
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 连接超时时间
        proxy_connect_timeout 30s;
        
        # 发送请求超时时间
        proxy_send_timeout 30s;
        
        # 接收响应超时时间
        proxy_read_timeout 30s;
        
        # 启用缓冲
        proxy_buffering on;
        
        # 设置缓冲区大小
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }
}
```

#### b.Nginx如何配置正向代理？
```nginx
server {
  listen 8080;  # 监听端口，可以根据需求修改
  resolver 8.8.8.8;  # DNS 解析服务器，这里使用 Google 的公共 DNS

  location / {
    # 如果请求头中有 "Host" 字段，则使用它作为目标主机
    if ($http_host = "") {
      return 400;  # 如果没有 Host 头，则返回 400 错误
    }

    # 将请求转发到目标服务器
    proxy_pass http://$http_host$request_uri;

    # 传递原始请求信息
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

#### c.Nginx如何配置负载均衡？
```nginx
# 上游服务器定义(负载均衡后端服务器组)
upstream backend {
    # 负载均衡算法(默认轮询)
    # least_conn;      # 最少连接数
    # ip_hash;         # IP哈希(会话保持)
    
    # 服务器定义
    server 192.168.1.10:8080 weight=3;  # 权重为3
    server 192.168.1.11:8080 weight=2;  # 权重为2
    server 192.168.1.12:8080 weight=1;  # 权重为1
    server 192.168.1.13:8080 backup;    # 备份服务器
    
    # 保持连接数
    keepalive 32;
}

# 负载均衡服务器配置
server {
    listen 80;
    server_name loadbalancer.example.com;
    
    location / {
        # 代理到上游服务器组
        proxy_pass http://backend;
        
        # 设置代理头
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 健康检查相关
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_next_upstream_tries 3;
        proxy_next_upstream_timeout 30s;
        
        # 连接超时设置
        proxy_connect_timeout 2s;
        proxy_send_timeout 5s;
        proxy_read_timeout 5s;
    }
}
```

#### d.Nginx如何解决跨域？
```nginx
server {
    listen 80;
    server_name api.example.com;
    
    # API接口跨域配置
    location /api/ {
        # 处理预检请求(OPTIONS)
        if ($request_method = 'OPTIONS') {
            # 允许的源域名
            add_header 'Access-Control-Allow-Origin' '*';
            
            # 允许的请求方法
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
            
            # 允许的请求头
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
            
            # 预检请求缓存时间
            add_header 'Access-Control-Max-Age' 1728000;
            
            # 返回内容类型
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            
            # 返回内容长度
            add_header 'Content-Length' 0;
            
            # 返回204状态码(无内容)
            return 204;
        }
        
        # 正式请求的跨域头
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
        
        # 允许客户端访问的响应头
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
        #...
    }
}
```

#### e.Nginx如何配置<font style="color:rgb(64, 64, 64);">SSL证书？</font>
```nginx
server {
    # 监听443端口，启用SSL和HTTP/2
    listen 443 ssl http2;
    server_name example.com www.example.com;
    
    # SSL证书路径
    ssl_certificate /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;
    
    # SSL会话缓存设置
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # 安全协议和密码套件
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # HSTS头(强制HTTPS)
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    # 其他安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # 网站根目录
    root /usr/share/nginx/html;
    index index.html index.htm;
    
    # 其他配置...
}

# HTTP重定向到HTTPS
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}
```

#### f.Nginx如何配置伪静态？
如下：wp设置伪静态

```nginx
server {
  listen 80;
  server_name domain.com; # 替换成你的域名

  root /var/www/html; # 替换成你的 WordPress 安装目录
  index index.html index.php;
  location / {
    try_files $uri $uri/ /index.php?$args;
  }
}
```

### <font style="color:rgb(37, 41, 51);">location的匹配规则</font>
多个location时，会安装优先级处理请求。

+ =  		精确匹配  优先级1000
+ ~ 或 ~* 	正则匹配  优先级100
+ ^~ 		前缀匹配  优先级10
+ /路径	普通匹配  优先级1

### Nginx的内置全局变量-附录
| <font style="color:#2c2c36;">变量名</font> | <font style="color:#2c2c36;">含义说明</font> | <font style="color:#2c2c36;">示例值</font> |
| --- | --- | --- |
| <font style="color:#2c2c36;">$uri</font> | <font style="color:#2c2c36;">请求的 URI（解码后），不包含参数</font> | <font style="color:#2c2c36;">/index.html</font> |
| <font style="color:#2c2c36;">$request_uri</font> | <font style="color:#2c2c36;">完整的原始请求 URI，包含参数，</font><font style="color:#2c2c36;">不被内部重定向修改</font> | <font style="color:#2c2c36;">/index.html?name=张三</font> |
| <font style="color:#2c2c36;">$args</font> | <font style="color:#2c2c36;">请求的查询参数（即 URL 中</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">?</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">后面的部分）</font> | <font style="color:#2c2c36;">name=张三&age=25</font> |
| <font style="color:#2c2c36;">$query_string</font> | <font style="color:#2c2c36;">同</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">$args</font><font style="color:#2c2c36;">，只是别名</font> | <font style="color:#2c2c36;">name=张三&age=25</font> |
| <font style="color:#2c2c36;">$host</font> | <font style="color:#2c2c36;">请求头中的</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">Host</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">字段，优先级：</font><font style="color:#2c2c36;">Host</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">请求头 →</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">server_name</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">→ 请求行中的主机名</font> | <font style="color:#2c2c36;">www.example.com</font> |
| <font style="color:#2c2c36;">$http_host</font> | <font style="color:#2c2c36;">明确来自请求头的</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">Host</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">值，可能包含端口</font> | <font style="color:#2c2c36;">www.example.com:8080</font> |
| <font style="color:#2c2c36;">$server_name</font> | <font style="color:#2c2c36;">当前虚拟主机（server block）的</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">server_name</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">配置值</font> | <font style="color:#2c2c36;">www.example.com</font> |
| <font style="color:#2c2c36;">$remote_addr</font> | <font style="color:#2c2c36;">客户端的真实 IP 地址</font> | <font style="color:#2c2c36;">192.168.1.100</font> |
| <font style="color:#2c2c36;">$realip_remote_addr</font> | <font style="color:#2c2c36;">当使用</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">real_ip</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">模块时，表示真实客户端 IP（如通过 CDN 或负载均衡后）</font> | <font style="color:#2c2c36;">203.0.113.45</font> |
| <font style="color:#2c2c36;">$remote_port</font> | <font style="color:#2c2c36;">客户端使用的端口号</font> | <font style="color:#2c2c36;">54321</font> |
| <font style="color:#2c2c36;">$server_addr</font> | <font style="color:#2c2c36;">服务器监听的地址（通常为内网 IP）</font> | <font style="color:#2c2c36;">10.0.0.1</font> |
| <font style="color:#2c2c36;">$server_port</font> | <font style="color:#2c2c36;">服务器监听的端口</font> | <font style="color:#2c2c36;">80</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">或</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">443</font> |
| <font style="color:#2c2c36;">$server_protocol</font> | <font style="color:#2c2c36;">请求使用的协议版本</font> | <font style="color:#2c2c36;">HTTP/1.1</font> |
| <font style="color:#2c2c36;">$request_method</font> | <font style="color:#2c2c36;">客户端请求方法</font> | <font style="color:#2c2c36;">GET</font><font style="color:#2c2c36;">、</font><font style="color:#2c2c36;">POST</font><font style="color:#2c2c36;">、</font><font style="color:#2c2c36;">PUT</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">等</font> |
| <font style="color:#2c2c36;">$request_filename</font> | <font style="color:#2c2c36;">映射到磁盘的真实文件路径</font> | <font style="color:#2c2c36;">/usr/share/nginx/html/index.html</font> |
| <font style="color:#2c2c36;">$document_root</font> | <font style="color:#2c2c36;">当前请求对应的 root 目录路径</font> | <font style="color:#2c2c36;">/usr/share/nginx/html</font> |
| <font style="color:#2c2c36;">$request_body</font> | <font style="color:#2c2c36;">请求体内容（常用于 POST 请求），需在</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">location</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">中启用</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">client_body_buffer_size</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">等</font> | <font style="color:#2c2c36;">{"name":"张三"}</font> |
| <font style="color:#2c2c36;">$request_body_file</font> | <font style="color:#2c2c36;">如果启用了</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">client_body_in_file_only</font><font style="color:#2c2c36;">，则请求体保存的临时文件路径</font> | <font style="color:#2c2c36;">/tmp/nginx-body.1234</font> |
| <font style="color:#2c2c36;">$scheme</font> | <font style="color:#2c2c36;">当前请求的协议类型</font> | <font style="color:#2c2c36;">http</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">或</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">https</font> |
| <font style="color:#2c2c36;">$ssl_protocol</font> | <font style="color:#2c2c36;">使用的 SSL/TLS 协议版本（仅 HTTPS）</font> | <font style="color:#2c2c36;">TLSv1.2</font> |
| <font style="color:#2c2c36;">$ssl_cipher</font> | <font style="color:#2c2c36;">使用的加密套件</font> | <font style="color:#2c2c36;">ECDHE-RSA-AES128-GCM-SHA256</font> |
| <font style="color:#2c2c36;">$http_user_agent</font> | <font style="color:#2c2c36;">客户端浏览器/客户端标识</font> | <font style="color:#2c2c36;">Mozilla/5.0 (...) Chrome/120.0</font> |
| <font style="color:#2c2c36;">$http_referer</font> | <font style="color:#2c2c36;">上一级页面的 URL（Referer 头）</font> | <font style="color:#2c2c36;">https://www.google.com/</font> |
| <font style="color:#2c2c36;">$http_x_forwarded_for</font> | <font style="color:#2c2c36;">通常用于记录经过的代理 IP 链</font> | <font style="color:#2c2c36;">192.168.1.100, 10.0.0.1</font> |
| <font style="color:#2c2c36;">$http_cookie</font> | <font style="color:#2c2c36;">请求中的 Cookie 信息</font> | <font style="color:#2c2c36;">sessionid=abc123; lang=zh</font> |
| <font style="color:#2c2c36;">$sent_http_content_type</font> | <font style="color:#2c2c36;">响应头中的</font><font style="color:#2c2c36;"> </font><font style="color:#2c2c36;">Content-Type</font> | <font style="color:#2c2c36;">text/html; charset=utf-8</font> |
| <font style="color:#2c2c36;">$status</font> | <font style="color:#2c2c36;">响应状态码</font> | <font style="color:#2c2c36;">200</font><font style="color:#2c2c36;">、</font><font style="color:#2c2c36;">404</font><font style="color:#2c2c36;">、</font><font style="color:#2c2c36;">500</font> |
| <font style="color:#2c2c36;">$body_bytes_sent</font> | <font style="color:#2c2c36;">发送给客户端的响应体字节数（不含响应头）</font> | <font style="color:#2c2c36;">1234</font> |
| <font style="color:#2c2c36;">$bytes_sent</font> | <font style="color:#2c2c36;">发送给客户端的总字节数（含响应头和响应体）</font> | <font style="color:#2c2c36;">1300</font> |
| <font style="color:#2c2c36;">$connection</font> | <font style="color:#2c2c36;">TCP 连接的序列号</font> | <font style="color:#2c2c36;">12345</font> |
| <font style="color:#2c2c36;">$connection_requests</font> | <font style="color:#2c2c36;">当前连接上已处理的请求数</font> | <font style="color:#2c2c36;">5</font> |
| <font style="color:#2c2c36;">$msec</font> | <font style="color:#2c2c36;">当前时间（Unix 时间戳，精确到毫秒）</font> | <font style="color:#2c2c36;">1719283746</font> |
| <font style="color:#2c2c36;">$time_iso8601</font> | <font style="color:#2c2c36;">ISO 8601 格式的时间</font> | <font style="color:#2c2c36;">2025-06-25T10:30:45+08:00</font> |
| <font style="color:#2c2c36;">$time_local</font> | <font style="color:#2c2c36;">本地格式化时间（日志常用）</font> | <font style="color:#2c2c36;">25/Jun/2025:10:30:45 +0800</font> |
| <font style="color:#2c2c36;">$request_time</font> | <font style="color:#2c2c36;">请求处理时间（秒，精确到毫秒）</font> | <font style="color:#2c2c36;">0.002</font> |
| <font style="color:#2c2c36;">$upstream_response_time</font> | <font style="color:#2c2c36;">后端服务器响应时间（多个时用逗号分隔）</font> | <font style="color:#2c2c36;">0.001</font> |
| <font style="color:#2c2c36;">$upstream_status</font> | <font style="color:#2c2c36;">后端返回的状态码</font> | <font style="color:#2c2c36;">200</font> |






