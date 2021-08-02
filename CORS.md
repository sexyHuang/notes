## CORS(Cross Origin Resource Sharing)跨域资源共享

### 可用场景

- XMLHttpRequest / Fetch 发起的跨域 HTTP 请求
- Web 字体（CSS 中通过 @font-face 使用跨域字体资源）
- WebGL 贴图
- drawImage 将 Images/Video 绘制到 canvas

CORS 请求分成简单请求和非简单请求两类。

### CORS 相关响应头(Access-Control-开头)

1. **Access-Control-Allow-Origin**： \<origin> | \*
   指定了一个可以存取资源的 URI
2. **Access-Control-Allow-Credentials**\<boolean>
   表示是否允许发送 Cookie
3. **Access-Control-Expose-Headers**：\<field-name>[, \field-name>]\*  
   用于指定 XMLHttpRequest 对象的 getResponseHeader()方法可以拿到的除了 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 外的字段。
4. **Access-Control-Allow-Headers**： \<field-name>[, \field-name>]\*  
   用于预检请求的响应。其指明了实际请求中允许携带的首部字段。
5. **Access-Control-Max-Age**: \<delta-seconds>
   delta-seconds 参数表示 preflight 请求的结果在多少秒内有效。
6. **Access-Control-Allow-Methods**: \<method>[, \<method>]\*
   用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

### withCredentials 属性

CORS 发送 Cookies 除了需要服务器设置 Access-Control-Allow-Credentials 外，还需打开 XHR 的 withCredentials 属性
示例

```js
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

P.S. 当需要发送 cookie 时，Access-Control-Allow-Origin 只能为明确的，与请求页面一致的域名。

### 简单请求

满足下面两个条件为简单请求

1. method 为 HEAD、GET、POST 之一
2. HEADER 不超出下面字段：
   - Accept
   - Accept-Language
   - Content-Language
   - DPR
   - Downlink
   - Save-Data
   - Viewport-Width
   - Width
   - Content-Type，仅限：
     - application/x-www-form-urlencoded
     - multipart/form-data
     - text/plain
3. 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。
4. 请求中没有使用 ReadableStream。

### 复杂请求（非简单请求）

#### 预检请求

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

##### preflight 回应示例

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

#### 预检请求与重定向

大多数浏览器不支持针对于预检请求的重定向。如果一个预检请求发生了重定向，浏览器将报告错误：

```
The request was redirected to 'https://example.com/foo', which is disallowed for cross-origin requests that require preflight

Request requires preflight, which is disallowed to follow cross-origin redirect
```

CORS 最初要求该行为，不过在后续的修订中废弃了这一要求。

在浏览器的实现跟上规范之前，有两种方式规避上述报错行为：

- 服务器去掉对预检请求的重定向
- 改成简单请求

如果上述方式难以做到，还可以：

1.  用简单请求（通过 Response.url/XHR.responseURL）以判断预检请求会返回的地址。
2.  发出真正的请求，使用上一步 Response.url/XHR.responseURL 获得的 URL。

#### 附带身份凭证的请求与通配符

一般而言，对于跨域的 XHR/Fetch 请求，浏览器不会发送身份凭证信息。如果要发送凭证信息，需要设置 XHR 的某个特殊标志位。

**注意：** 对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为“ \* ”
