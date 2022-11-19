import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import {Form, Input, message} from "antd";
import {SignupAPI} from "../../../services/api"
import {SendCodeAPI} from "../../../services/api"


function Signup() {
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    const onFinish = (values) => {
        SignupAPI({
            email: values.email,
            password: values.password,
            confirm: values.confirm,
        }).then(res => {
            const {code, msg} = res
            if (code === 200) {
                message.success(msg).then()
                // 跳到登录页
                setTimeout(() => navigate('/login'), 1500)
            } else {
                message.error(msg).then()
            }
        })
    };

    const sendCode = () => {
        SendCodeAPI({
            email: email
        }).then(res => {
            const {code, msg} = res
            if (code === 200) {
                console.log('成功了，展示消息')
                message.success(msg)
            } else {
                message.error(msg)
            }
        })
    }

    const emailChange = (value) => {
        setEmail(value.target.value)
    }

    return (
        // 居中框
        <div className="Auth-form-container">
            {/*表单*/}
            <Form
                className="Auth-form"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                {/*上面文本区域*/}
                <div className="Auth-form-content">
                    {/*标题*/}
                    <h3 className="Auth-form-title">Sign up</h3>
                    {/*登录跳转*/}
                    <div className="text-center">
                        Has registered?{" "}
                        <a href="/login" className="link-primary">Login</a>
                    </div>

                    {/*邮箱输入*/}
                    <Form.Item
                        className="form-group mt-3"
                        label="Email address"
                        name="email"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Please enter email"
                            onChange={emailChange}
                        />
                    </Form.Item>

                    {/*发送验证码*/}
                    <p></p>
                    <button type="button" className="btn btn-primary" onClick={() => sendCode()}>Send Code</button>

                    {/*验证码*/}
                    <Form.Item
                        className="form-group mt-3"
                        label="code"
                        name="code"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Please enter code"
                        />
                    </Form.Item>


                    <Form.Item
                        className="form-group mt-3"
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            className="form-control mt-1"
                            placeholder="Please enter password"
                            type="password"
                        />
                    </Form.Item>

                    <Form.Item
                        className="form-group mt-3"
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input
                            className="form-control mt-1"
                            placeholder="Please confirm password"
                            type="password"
                        />
                    </Form.Item>

                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>

                </div>
            </Form>
        </div>
    )
}

export default Signup;