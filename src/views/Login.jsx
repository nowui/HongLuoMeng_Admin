import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Spin, Form, Input, Button} from 'antd';

import Helper from '../commons/Helper';

import styles from './Login.less';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoad: false,
            user_account: 'admin',
            user_password: 'admin'
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
                    Helper.login(data.token);

                    Helper.notificationSuccess("登录成功");

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
                        <FormItem {...Helper.formItemLayout} label="帐号">
                            {getFieldDecorator('user_account', {
                                rules: [{
                                    required: true,
                                    message: Helper.required
                                }]
                            })(
                                <Input type="text" placeholder="请输入帐号"/>
                            )}
                        </FormItem>
                        <FormItem {...Helper.formItemLayout} label="密码">
                            {getFieldDecorator('user_password', {
                                rules: [{
                                    required: true,
                                    message: Helper.required
                                }]
                            })(
                                <Input type="password" placeholder="请输入密码"/>
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{
                            offset: Helper.formItemLayout.labelCol.span
                        }}>
                            <Button type="primary" icon="check-circle" size="default"
                                    onClick={this.onClickSubmit.bind(this)}>确定</Button>
                        </FormItem>
                    </Form>
                </div>
            </Spin>
        )
    }
}

Login = Form.create({})(Login);

export default withRouter(Login);