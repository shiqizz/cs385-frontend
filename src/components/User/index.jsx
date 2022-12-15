import React from 'react'
import { LogoutOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, Space, Typography, message, Avatar } from 'antd'
import UserModal from './UserModal'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography

const items = [
  {
    key: '0',
    label: (
      <a rel="noopener noreferrer" href="/profile">
        Profile
      </a>
    ),
    icon: <SmileOutlined style={{ fontSize: 20 }}/>,
  },
  {
    key: '1',
    label: (
      <UserModal/>
    ),
  },
  {
    key: '1',
    label: (
      <Text onClick={() => {
        localStorage.clear()
        message.success('logout success')
        setTimeout(()=>window.location.reload(), 500)
      }}>Logout</Text>
    ),
    icon: <LogoutOutlined style={{ fontSize: 20 }}/>,
  },
]
// display the corresponding content according to the login status
localStorage.getItem('token') ? items.splice(1, 1) : items.splice(2, 1)

const User = () => {
  const navigate = useNavigate()

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size={64} style={{float: 'right', margin: "5px 20px 0 0"}} icon={<UserOutlined />} onClick={() => {navigate('/profile')}}/>
        </Space>
      </a>
    </Dropdown>
  )
}

export default User