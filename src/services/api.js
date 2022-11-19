import request from './request'

// 注册
export const SignupAPI = (data) => request.post('user/signup/', data)

// 发送验证码
export const SendCodeAPI = (data) => request.post('user/code/', data)

// 登录
export const LoginAPI = (data) => request.post('user/login/', data)
