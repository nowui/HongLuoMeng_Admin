import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input} from 'antd';
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
                member_avatar: ''
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
                    <FormItem {...Helper.formItemLayout} label="名称">
                        {getFieldDecorator('member_name')(
                            <Input type="text" disabled={true} style={{
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