---
order: 1
title: 受控输入框
---

受控输入框

```jsx
import Input from "@sdp.nd/nd-input";
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

```css
```
