import React from 'react'
import classNames from 'classnames'

const IS_IE = !!window.ActiveXObject || 'ActiveXObject' in window

export default class Input extends React.Component {
  static defaultProps = {
    prefixCls: 'nd-input',
    type: 'text'
  }
  static propTypes = {
    prefixCls: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
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
    // 非受控时触发重渲染(受控时setState在Form组件order：4 demo中光标问题)
    if (!('value' in this.props)) {
      this.setState({hidePlaceholder: this.existInputValue()})
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

  existInputValue () {
    const props = this.props
    if ('value' in props) {
      if (props.value || props.value === 0) {
        return props.value.toString().length > 0
      } else {
        return false
      }
    } else {
      if (this.inputRef) {
        return this.inputRef.value.toString().length > 0
      } else if (props.defaultValue || props.defaultValue === 0) {
        return props.defaultValue.toString().length > 0
      } else {
        return false
      }
    }
  }

  renderPlaceholder () {
    const { placeholder, prefixCls } = this.props
    let hide = this.existInputValue()

    if (placeholder) {
      return (
        <div
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
