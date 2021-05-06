## CORS(Cross Origin Resource Sharing)跨域资源共享

CORS 请求分成简单请求和非简单请求两类。

满足下面两个条件为简单请求

1. method 为 HEAD、GET、POST 之一
2. HEADER 不超出下面字段
   - Accept
   - Accept-Language
   - Content-Language
   - Last-Event-ID
   - Content-type: 只限 application/x-www-form-urlencoded、multipart/form-data、text/plain

### CORS 相关响应头(Access-Control-开头)

1. Access-Control-Allow-Origin
   值为 Origin 的值/\*
2. Access-Control-Allow-Credentials\<boolean>
   表示是否允许发送 Cookie
3. Access-Control-Expose-Headers（可选）
   用于指定 XMLHttpRequest 对象的 getResponseHeader()方法可以拿到的除了 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 外的字段。

### withCredentials 属性

CORS 发送 Cookies 除了需要服务器设置 Access-Control-Allow-Credentials 外，还需打开 XHR 的 withCredentials 属性
示例

```js
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

P.S. 当需要发送 cookie 时，Access-Control-Allow-Origin 只能为明确的，与请求页面一致的域名。

### 预检请求

非简单请求时，会在正式通信前，增加一次 HTTP 查询请求（preflight）

浏览器先询问服务器，当前网页域名是否许可，以及可以使用哪些 http method 和 headers。只有得到肯定答复，浏览器才会发出正式的 xhr 请求，否则报错。

#### preflight 请求

头部示例

```
OPTIONS /xxx HTTP/1.1
Origin: https://xxxx.xxx.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: XX-CUSTOM-HEADER
Host: xxxx.xxx.com
...
```

除了 Origin 字段，"预检"请求的头信息包括两个特殊字段

1. Access-Control-Request-Method
   必须，列出 cors 请求会用到的 HTTP METHOD
2. Access-Control-Request-Headers
   逗号分隔，指定浏览器 CORS 请求会额外发送的头信息字段

#### preflight 回应

服务器收到"预检"请求以后，检查了 Origin、Access-Control-Request-Method 和 Access-Control-Request-Headers 字段以后，确认允许跨源请求，就可以做出回应。

##### error

如果服务器否定了"预检"请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被 XMLHttpRequest 对象的 onerror 回调函数捕获。控制台会打印出如下的报错信息。

```

XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```

preflight 回应示例

```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain

```

**Access-Control-Max-Age**
预检请求缓存有效期(s)，有效期期间不用再次发出另一条预检请求
