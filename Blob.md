## What's Blob?

Blob(Binary Large Object)表示二进制类型的大对象。在 JS 中 Blob 类型的对象表示不可变的类似文件对象的原始数据。

### 构造函数

Blob 由一个可选的字符串 **type**(通常为 MIME 类型)和**blobParts**组成

JS 中：

```ts
const a = new Blob(blobParts, options);
```

### Blob URL

Blob URL/Object URL 是一种伪协议，允许 Blob 和 File 对象用作图像，下载二进制数据链接等的 URL 源。在浏览器中，我们使用 `URL.createObjectURL` 方法来创建 Blob URL，该方法接收一个 Blob 对象，并为其创建一个唯一的 URL，其形式为 `blob:<origin>/<uuid>`，对应的示例如下：

```
    blob:https://example.org/xxx-xxx-xxxx-xxx
```

- 浏览器内部为每个通过 URL.createObjectURL 生成的 URL 存储了一个 URL → Blob 映射。因此，此类 URL 较短，但可以访问 Blob。生成的 URL 仅在当前文档打开的状态下才有效。它允许引用 \<img\>、\<a\> 中的 Blob，但如果你访问的 Blob URL 不再存在，则会从浏览器中收到 404 错误。
- 上述的 Blob URL 看似很不错，但实际上它也有副作用。 虽然存储了 URL → Blob 的映射，但 Blob 本身仍驻留在内存中，浏览器无法释放它。映射在文档卸载时自动清除，因此 Blob 对象随后被释放。但是，如果应用程序寿命很长，那不会很快发生。因此，如果我们创建一个 Blob URL，即使不再需要该 Blob，它也会存在内存中。
- 针对这个问题，我们可以调用 URL.revokeObjectURL(url) 方法，从内部映射中删除引用，从而允许删除 Blob（如果没有其他引用），并释放内存。
