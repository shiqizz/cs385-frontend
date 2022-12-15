import React, { useContext } from 'react'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography, message } from 'antd'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'
const { Text, Link } = Typography

const LoginForm = (props) => {
  const { dispatch } = useContext(AuthContext)

  const onFinish = (values) => {
    const { email, password } = values
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        // store userinfo
        localStorage.setItem('token', user.accessToken)
        dispatch({ type: 'LOGIN', payload: user })
        localStorage.setItem('avatar', user.avatar)
        message.success('login success')
        setTimeout(() => window.location.reload(), 500)
      })
      .catch((error) => {
        message.error('Email doesn\'t exist or password is wrong')
      })
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="Email"/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon"/>}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="https://www.google.com">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block>
          Login
        </Button>
      </Form.Item>

      <Form.Item>
        <Text style={{ textAlign: 'center' }}>
          Not Signup? &nbsp;
          <Link onClick={() => props.setIsLoginForm(false)}>
            Signup now!
          </Link>
        </Text>
      </Form.Item>

    </Form>
  )
}

export default LoginForm