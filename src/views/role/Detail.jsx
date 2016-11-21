import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input, InputNumber} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class RoleDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.onSelectMenu('/role/index');

        this.props.form.setFieldsValue({
            role_sort: 0
        });

        if (this.props.route.path.indexOf('/edit') > -1) {
            this.load();
        }
    }

    load = function () {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/role/find',
            data: {
                role_id: self.props.params.role_id
            },
            success: function (data) {
                self.props.form.setFieldsValue(data);
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    onClickBack(event) {
        event.preventDefault();

        this.props.router.goBack();
    }

    onClickSubmit(event) {
        event.preventDefault();

        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }

            let self = this;

            self.props.setAction(SET_SPIN, {
                isLoad: true
            });

            let type = '';

            if (self.props.route.path.indexOf('/edit') > -1) {
                type = 'update';

                values.role_id = self.props.params.role_id;
            } else {
                type = 'save';

                values.group_id = self.props.params.group_id;
            }


            Helper.ajax({
                url: '/role/' + type,
                data: values,
                success: function () {
                    Helper.notificationSuccess();

                    self.props.router.goBack();
                },
                complete: function () {
                    self.props.setAction(SET_SPIN, {
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
            <div>
                <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
                    <Col span={12}>
                        <h2>角色表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="名称">
                        {getFieldDecorator('role_name', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入名称"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="键值">
                        {getFieldDecorator('role_key')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入键值"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="数值">
                        {getFieldDecorator('role_value')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入数值"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="排序">
                        {getFieldDecorator('role_sort', {
                            rules: [{
                                type: 'number',
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <InputNumber style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入排序" min={0} max={99}/>
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
        )
    }
}

RoleDetail = Form.create({})(RoleDetail);

export default withRouter(connect((state) => state, {
    setAction
})(RoleDetail));