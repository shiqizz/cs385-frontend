import React, { useEffect, useState } from 'react'
import Goods from '../../components/Goods'
import { db } from '../../firebase'
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { List, Pagination } from 'antd'

function All () {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [goodsList, setGoodsList] = useState([])

  useEffect(() => {
    const coll = collection(db, 'goods')
    let q = query(coll, orderBy('timestamp'))
    q = search ? query(q, where('title', '==', search)) : query(q)
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
  }, [page, size, search])

  return (
    <div>
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
        dataSource={goodsList}
        renderItem={(item) => (
          <List.Item>
            <Goods item={item}/>
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