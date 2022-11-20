import React from 'react'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default function Home () {
  return (
    <>
      <Layout>
        <Sider>
          gogo
        </Sider>
        <Layout>
          <Header>
            你好
          </Header>
          <Content>
            hello
          </Content>
          <Footer>
            world
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}