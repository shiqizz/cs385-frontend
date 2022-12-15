import React, { useState, useEffect } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'
import { Layout, Input, Menu } from 'antd'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import CreateModal from './components/CreateModal'
import Avatar from './components/User'

const { Search } = Input;
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
        trigger={null}
        collapsible
        collapsed={collapsed}
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
            padding: "30px, 0",
            color: 'green',
            height: 77,
            background: 'skyblue',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <CreateModal/>
          <Avatar/>
        </Header>

        <div style={{background: 'cyan'}}>
          <hr color='black'/>
        </div>

        <Content
          className="site-layout-background"
          style={{
            margin: '1px 17px',
            minHeight: "874px"
          }}
        >
          {['', 'get', 'give', 'detail'].indexOf(path) !== -1  && <Search
            enterButton
            placeholder="Search for what you get"
            onSearch={onSearch}
            style={{width: 500, borderRadius: '25px', padding: 17}}
          />}
          <Outlet/>
        </Content>

      </Layout>
    </Layout>
  )
}
export default App