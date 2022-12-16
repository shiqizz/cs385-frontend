import React, { useState } from 'react'
import { Modal, Typography } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const { Text } = Typography

const UserModal = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(true)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setIsLoginForm(true)
  }

  return (
    <>
      <div onClick={showModal}>
        <LoginOutlined style={{ fontSize: 20 }}/>
        &nbsp;&nbsp;
        <Text>Login</Text>
      </div>
      <Modal
        title={(isLoginForm) ? 'Login' : 'Signup'}
        centered
        width="600px"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}>
        {(isLoginForm)
          ? <LoginForm setIsModalOpen={setIsModalOpen} setIsLoginForm={setIsLoginForm}/>
          : <SignupForm setIsModalOpen={setIsModalOpen} setIsLoginForm={setIsLoginForm}/>}
      </Modal>
    </>
  )
}

export default UserModal