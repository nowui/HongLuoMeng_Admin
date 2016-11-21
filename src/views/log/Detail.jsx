import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class LogDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.onSelectMenu('/log/index');

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
            url: '/log/find',
            data: {
                log_id: this.props.params.log_id
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
                        <h2>日志表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="请求地址">
                        {getFieldDecorator('log_url')(
                            <Input type="text" disabled={true} style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入请求地址"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="请求数据">
                        {getFieldDecorator('log_request')(
                            <Input type="textarea" rows={8} disabled={true} style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入请求参数"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="返回数据">
                        {getFieldDecorator('log_response')(
                            <Input type="textarea" rows={8} disabled={true} style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入返回数据"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="请求状态">
                        {getFieldDecorator('log_code')(
                            <Input type="text" disabled={true} style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入请求状态"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="请求终端">
                        {getFieldDecorator('log_platform')(
                            <Input type="text" disabled={true} style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入请求状态"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="请求版本">
                        {getFieldDecorator('log_version')(
                            <Input type="text" disabled={true} style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入请求版本"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="IP地址">
                        {getFieldDecorator('log_ip_address')(
                            <Input type="text" disabled={true} style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入IP地址"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="请求时间">
                        {getFieldDecorator('log_create_time')(
                            <Input type="text" disabled={true} style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入请求时间"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="耗时(毫秒)">
                        {getFieldDecorator('log_run_time')(
                            <Input type="text" disabled={true} style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入耗时"/>
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

LogDetail = Form.create({})(LogDetail);

export default withRouter(connect((state) => state, {
    setAction
})(LogDetail));