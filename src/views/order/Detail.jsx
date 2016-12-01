import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class OrderDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.onSelectMenu('/order/index');

        this.props.form.setFieldsValue({});

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
            url: '/order/find',
            data: {
                order_id: self.props.params.order_id
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

        this.props.router.goBack();
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
                    <Col span={12}>
                        <h2>订单表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="订单号">
                        {getFieldDecorator('order_no')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入订单号"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="订单价格">
                        {getFieldDecorator('order_pay_price')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入订单价格"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="收货人姓名">
                        {getFieldDecorator('order_delivery_name')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入收货人姓名"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="收货人电话">
                        {getFieldDecorator('order_delivery_phone')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入收货人电话"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="收货省份">
                        {getFieldDecorator('order_delivery_province')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入收货省份"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="收货城市">
                        {getFieldDecorator('order_delivery_city')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入收货城市"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="收货地区">
                        {getFieldDecorator('order_delivery_area')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入收货地区"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="收货详细地址">
                        {getFieldDecorator('order_delivery_address')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入收货详细地址"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="收货邮编">
                        {getFieldDecorator('order_delivery_zip')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入收货邮编"/>
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

OrderDetail = Form.create({})(OrderDetail);

export default withRouter(connect((state) => state, {
    setAction
})(OrderDetail));