# Nginx

## 代理

```conf
server {
  listen       80;
  server_name  test.com;

  location / {
    proxy_pass http://127.0.0.1:8888;
    proxy_set_header Host $host;
}

server {
  listen       80;
  server_name  a.test.com;

  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
}
```

- proxy_pass 转发的请求
- `$host` 每个请求带过来的 host 就是`$host`，也可以转发
- 用 host 区分我实际想访问哪个服务

## 缓存

```conf
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m;
```

- proxy_cache_path 是缓存的存放地址,cache 是相对路径目录
- 缓存路径，是否要创建二级文件夹
- my_cache 缓存的名字，可以设置大小

```conf
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m;
server {
  listen       80;
  server_name  test.com;
  location / {
    proxy_cache my_cache;
    proxy_pass http://127.0.0.1:8888;
    proxy_set_header Host $host;
  }
}
```

### 跟代理缓存有关的 http 头

- s-maxage 专门给代理缓存用的，如果同时设置了 max-age 和 s-maxage，会优先使用 s-maxage
- max-age 浏览器缓存
- 加 private 时 s-maxage 不会生效
- no-store 所有地方都不缓存
- Vary 头信息一致时缓存，比如中文、英文的场景

```js
// 服务端
response.writeHead(200, {
  'Cache-Control': 'max-age=2, s-maxage=20, private',
  Vary: 'X-Test-Cache',
});

// 客户端
var index = 0;
fetch('/data', {
  headers: {
    'X-Test-Cache': index++,
  },
});
```

## 超时

请求如果超时，ngnix 或重新发起请求
