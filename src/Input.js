import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const IS_IE9 = !window.atob
const IS_IE = !!window.ActiveXObject || 'ActiveXObject' in window

const generateId = () => {
  let d = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export default class Input extends React.Component {
  static defaultProps = {
    prefixCls: 'rc-input',
    type: 'text',
    className: 'rc-input'
  }
  static propTypes = {
    prefixCls: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    readOnly: PropTypes.any,
    defaultValue: PropTypes.any,
    value: PropTypes.any
  }

  state = {
    hidePlaceholder: false,
    focused: false
  }

  inputRef = null

  isOnComposition = false

  inputId = ''

  constructor (props) {
    super(props)
    const id = props.id
    if (id) {
      this.inputId = id
    } else if (IS_IE9) {
      this.inputId = generateId()
    }
  }

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
      this.setState({ hidePlaceholder: this.existInputValue() })
    }
    const onChange = this.props.onChange
    onChange && onChange(e)
  }

  handleFocus = (e) => {
    this.setState({
      focused: true
    })

    const onFocus = this.props.onFocus
    onFocus && onFocus(e)
  }

  handleBlur = (e) => {
    this.setState({
      focused: false
    })

    const onBlur = this.props.onBlur
    onBlur && onBlur(e)
  }

  handleKeyDown = (e) => {
    // ie && 退格键 && readonly属性, 那么阻止默认行为(跳转回上一页面)
    if (this.props.readOnly && IS_IE && e.keyCode === 8) {
      e.preventDefault()
    }
    const onKeyDown = this.props.onKeyDown
    onKeyDown && onKeyDown(e)
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

  renderPlaceholder = (placeholder, prefixCls) => {
    const hide = this.existInputValue()
    // ie9 下 label 标签使用 id 关联起来，点击 placeholder 后可以时输入框聚焦,
    if (placeholder) {
      return (
        <label
          htmlFor={this.inputId}
          style={{ display: hide || this.state.hidePlaceholder ? 'none' : 'block' }}
          className={`${prefixCls}-input-placeholder`}
        >
          {placeholder}
        </label>
      )
    }
    return null
  }

  render () {
    let { type, id, prefixCls, className, style, placeholder, ...otherProps } = this.props
    let mockPlaceholder = null
    if (IS_IE9) {
      mockPlaceholder = this.renderPlaceholder(placeholder, prefixCls)
    }

    if (this.inputId) {
      id = this.inputId
    }

    const wrapperClass = classNames(`${prefixCls}-wrapper`, {
      [`${prefixCls}-focused`]: this.state.focused
    }, className)

    if (type === 'textarea') {
      return (
        <div className={wrapperClass} style={style}>
          <textarea
            style={{ overflowY: style && style.overflowY }} // 处理scrollbar闪烁出现问题
            onCompositionStart={this.handleComposition}
            onCompositionEnd={this.handleComposition}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            ref={this.saveRef}
            id={id}
            placeholder={placeholder}
            {...otherProps}
          />
          {mockPlaceholder}
        </div>
      )
    } else {
      return (
        <div className={wrapperClass} style={style}>
          <input
            type={type}
            onCompositionStart={this.handleComposition}
            onCompositionEnd={this.handleComposition}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            ref={this.saveRef}
            id={id}
            placeholder={placeholder}
            {...otherProps}
          />
          {mockPlaceholder}
        </div>
      )
    }
  }
}
