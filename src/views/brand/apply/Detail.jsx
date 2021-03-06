import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input, Select} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../../commons/Constant';
import {setAction} from '../../../actions/Index';

import Helper from '../../../commons/Helper';

import styles from '../../Style.less';

class BrandDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            member_identity_card_front_image: '',
            member_identity_card_back_image: '',
            brand_apply_review_status: ''
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/brand/apply/index');

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
            url: '/brand/apply/find',
            data: {
                brand_id: self.props.params.brand_id,
                user_id: self.props.params.user_id
            },
            success: function (data) {
                self.props.form.setFieldsValue(data);
                self.props.form.setFieldsValue({
                    brand_name: data.brand.brand_name
                });

                self.setState({
                    member_identity_card_front_image: data.member_identity_card_front_image,
                    member_identity_card_back_image: data.member_identity_card_back_image,
                    brand_apply_review_status: data.brand_apply_review_status
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

    onClickPass(event) {
        event.preventDefault();

        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/brand/apply/pass',
            data: {
                brand_id: self.props.params.brand_id,
                user_id: self.props.params.user_id
            },
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
    }

    onClickRefuse(event) {
        event.preventDefault();

        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/brand/apply/refuse',
            data: {
                brand_id: self.props.params.brand_id,
                user_id: self.props.params.user_id
            },
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
    }

    onChangeCategory(value) {
        this.props.form.setFieldsValue({
            category_id: value
        });
    }

    onChangeImage(list) {
        this.setState({
            brand_logo: list
        });
    }

    onChangeContent(content) {
        this.setState({
            brand_agreement: content
        });
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
                    <Col span={12}>
                        <h2>品牌代理申请表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <h3>基本信息</h3>
                    <FormItem {...Helper.formItemLayout} label="申请品牌">
                        {getFieldDecorator('brand_name', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入品牌名称"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="签约时间">
                        {getFieldDecorator('apply_time', {
                            initialValue: '三个月'
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入品牌名称"/>
                        )}
                    </FormItem>
                    <div className={styles.hr}></div>
                    <h3>个人资料</h3>
                    <FormItem {...Helper.formItemLayout} label="申请人">
                        {getFieldDecorator('member_real_name', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入申请人"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="身份证">
                        {getFieldDecorator('member_identity_card', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入身份证"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="身份证照片正面">
                        {
                            this.state.member_identity_card_front_image == '' ?
                                ''
                                :
                                <img src={Helper.host + this.state.member_identity_card_front_image} style={{
                                    width: Helper.inputWidth
                                }}/>
                        }
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="身份证照片反面">
                        {
                            this.state.member_identity_card_back_image == '' ?
                                ''
                                :
                                <img src={Helper.host + this.state.member_identity_card_back_image} style={{
                                    width: Helper.inputWidth
                                }}/>
                        }
                    </FormItem>
                    <div className={styles.hr}></div>
                    <h3>会员信息</h3>
                    <FormItem {...Helper.formItemLayout} label="会员姓名">
                        {getFieldDecorator('member_name', {
                            initialValue: ''
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入会员姓名"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="微博粉丝数">
                        {getFieldDecorator('member_weibo_fans', {
                            initialValue: ''
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入微博粉丝数"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="微博好友数">
                        {getFieldDecorator('member_weibo_friend', {
                            initialValue: ''
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入微好友丝数"/>
                        )}
                    </FormItem>
                    {
                        this.state.brand_apply_review_status == 'WAIT' ?
                            <FormItem wrapperCol={{
                                offset: Helper.formItemLayout.labelCol.span
                            }}>
                                <Button type="primary" icon="check-circle" size="default"
                                        onClick={this.onClickPass.bind(this)}>通过</Button>
                                <Button type="ghost" icon="close-circle" size="default" style={{
                                    marginLeft: '20px'
                                }} onClick={this.onClickRefuse.bind(this)}>拒绝</Button>
                            </FormItem>
                            :
                            ''
                    }
                    <br />
                    <br />
                    <br />
                </Form>
            </div>
        )
    }
}

BrandDetail = Form.create({})(BrandDetail);

export default withRouter(connect((state) => state, {
    setAction
})(BrandDetail));