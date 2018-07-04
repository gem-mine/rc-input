---
category: Components
subtitle: 输入框
type: Data Entry
title: Input
---

ie系列浏览器下使用模拟placeholder以及composition时间的处理

## 何时使用

* ie系列需要模拟placeholder或者处理输入字符截断问题

## API

```jsx
import Input from "@sdp.nd/nd-input";
<Input />;
```

| 参数               | 说明               | 类型                               | 默认值          | 是否必填 |
| ------------------ | ------------------ | ---------------------------------- | --------------- | -------- |
| onChange           | 输入字符回调         | Function(event)                  | -               | false    |
| type               | 声明 input 类型，同原生 input 标签的 type 属性。另外提供 type="textarea" | string | `text`   | false  |
| style              | 容器节点样式         | Object                       | -               | false    |
| className          | 输入框样式           | string                            | 'nd-input'             | false    |
| prefixCls          | 组件样式类名称前缀    | string                             | 'nd-input'     | false    |
| value              | 输入框内容           | string                              | -               | false    |
| defaultValue       | 输入框默认内容        | string                             | -              | false    |
| placeholder        | 同元素placeholder属性 | string                                | -                | false  |
