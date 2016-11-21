import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input, InputNumber} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class CategoryDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLanch: true,
            category: {}
        }
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            parent_id: '',
            category_sort: 0
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isLanch) {
            this.setState({
                isLanch: false
            });

            if (this.props.category_id != '') {
                this.load();
            }
        }
    }

    load = function () {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        let url = '';

        if (this.props.category_key == '') {
            url += self.props.sub_url + '/find';
        } else {
            url += '/' + self.props.category_key + self.props.sub_url + '/find';
        }

        Helper.ajax({
            url: url,
            data: {
                category_id: self.props.category_id
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

            if (self.props.category_id != '') {
                values.category_id = self.props.category_id;
            } else {
                values.parent_id = self.props.parent_id;
            }

            let type = self.props.category_id != '' ? 'update' : 'save';

            let url = '';

            if (this.props.category_key == '') {
                url += self.props.sub_url + '/' + type;
            } else {
                url += '/' + self.props.category_key + self.props.sub_url + '/' + type;
            }

            Helper.ajax({
                url: url,
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
                        <h1>{this.props.category_name}表单</h1>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    {getFieldDecorator('parent_id')(
                        <Input type="hidden"/>
                    )}
                    <FormItem {...Helper.formItemLayout} label="名称">
                        {getFieldDecorator('category_name', {
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
                        {getFieldDecorator('category_key')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入键值"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="数值">
                        {getFieldDecorator('category_value')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入数值"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="描述">
                        {getFieldDecorator('category_description')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入描述"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="排序">
                        {getFieldDecorator('category_sort', {
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

CategoryDetail = Form.create({})(CategoryDetail);

export default withRouter(connect((state) => state, {
    setAction
})(CategoryDetail));