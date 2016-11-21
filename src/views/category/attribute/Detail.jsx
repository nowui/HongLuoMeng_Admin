import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Select, InputNumber} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../../commons/Constant';
import {setAction} from '../../../actions/Index';
import Helper from '../../../commons/Helper';

import styles from '../../Style.less';

class CategoryAttributeDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            attributeList: []
        }
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            category_attribute_sort: 10
        });

        this.load();
    }

    load = function () {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/product/category/attribute/find',
            data: {
                category_id: self.props.category_id,
                attribute_id: self.props.attribute_id
            },
            success: function (data) {
                self.props.form.setFieldsValue(data);

                self.setState({
                    attributeList: data.attributeList
                });
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

            let type = self.props.attribute_id != null ? 'update' : 'save';

            values.category_id = self.props.category_id;

            Helper.ajax({
                url: '/product/category/attribute/' + type,
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
                        <h2>{this.props.name}表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="属性">
                        {getFieldDecorator('attribute_id', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Select style={{
                                width: Helper.inputWidth
                            }} placeholder="请选择分类">
                                {
                                    this.state.attributeList.map(function (item, index) {
                                        return (
                                            <Option key={item.attribute_id}
                                                    value={item.attribute_id}>{item.attribute_name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="排序">
                        {getFieldDecorator('category_attribute_sort', {
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

CategoryAttributeDetail = Form.create({})(CategoryAttributeDetail);

export default withRouter(connect((state) => state, {
    setAction
})(CategoryAttributeDetail));