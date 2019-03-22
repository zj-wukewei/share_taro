import Taro from '@tarojs/taro';
import { login } from './service';
import { updateStorage } from "../../utils/request"

export default {
    namespace: 'login',
    state: {

    },
    effects: {
        *login({ payload: { mobile, password } }, { call, put, select }) {
            const data = yield call(login, { mobile, password });
            updateStorage(data);
        }
    },
    reducers: {
        save(state, { payload: data }) {
            return { ...state, ...data };
        },
    },
}
