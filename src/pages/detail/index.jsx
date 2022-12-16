import React, { useEffect, useState } from 'react'
import { Button, Carousel, Image, Spin, message } from 'antd'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'

const Detail = () => {
  const id = useParams().id
  const [Loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
      onSnapshot(doc(db, 'goods', id),
        (doc) => {
          setData(doc.data())
          setLoading(false)
        })
    }
    , [id])

  if (Loading) {
    return <Spin/>
  }

  const Get = () => {
    updateDoc(doc(db, 'goods', id),
      { getter_uid : JSON.parse(localStorage.getItem('user')).uid, is_given: true })
    message.success('get success')
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Carousel autoplay>
        {data.file_list.map((file, index) =>
          <Image
            key={index}
            src={file}
            height={618}
            width={618}
            alt="this is a file"
          />
        )}
      </Carousel>

      <Button
        disabled={data.is_given}
        type="primary"
        size="large"
        onClick={Get}
        style={{ margin: '100px', width: '200px' }}
      >
        Get
      </Button>
    </div>
  )
}

export default Detail