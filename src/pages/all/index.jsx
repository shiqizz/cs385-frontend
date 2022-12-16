import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { List, Pagination, Card } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Meta } = Card

function All () {
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [goodsList, setGoodsList] = useState([])

  useEffect(() => {
    const coll = collection(db, 'goods')
    let q = query(coll, where('is_given', '==', false), orderBy('timestamp', 'desc'))
    const getGoodsList = onSnapshot(
      q,
      (snapShot) => {
        const list = []
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setCount(list.length)
        // pagination
        setGoodsList(list.slice((page-1)*size, page*size))
      },
      (error) => {
        console.log(error)
      }
    )
    return () => {getGoodsList()}
  }, [page, size])

  return (
    <div style={{padding: 50}}>
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
        dataSource={goodsList}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="detail" src={item.file_list[0]}/>}
              onClick={()=>navigate('/detail/'+ item.id)}
            >
              <Meta title={item.title} description={item.description}/>
            </Card>
          </List.Item>
        )}
      />
      <Pagination
        showQuickJumper
        total={count}
        showTotal={(total) => `Total ${total} items`}
        onChange={(value)=>{setPage(value)}}
        onShowSizeChange={(current,size)=>{setSize(size)}}
        style={{ textAlign: 'center' }}
        pageSizeOptions={[10, 20, 30, 40, 50]}
      />
    </div>
  )
}

export default All