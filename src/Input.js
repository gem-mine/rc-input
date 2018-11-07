import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

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
    prefixCls: 'nd-input',
    type: 'text',
    className: 'nd-input'
  }
  static propTypes = {
    prefixCls: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    defaultValue: PropTypes.any,
    value: PropTypes.any
  }

  state = {
    hidePlaceholder: false
  }

  inputRef = null

  isOnComposition = false

  inputId = ''

  constructor (props) {
    super(props)
    const id = props.id
    if (id) {
      this.inputId = id
    } else {
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
      this.setState({hidePlaceholder: this.existInputValue()})
    }
    const onChange = this.props.onChange
    onChange && onChange(e)
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
    const hide = this.existInputValue()

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
    const { type, prefixCls, id, className, ...otherProps } = this.props
    let mockPlaceholder = null
    if (IS_IE) { // ie系列不用原生placeholder
      mockPlaceholder = this.renderPlaceholder()
      delete otherProps.placeholder
    }

    let { style } = this.props
    delete otherProps.style

    if (!style) {
      style = {}
    }
    const { height, width, ...restStyleProps } = style

    if (type === 'textarea') {
      return (
        <div className={classNames(`${prefixCls}-textarea-wrapper`)} style={{height, width}}>
          <textarea
            {...otherProps}
            id={this.inputId}
            style={{...restStyleProps}}
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
        <div className={classNames(`${prefixCls}-input-wrapper`)} style={{height, width}}>
          <input
            {...otherProps}
            id={this.inputId}
            type={type}
            style={{...restStyleProps}}
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
