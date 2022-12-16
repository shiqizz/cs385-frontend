import React, { useState, useEffect } from 'react'
import {
  ShoppingOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'
import { Layout, Input, Menu } from 'antd'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import CreateModal from './components/CreateModal'
import AvatarDropdown from './components/AvatarDropdown'

const { Search } = Input
const { Header, Sider, Content } = Layout

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const [selectedKey, setSelectedKey] = useState()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    setSelectedKey(path)
  }, [path])

  const onClick = e => {
    setSelectedKey(e.key)
    navigate('/' + e.key)
  }

  const onSearch = (value) => {
  }

  return (
    <Layout>

      <Sider
        defaultCollapsed={false}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" style={{ height: 80 }}/>
        <Menu
          theme="dark"
          mode="inline"
          onClick={onClick}
          selectedKeys={[selectedKey]}
          items={[
            {
              key: '',
              icon: <ShoppingOutlined/>,
              label: 'All',
            },
            {
              key: 'give',
              icon: <CloudUploadOutlined/>,
              label: 'Give',
            },
            {
              key: 'get',
              icon: <CloudDownloadOutlined/>,
              label: 'Get',
            },
          ]}
        />

      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            height: 77,
            background: 'skyblue',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CreateModal/>
          <AvatarDropdown/>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: '1px 17px',
            minHeight: '874px'
          }}
        >
          <Outlet/>
        </Content>

      </Layout>
    </Layout>
  )
}
export default App