import request from './request'

// 注册
export const signupAPI = (data) => request.post('user/signup/', data)

// 发送验证码
export const sendCodeAPI = (data) => request.post('user/code/', data)

// 登录
export const loginAPI = (data) => request.post('user/login/', data)
