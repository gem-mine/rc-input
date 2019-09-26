# Input输入框

---

ie系列浏览器下使用模拟placeholder以及composition时间的处理

## 浏览器支持

| ![IE](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png) | ![Chrome](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png) | ![Firefox](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png) | ![Opera](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png) | ![Safari](https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png) |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| IE 8+ ✔                                                                                            | Chrome 31.0+ ✔                                                                                           | Firefox 31.0+ ✔                                                                                            | Opera 30.0+ ✔                                                                                          | Safari 7.0+ ✔                                                                                            |

## 安装

```bash
$ npm install @gem-mine/rc-input --save
```

## 代码演示

在线示例：https://gem-mine.github.io/rc-input/site/

### 基本使用

```jsx
import Input from "@gem-mine/rc-input";
import '@gem-mine/rc-input/lib/style';

class App extends React.Component {
  handleChange(e){
    console.log(e.target.value)
  }
  handleClick(e){
    console.log(e)
  }
  render() {
    return <Input placeholder='用户名' defaultValue="默认值" onChange={this.handleChange} onClick={this.handleClick} />;
  }
}
ReactDOM.render(<App />, mountNode);
```

### 受控输入框

```jsx
import Input from "@gem-mine/rc-input";
import '@gem-mine/rc-input/lib/style';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  }
  render() {
    const { userName } = this.state;
    return (
      <Input
        value={userName}
        onChange={this.onChangeUserName}
        placeholder={'用户名'}
      />
    );
  }
}
ReactDOM.render(<App />, mountNode);
```

### 文本域输入

```jsx
import Input from "@gem-mine/rc-input";
import '@gem-mine/rc-input/lib/style';

class App extends React.Component {
  render() {
    return <Input type='textarea' rows='4' placeholder='输入评论' />;
  }
}
ReactDOM.render(<App />, mountNode);
```

### 密码框

```jsx
import Input from "@gem-mine/rc-input";
import '@gem-mine/rc-input/lib/style';

class App extends React.Component {
  render() {
    return <Input placeholder='密码' type='password' />;
  }
}
ReactDOM.render(<App />, mountNode);
```

### 受控输入框获取的值为异步获取

```jsx
import Input from "@gem-mine/rc-input";
import '@gem-mine/rc-input/lib/style';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  componentDidMount() {
    this.setState({ userName: '异步值'});
  }
  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  }
  render() {
    const { userName } = this.state;
    return (
      <Input
        value={userName}
        onChange={this.onChangeUserName}
        placeholder={'用户名'}
      />
    );
  }
}
ReactDOM.render(<App />, mountNode);
```

### 使用readOnly属性时，在ie下不回退页面

```jsx
import Input from "@gem-mine/rc-input";
class App extends React.Component {
  handleChange(e){
    console.log(e.target.value)
  }
  handleClick(e){
    console.log(e)
  }
  render() {
    return <Input readOnly placeholder='用户名' defaultValue="默认值" onChange={this.handleChange} onClick={this.handleClick} />;
  }
}
ReactDOM.render(<App />, mountNode);
```

## API

| 参数               | 说明               | 类型                               | 默认值          | 是否必填 |
| ------------------ | ------------------ | ---------------------------------- | --------------- | -------- |
| onChange           | 输入字符回调         | Function(event)                  | -               | false    |
| type               | 声明 input 类型，同原生 input 标签的 type 属性。另外提供 type="textarea" | string | `text`   | false  |
| style              | 容器节点样式         | Object                       | -               | false    |
| className          | 输入框样式           | string                            | -               | false    |
| prefixCls          | 组件样式类名称前缀    | string                             | 'rc-input'     | false    |
| value              | 输入框内容           | string                              | -               | false    |
| defaultValue       | 输入框默认内容        | string                             | -              | false    |
| placeholder        | 同元素placeholder属性 | string                                | -                | false  |

## 本地运行

```
npm install
npm run start
```

http://localhost:8000
