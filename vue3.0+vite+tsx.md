## 开始

```sh
  # 新建vite project
  yarn create vite-app [project-name]

  cd [project-path]
  yarn

  # 开始使用
  yarn dev
```

## ts&tsx 配置

### ts

- index.html 将 main.js 改为 main.ts
- js 文件改为 ts
- vue 改为 tsx（非必须）
- 优化类型提示，src 目录下创建 shims-vue.d.ts&source.d.ts

```ts
// shims-vue.d.ts
declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
```

```ts
// source.d.ts
// 不够自己加..
declare module '*.json';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
```

### tsx 配置

根目录下创建`tsconfig.json`配置文件

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  }
}
```

## Vue3.0 tsx 语法

### 组件

- 函数组件（FC），无状态，与 react 基本一致。

```tsx
import { FunctionalComponent } from 'vue';

const FcNode: FunctionalComponent<{ prop1: string }> = ({ prop1 }) => {
  return <div>{prop1}</div>;
};

export default FcNode;
```

- 有状态的组件

```tsx
import { ref, defineComponent, computed, reactive, PropType } from 'vue';
const TestNode = defineComponent({
    name: 'TestNode'
    setup(props, { slots }){
        const data = reactive({test: 'sss'});
        return () => (
            <div>{ data.test }</div>
        )
    }
})
export default TestNode;
```

### 有状态组件 props 类型定义（巨坑）

不像 FC 可以直接在 FunctionalComponent<T>直接写泛型，非函数组件的 props 类型约束要像 vue2 那样：

```tsx
import { ref, defineComponent, computed, reactive, PropType } from 'vue';
const TestNode = defineComponent({
    name: 'TestNode',
    props:{
        text: {
            type: String,
            required
        }
    }
    setup(props, { slots }){
        const data = reactive({test: 'sss'});
        return () => (
            <div>{ data.test }</div>
        )
    }
})
export default TestNode;
```

对于复杂类型（巨麻烦...）：

```tsx
import { ref, defineComponent, computed, reactive, PropType } from 'vue';
const TestNode = defineComponent({
    name: 'TestNode',
    props:{
        Obj: {
            type: Object as PropType<{text: string}>,
            required: true
        }
    }
    setup(props, { slots }){
        const data = reactive({test: 'sss'});
        return () => (
            <div>{ data.test }</div>
        )
    }
})
export default TestNode;
```

### slot（插槽）

不像 react，component 自带一个 children 的 props，vue 的自定义组件嵌套靠 slot，在 tsx 中，slot 的使用语法如下（vite 中）：

```tsx
// ChildNode.tsx
import { ref, defineComponent, computed, reactive, PropType } from 'vue';
const ChildNode = defineComponent({
    name: 'child'
    setup(props, { slots }){
        return ()=>(
            <div>
                {slots.default?.() /* 默认插槽 */}
                <span>child text</span>
                {slots.footer?.() /* 命名插槽 */}
            </div>
        )
    }
})
```

```tsx
// ParentNode.tsx
import { FunctionalComponent } from 'vue';
import ChildNode from './ChlidNode';
// 需要具名插槽的时候
const ParentNode: FunctionalComponent = () => {
  const slots = {
    default: [<div>default</div>],
    footer: (props: {}) => [<div>footer</div>], // props可作插槽作用域的作用
  };
  return (
    <div>
      <ChildNode>{slots}</ChildNode>
    </div>
  );
};

// 只要默认插槽的话，类似与react
const ParentNode: FunctionalComponent = () => {
  return (
    <div>
      <ChildNode>default</ChildNode>
    </div>
  );
};
```
