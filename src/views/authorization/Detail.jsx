import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class AuthorizationDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.onSelectMenu('/authorization/index');

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
            url: '/authorization/find',
            data: {
                authorization_id: self.props.params.authorization_id
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
                        <h2>授权表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="授权令牌">
                        {getFieldDecorator('authorization_token')(
                            <Input type="textarea" rows={8} style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入授权令牌"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="创建时间">
                        {getFieldDecorator('authorization_create_time')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入创建时间"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="失效时间">
                        {getFieldDecorator('authorization_expire_time')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入失效时间"/>
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

AuthorizationDetail = Form.create({})(AuthorizationDetail);

export default withRouter(connect((state) => state, {
    setAction
})(AuthorizationDetail));