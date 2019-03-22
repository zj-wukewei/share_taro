import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

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


    handleLogin = () => {
        this.props.onLogin("18258005578", "e10adc3949ba59abbe56e057f20f883e")
    }

    render() {
        return (
            <View>
                <Button onClick={this.handleLogin}>login</Button>
            </View>
        )
    }
}

export default Index