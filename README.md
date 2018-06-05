# Input输入框

---

ie系列浏览器下使用模拟placeholder以及composition时间的处理

## 浏览器支持

| ![IE](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png) | ![Chrome](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png) | ![Firefox](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png) | ![Opera](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png) | ![Safari](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png) |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| IE 8+ ✔                                                                                            | Chrome 31.0+ ✔                                                                                           | Firefox 31.0+ ✔                                                                                            | Opera 30.0+ ✔                                                                                          | Safari 7.0+ ✔                                                                                            |

## 安装

```bash
$ npm install @sdp.nd/nd-input --save
```

## [如何使用](http://git.sdp.nd/component-h5/nd-input/tree/master/src/index.md)

## API

| 参数               | 说明               | 类型                               | 默认值          | 是否必填 |
| ------------------ | ------------------ | ---------------------------------- | --------------- | -------- |
| onChange           | 输入字符回调         | Function(event)                  | -               | false    |
| type               | 声明 input 类型，同原生 input 标签的 type 属性。另外提供 type="textarea" | string | `text`   | false  |
| style              | 容器节点样式         | Object                       | -               | false    |
| className          | 输入框样式           | string                            | -               | false    |
| prefixCls          | 组件样式类名称前缀    | string                             | 'nd-input'     | false    |
| value              | 输入框内容           | string                              | -               | false    |
| defaultValue       | 输入框默认内容        | string                             | -              | false    |
| placeholder        | 同元素placeholder属性 | string                                | -                | false  |

## 本地运行

```
npm install
npm run start
```

http://localhost:8000
