import React from 'react'
import classNames from 'classnames'

const IS_IE = !!window.ActiveXObject || 'ActiveXObject' in window
function preventDefaultEvent (e) {
  e.preventDefault()
}
export default class Input extends React.Component {
  static defaultProps = {
    prefixCls: 'nd-input',
    type: 'text'
  }
  static propTypes = {
    prefixCls: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.oneOf(['text', 'textarea']),
    onBlur: React.PropTypes.func,
    className: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    style: React.PropTypes.object,
    defaultValue: React.PropTypes.any,
    value: React.PropTypes.any
  }

  state = {
    hidePlaceholder: false
  }

  inputRef = null

  isOnComposition = false

  handleComposition = (e) => {
    if (e.type === 'compositionstart') { // 标识是否处于组字状态
      this.isOnComposition = true
    } else if (e.type === 'compositionend') {
      this.isOnComposition = false
      // fire onChange
      this.handleChange(e)
    }
  }

  handleChange = (e) => {
    if (!Reflect.has(this.props, 'value')) { // 非受控时触发重渲染
      this.setState({hidePlaceholder: this.inputRef.value.length > 0})
    }
    const onChange = this.props.onChange
    onChange && onChange(e)
  }

  handlePlaceholderClick = () => {
    this.focus()
  }

  focus () {
    this.inputRef.focus()
  }

  saveRef = (node) => {
    this.inputRef = node
  }

  componentDidMount () { // when have defaultValue
    if (this.inputRef && this.inputRef.value.length > 0) {
      this.setState({hidePlaceholder: true})
    }
  }

  renderPlaceholder () {
    const { placeholder, prefixCls, value } = this.props

    let hide = false
    if ('value' in this.props) {
      hide = value && value.length > 0
    } else {
      if (this.inputRef && this.inputRef.value) {
        hide = this.inputRef.value.length > 0
      }
    }

    if (placeholder) {
      return (
        <div
          onMouseDown={preventDefaultEvent}
          onClick={this.handlePlaceholderClick}
          style={{ display: hide || this.state.hidePlaceholder ? 'none' : 'block' }}
          className={`${prefixCls}-input-placeholder`}
        >
          {placeholder}
        </div>
      )
    }
    return null
  }

  render () {
    const { type, prefixCls, className, ...otherProps } = this.props
    let mockPlaceholder = null
    if (IS_IE) { // ie系列不用原生placeholder
      mockPlaceholder = this.renderPlaceholder()
      delete otherProps.placeholder
    }
    const { style } = this.props
    delete otherProps.style

    if (type === 'textarea') {
      return (
        <div className={classNames(`${prefixCls}-textarea-wrapper`)} style={style}>
          <textarea
            {...otherProps}
            className={className}
            onCompositionStart={this.handleComposition}
            onCompositionEnd={this.handleComposition}
            onChange={this.handleChange}
            ref={this.saveRef}
          />
          {mockPlaceholder}
        </div>
      )
    } else {
      return (
        <div className={classNames(`${prefixCls}-input-wrapper`)} style={style}>
          <input
            {...otherProps}
            className={className}
            onCompositionStart={this.handleComposition}
            onCompositionEnd={this.handleComposition}
            onChange={this.handleChange}
            ref={this.saveRef}
          />
          {mockPlaceholder}
        </div>
      )
    }
  }
}
