import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'
import InputItem from '../../components/input-item'
import './login.scss'

@connect(({ login }) => ({
  ...login,
}), (dispatch) => ({
  onLogin(mobile, password) {
    dispatch({
      type: 'login/login',
      payload: {
        mobile, password
      },
    })
  }
}))
class Index extends Component {

  state = {
    mobile: ''
  }

  handleLogin = () => {
    this.props.onLogin("18258005578", "e10adc3949ba59abbe56e057f20f883e1")
  }

  handleInput = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { mobile } = this.state
    return (
      <View className='login'>
        <Text className='app-name'>Share</Text>
        <InputItem 
          type='text'
          compStyle={{ marginTop: '40px' }}
          placeholder='手机号码'
          value={mobile}
          onInput={this.handleInput.bind(this, 'mobile')}
        />
        <InputItem compStyle={{ marginTop: '10px' }} type='password' placeholder='密码' />
        <AtButton className='submit' type='primary'  onClick={this.handleLogin}>登录</AtButton>
      </View>
    )
  }
}

export default Index