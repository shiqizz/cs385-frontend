import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, Select, Cascader, DatePicker, InputNumber, Switch, Checkbox, message, Spin } from 'antd'
import UploadAvatar from '../../components/UploadAvatar'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'

const { RangePicker } = DatePicker
const { TextArea } = Input

const Profile = () => {

  const [Loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  const [canEdit, setCanEdit] = useState(false)
  const onFormLayoutChange = ({ disabled }) => {setCanEdit(disabled)}

  useEffect(() => {
    const uid = localStorage.getItem('uid')
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
  , [])

  if (Loading) {
    return <Spin />
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
        onValuesChange={onFormLayoutChange}
        disabled={!canEdit}
      >

        <Form.Item label="Upload" valuePropName="fileList">
          <UploadAvatar/>
        </Form.Item>

        <Form.Item label="Nickname">
          <Input bordered={false} defaultValue={data.nickname}/>
        </Form.Item>

        <Form.Item label="Sex">
          <Radio.Group>
            <Radio value="man"> Man </Radio>
            <Radio value="woman"> Woman </Radio>
            <Radio value="other"> other </Radio>
            <Radio value="secret"> secret </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Age">
          <InputNumber bordered={false} defaultValue={0} />
        </Form.Item>

        <Form.Item label="Country">
          <Select>
            <Select.Option value="China">China</Select.Option>
            <Select.Option value="Ireland">Ireland</Select.Option>
            <Select.Option value="UK">UK</Select.Option>
            <Select.Option value="USA">USA</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="City">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Birthday">
          <DatePicker bordered={false}/>
        </Form.Item>

        <Form.Item label="RangePicker">
          <RangePicker bordered={false}/>
        </Form.Item>

        <Form.Item label="Bio">
          <TextArea rows={4} bordered={false}/>
        </Form.Item>

        <Form.Item label="Is open" valuePropName="checked">
          <Switch/>
        </Form.Item>

      </Form>
    </>
  )
}

export default Profile