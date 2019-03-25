import Taro, { Component } from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import iconClose from './clear.png'
import './input-item.scss'

class Index extends Component {

  static defaultProps = {
    type: 'text',
    value: '',
    placeholder: '',
    compStyle: '',
    focus: false,
    password: false,
    canShowClear: true,
    onInput: () => { },
    onFocus: () => { },
    onBlur: () => { }
  }

  handleInput = (e) => {
    this.props.onInput(e.detail.value)
  }

  handleClear = () => {
    this.props.onInput('')
  }

  render() {
    const { value, type, focus, password, placeholder, compStyle, canShowClear,
      onFocus, onBlur } = this.props
    return (
      <View className='core-input-item' style={compStyle}>
        <Input className='core-input'
          type={type}
          value={value}
          focus={focus}
          password={password}
          placeholder={placeholder}
          onInput={this.handleInput}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {
          !!value && canShowClear && (
            <View className='core-input-item-clear' onClick={this.handleClear}>
              <Image className='core-input-item-clear-img' src={iconClose} />
            </View>
          )
        }
      </View>
    )
  }
}

export default Index