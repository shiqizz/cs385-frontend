import React from 'react'
import './index.css'
import { Checkbox, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { loginAPI } from '../../../services/api'

export default function Login () {

  const navigate = useNavigate()

  const onFinish = (values) => {
    loginAPI({
      username: values.username,
      password: values.password
    }).then(
      res => {
        const { code, msg, token } = res
        if (code === 200) {
          // 存储数据
          localStorage.setItem('token', token)
          // 跳转到根路径
          setTimeout(() => {
            navigate('/')
          }, 1500)
        } else {
          message.error(msg)
        }
      })
  }

  return (
    <div className="Auth-form-container">
      <Form
        className="Auth-form"
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <p></p>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="text-center">
            Not registered yet?{' '}
            <a href="/signup" className="link-primary">Sign Up</a>
          </div>

          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="username"
              placeholder="Please enter username(email)"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              className="form-control mt-1"
              placeholder="Please enter password"
              type="password"
            />
          </Form.Item>

          <p></p>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>

          <p className="text-center mt-2">
            <a href="https://www.google.com">Forgot password?</a>
          </p>

        </div>
      </Form>
    </div>
  )
}