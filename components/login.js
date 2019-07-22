import React from 'react'
import Link from 'next/link'
import { Form, Icon, Input, Button, Checkbox,Row, Col } from 'antd';
import Axios from 'axios';


class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        Axios.get("/a",values)
        

      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <Row gutter={16}>
        <Col span={8}></Col> 
        <Col span={8}>
          <div className="">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
            <style jsx>{`
              .login-form {
                max-width: 10px;
              }
              .login-form-forgot {
                float: center;
              }
              .login-form-button {
                width: 100%;
              }
            `}</style>
          </div>          
        </Col> 
        <Col span={8}></Col> 
      </Row>

      

      
    );
  }
}


const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login


