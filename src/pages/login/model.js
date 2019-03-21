import Taro from '@tarojs/taro';
import * as login from './service';


export default {
    namespace: 'login',
    state: {

    },
    effects: {
        *login(action, { call, put, select }) {
            const { mobile, password } = action.payload;
            const res = yield call(login.login, { mobile, password });
            console.log("login", res)
        }
    },
    reducers: {
        save(state, { payload: data }) {
            return { ...state, ...data };
        },
    },
}
