import React from 'react'
import { Button, Checkbox, Col, Form, Input, Row, Typography, message } from 'antd'
import { auth, db } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {
  doc,
  setDoc,
} from 'firebase/firestore'

const { Text, Link } = Typography

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const SignupForm = (props) => {

  const [form] = Form.useForm()

  const onFinish = async (value) => {
    const { email, password, nickname } = value
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await setDoc(doc(db, 'user', res.user.uid), {
        nickname: nickname,
        create_time: '2022-12-12'
      })
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          localStorage.setItem('token', user.accessToken)
          message.success('login success')
          setTimeout(()=>window.location.reload(), 500)
        })
    } catch (error) {
      message.error('has signup')
    }
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="Signup"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid Email!',
          },
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator (_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'))
            },
          }),
        ]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
      >
        <Input/>
      </Form.Item>

      <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: 'Please input the captcha you got!',
                },
              ]}
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="https://www.google.com">agreement</a>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Signup and Login
        </Button>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Text style={{ textAlign: 'center' }}>
          Has Signup? &nbsp;
          <Link onClick={() => props.setIsLoginForm(true)}>
            Login now!
          </Link>
        </Text>
      </Form.Item>


    </Form>
  )
}
export default SignupForm
