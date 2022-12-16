import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, Select, DatePicker, InputNumber, Switch, Checkbox, message, Spin, Button } from 'antd'
import UploadAvatar from './UploadAvatar'
import { db } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const { TextArea } = Input

const Profile = () => {

  const [Loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [canEdit, setCanEdit] = useState(false)
  const uid = JSON.parse(localStorage.getItem('user')).uid
  const [avatar, setAvatar] = useState()

  useEffect(() => {
      getDoc(doc(db, 'user', uid)).then(
        (doc) => {
          setData(doc.data())
          setLoading(false)
        },
        () => {
          message.error('miss uid')
        }
      )
    }
    , [uid])

  const onFinish = async (values) => {
    values = {'avatar': avatar, ...values}
    Object.keys(values).forEach((item) => {
      const key = values[item]
      if (key === undefined) {delete values[item]}})
    await setDoc(doc(db, 'user', uid), values)
    localStorage.setItem('avatar', avatar)
    message.success('save success')
  }

  if (Loading) {
    return <Spin/>
  }

  return (
    <>
      <Checkbox
        checked={canEdit}
        onChange={(e) => setCanEdit(e.target.checked)}
      >
        Edit
      </Checkbox>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={!canEdit}
        onFinish={onFinish}
      >

        <Form.Item label="Upload" valuePropName="fileList">
          <UploadAvatar avatar={data.avatar} setAvatar={setAvatar}/>
        </Form.Item>

        <Form.Item name="nickname" label="Nickname" initialValue={data.nickname}>
          <Input bordered={false}/>
        </Form.Item>

        <Form.Item name="sex" label="Sex" initialValue={data.sex}>
          <Radio.Group>
            <Radio value="man"> Man </Radio>
            <Radio value="woman"> Woman </Radio>
            <Radio value="other"> other </Radio>
            <Radio value="secret"> secret </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="age" label="Age" initialValue={data.age}>
          <InputNumber/>
        </Form.Item>

        <Form.Item name="country" label="Country" initialValue={data.country}>
          <Select>
            <Select.Option value="China">China</Select.Option>
            <Select.Option value="Ireland">Ireland</Select.Option>
            <Select.Option value="UK">UK</Select.Option>
            <Select.Option value="USA">USA</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="birthday" label="Birthday" initialValue={data.birthday}>
          <DatePicker bordered={false}/>
        </Form.Item>

        <Form.Item name="bio" label="Bio">
          <TextArea rows={4}/>
        </Form.Item>

        <Form.Item label="Is open" valuePropName="checked">
          <Switch/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ margin: '20px 350px' }}>Save</Button>
        </Form.Item>

      </Form>
    </>
  )
}

export default Profile