import React from 'react'
import { Card } from 'antd'

const { Meta } = Card

const Goods = (props) => {
  const data = props.item
  console.log(data.file_list[0])

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="detail" src={data.file_list[0]}/>}
      onClick={()=>{console.log(111)}}
    >
      <Meta title={data.title} description="今天真是美好的一天"/>
    </Card>
  )

}

export default Goods