import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input, Select, InputNumber} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class AttributeDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.onSelectMenu('/attribute/index');

        this.props.form.setFieldsValue({
            attribute_sort: 0
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
            url: '/attribute/find',
            data: {
                attribute_id: self.props.params.attribute_id
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

            let type = self.props.route.path.indexOf('/edit') > -1 ? 'update' : 'save';

            values.attribute_id = self.props.params.attribute_id;

            Helper.ajax({
                url: '/attribute/' + type,
                data: values,
                success: function (data) {
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
        const Option = Select.Option;
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
                    <Col span={12}>
                        <h2>属性表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="属性名称">
                        {getFieldDecorator('attribute_name', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入属性名称"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="类型">
                        {getFieldDecorator('attribute_type', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Select style={{
                                width: Helper.inputWidth
                            }} placeholder="请选类型">
                                <Option value="NORMAL">NORMAL</Option>
                                <Option value="SKU">SKU</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="输入框">
                        {getFieldDecorator('attribute_input_type', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Select style={{
                                width: Helper.inputWidth
                            }} placeholder="请选输入框">
                                <Option value="TEXT">TEXT</Option>
                                <Option value="SELECT">SELECT</Option>
                                <Option value="NUMBER">NUMBER</Option>
                                <Option value="DATETIME">DATETIME</Option>
                                <Option value="IMAGE">IMAGE</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="默认值">
                        {getFieldDecorator('attribute_default_value')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入默认值"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="排序">
                        {getFieldDecorator('attribute_sort', {
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

AttributeDetail = Form.create({})(AttributeDetail);

export default withRouter(connect((state) => state, {
    setAction
})(AttributeDetail));