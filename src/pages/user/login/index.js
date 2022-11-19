import React from "react"
import "./index.css"
import {Checkbox, Form, Input} from 'antd';
import "bootstrap/dist/css/bootstrap.min.css"
import { LoginAPI } from '../../../services/api'

export default function Login() {

    const onFinish = (values) => {
        LoginAPI({
            email: values.email,
            password: values.password
        }).then()
    };

    return (
        <div className="Auth-form-container">
            <Form
                className="Auth-form"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Login</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <a href="/signup" className="link-primary">Sign Up</a>
                    </div>

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

                    <p></p>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>

                    <p className="text-center mt-2">
                        <a href="https://www.google.com">Forgot password?</a>
                    </p>

                </div>
            </Form>
        </div>
    )
}