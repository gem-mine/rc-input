---
order: 3
title: 异步获取值
---

受控输入框获取的值为异步获取

```jsx
import Input from "@sdp.nd/nd-input";
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

```css
```
