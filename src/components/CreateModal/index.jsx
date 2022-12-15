import React, { useState } from 'react'
import { Button, Form, Input, message, Modal } from 'antd'
import UploadImage from './UploadImage'
import { db } from '../../firebase'
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore'

const CreateModal = () => {
  const [fileList, setFileList] = useState(['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onFinish = async (values) => {
    const data = {
      title: values.title,
      file_list: fileList,
      timestamp: serverTimestamp()
    }
    await setDoc(doc(collection(db, 'goods')), data)
    message.success('create success')
    setIsModalOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={() => {setIsModalOpen(true)}}>
        Give
      </Button>
      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={() => {setIsModalOpen(false)}}>
        <Form
          name="create"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 17,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
          >
            <UploadImage/>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateModal