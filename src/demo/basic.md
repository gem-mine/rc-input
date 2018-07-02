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
  render() {
    return <Input className={'nd-input'} placeholder='用户名' defaultValue="默认值" onChange={this.handleChange} />;
  }
}
ReactDOM.render(<App />, mountNode);
```

```css
```
