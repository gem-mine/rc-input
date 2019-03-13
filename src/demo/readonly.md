---
order: 5
title: readonly属性
---

使用readonly属性时，在ie下不回退页面

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
    return <Input readOnly='asd' placeholder='用户名' defaultValue="默认值" onChange={this.handleChange} onClick={this.handleClick} />;
  }
}
ReactDOM.render(<App />, mountNode);
```

```css
```
