---
order: 5
title: readOnly属性
---

使用readOnly属性时，在ie下不回退页面

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
    return <Input readOnly placeholder='用户名' defaultValue="默认值" onChange={this.handleChange} onClick={this.handleClick} />;
  }
}
ReactDOM.render(<App />, mountNode);
```

```css
```
