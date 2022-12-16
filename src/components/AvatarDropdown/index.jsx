import React from 'react'
import { LogoutOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, Space, Typography, message, Avatar, Image } from 'antd'
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
const user = localStorage.getItem('user')
user ? items.splice(1, 1) : items.splice(2, 1)
let avatar = localStorage.getItem('avatar')

const AvatarDropdown = () => {
  const navigate = useNavigate()

  return (
    <div style={{ float: 'right'}}>
      <Dropdown
        menu={{
          items,
        }}
      >
        <Space>
          <Avatar size={64} style={{float: 'right', margin: "5px 20px 0 0"}}
                  icon={(avatar)?(<img src={avatar} alt={'avatar'}/>):(<UserOutlined />)}
                  onClick={() => {navigate('/profile')}}/>
        </Space>
      </Dropdown>
    </div>

  )
}

export default AvatarDropdown