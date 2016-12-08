import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Spin, Form, Input, Button, Icon} from 'antd';

import Helper from '../commons/Helper';

import styles from './Login.less';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoad: false,
            user_account: '',
            user_password: ''
        }
    }

    componentDidMount() {
        this.props.form.setFieldsValue(this.state);
    }

    onClickSubmit(event) {
        event.preventDefault();

        let self = this;

        self.setState({
            isLoad: true
        });

        self.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }

            Helper.ajax({
                url: '/admin/login',
                data: values,
                success: function (data) {
                    Helper.login(data.token, data.admin_name);

                    Helper.notificationSuccessMessage("登录成功");

                    setTimeout(function () {
                        self.props.router.push({
                            pathname: '/index',
                            query: {}
                        });
                    }, 100);
                },
                complete: function () {
                    self.setState({
                        isLoad: false
                    });
                }
            });
        });
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        return (
            <Spin size="large" spinning={this.state.isLoad} tip="正在加载中...">
                <div className={styles.login}>
                    <Form horizontal>
                        <FormItem >
                            {getFieldDecorator('user_account', {
                                rules: [{
                                    required: true,
                                    message: Helper.required
                                }]
                            })(
                                <Input addonBefore={<Icon type="user"/>} type="text" placeholder="请输入帐号"
                                       onPressEnter={this.onClickSubmit.bind(this)}/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('user_password', {
                                rules: [{
                                    required: true,
                                    message: Helper.required
                                }]
                            })(
                                <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="请输入密码"
                                       onPressEnter={this.onClickSubmit.bind(this)}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" size="large" style={{
                                width: '100%'
                            }}
                                    onClick={this.onClickSubmit.bind(this)}>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Spin>
        )
    }
}

Login = Form.create({})(Login);

export default withRouter(Login);