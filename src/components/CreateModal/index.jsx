import React, { useState } from 'react'
import { Button, Form, Input, message, Modal, Upload } from 'antd'
import { db } from '../../firebase'
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore'
import { PlusOutlined } from '@ant-design/icons'

const { TextArea } = Input

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const CreateModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])

  const onFinish = async (values) => {
    // get file url list
    const fileUrlList = []
    for (let i = 0; i < fileList.length; i++) {
      fileUrlList.push(fileList[i].response)
    }

    const data = {
      title: values.title,
      description: values.description,
      file_list: fileUrlList,
      giver_uid: JSON.parse(localStorage.getItem('user')).uid,
      is_given: false,
      getter_uid: '',
      status: true,
      timestamp: serverTimestamp()
    }
    await setDoc(doc(collection(db, 'goods')), data)
    message.success('create success')
    setIsModalOpen(false)
  }

  const handleCancel = () => setPreviewOpen(false)
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)
  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <>
      <Button
        type="primary"
        onClick={() => {setIsModalOpen(true)}}
        style={{ margin: '0 600px'}}
      >
        Give
      </Button>
      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={() => {setIsModalOpen(false)}}>
        <Form
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
            name="title"
            label="Title"
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={3}/>
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
          >
            <div>
              <Upload
                action="/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                multiple
              >
                {fileList.length >= 10 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>
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