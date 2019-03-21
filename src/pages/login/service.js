import Request from '../../utils/request'

export const login = payload =>
    Request({
        url: 'user/login',
        method: 'POST',
        payload,
    })