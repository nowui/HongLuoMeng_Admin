import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Form, Input} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class MemberDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            member: {
                member_avatar: '',
                topic_like_list: []
            }
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/member/index');

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
            url: '/member/find',
            data: {
                member_id: self.props.params.member_id
            },
            success: function (data) {
                self.setState({
                    member: data
                });

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
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/member/status/update',
            data: {
                member_id: self.props.params.member_id
            },
            success: function (data) {
                self.props.router.goBack();
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        const brandColumns = [{
            title: '品牌名称',
            dataIndex: 'brand_name',
            key: 'brand_name'
        }, {
            width: 100,
            title: '申请状态',
            dataIndex: 'brand_apply_review_status',
            key: 'brand_apply_review_status'
        }, {
            width: 150,
            title: '申请时间',
            dataIndex: 'system_create_time',
            key: 'system_create_time'
        }, {
            width: 150,
            title: '失效时间',
            dataIndex: 'brand_apply_expire_time',
            key: 'brand_apply_expire_time'
        }];

        const orderColumns = [{
            title: '订单编号',
            dataIndex: 'order_no',
            key: 'order_no'
        }, {
            width: 100,
            title: '订单状态',
            dataIndex: 'order_status',
            key: 'order_status'
        }, {
            width: 100,
            title: '订单价格',
            dataIndex: 'order_pay_price',
            key: 'order_pay_price'
        }, {
            width: 100,
            title: '商品数量',
            dataIndex: 'order_product_pay_amount',
            key: 'order_product_pay_amount'
        }, {
            width: 150,
            title: '创建时间',
            dataIndex: 'system_create_time',
            key: 'system_create_time'
        }];

        return (
            <div>
                <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
                    <Col span={12}>
                        <h2>会员表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <h3>个人信息</h3>
                    <FormItem {...Helper.formItemLayout} label="名称">
                        {getFieldDecorator('member_name')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入名称"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="头像">
                        {
                            typeof(this.state.member.member_avatar) == 'undefined' ?
                                ''
                                :
                                <img src={this.state.member.member_avatar.large} style={{
                                    width: Helper.inputWidth
                                }}/>
                        }
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="真实姓名">
                        {getFieldDecorator('member_real_name')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入真实姓名"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="身份证号码">
                        {getFieldDecorator('member_identity_card')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入身份证号码"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="身份证照片正面">
                        {
                            typeof(this.state.member.member_identity_card_front_image) == 'undefined' ?
                                ''
                                :
                                <img src={this.state.member.member_identity_card_front_image} style={{
                                    width: Helper.inputWidth
                                }}/>
                        }
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="身份证照片反面">
                        {
                            typeof(this.state.member.member_identity_card_back_image) == 'undefined' ?
                                ''
                                :
                                <img src={this.state.member.member_identity_card_back_image} style={{
                                    width: Helper.inputWidth
                                }}/>
                        }
                    </FormItem>
                    <h3>账户信息</h3>
                    <FormItem {...Helper.formItemLayout} label="登录帐号">
                        {getFieldDecorator('user_phone')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入登录帐号"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="微信帐号">
                        {getFieldDecorator('wechat_uid')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入微信帐号"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="微博帐号">
                        {getFieldDecorator('weibo_uid')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入微博帐号"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="微博粉丝数">
                        {getFieldDecorator('member_weibo_fans')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入微博粉丝数"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="会员等级">
                        {getFieldDecorator('member_level_id')(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入会员等级"/>
                        )}
                    </FormItem>
                    <h3>用户数据</h3>
                    <FormItem {...Helper.formItemLayout} label="品牌代理">
                        <Table columns={brandColumns} dataSource={this.state.member.topicLikeList} pagination={false} size="small" bordered/>
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="采购订单">
                        <Table columns={orderColumns} dataSource={this.state.member.topicLikeList} pagination={false} size="small" bordered/>
                    </FormItem>
                    <FormItem wrapperCol={{
                        offset: Helper.formItemLayout.labelCol.span
                    }}>
                        {
                            this.state.member.member_status ?
                                ''
                                :
                                <Button type="primary" icon="check-circle" size="default"
                                        onClick={this.onClickSubmit.bind(this)}>通过该会员的申请</Button>
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }
}

MemberDetail = Form.create({})(MemberDetail);

export default withRouter(connect((state) => state, {
    setAction
})(MemberDetail));