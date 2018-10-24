---
order: 0
title: 输入框
---

基本使用

```jsx
import Input from "@sdp.nd/nd-input";
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

```css
```
