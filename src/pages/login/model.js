import Taro from '@tarojs/taro';
import {login} from './service';


export default {
    namespace: 'login',
    state: {

    },
    effects: {
        *login({payload: {mobile, password}}, { call, put, select }) {
            const res = yield call(login, { mobile, password });
            console.log("login11", res)

         
        }
    },
    reducers: {
        save(state, { payload: data }) {
            return { ...state, ...data };
        },
    },
}
