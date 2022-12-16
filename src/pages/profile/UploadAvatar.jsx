import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, message, Upload } from 'antd'
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 1
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const UploadAvatar = (props) => {

  const [imageUrl, setImageUrl] = useState()

  const firebaseUpload = (event) => {
    const file = event.file
    const storageRef = ref(storage, file.name)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        message.error(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((uploadUrl) => {
            setImageUrl(uploadUrl)
            props.setAvatar(uploadUrl)
          })
      }
    )
  }

  return (
    <Upload
      name="avatar"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={firebaseUpload}
    >
      {imageUrl
        ? (<img src={imageUrl} alt="avatar" style={{width: 100, height: 100, borderRadius: '50%'}}/>)
        : (props.avatar)?(<img src={props.avatar} alt="avatar" style={{width: 100, height: 100, borderRadius: '50%'}}/>):(<Avatar size={100} icon={<UserOutlined/>}/>)}
    </Upload>
  )
}

export default UploadAvatar