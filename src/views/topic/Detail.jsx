import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Form, Input} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class TopicDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topic: {
                topic_image: [],
                topic_like_list: [],
                topic_comment_list: []
            }
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/topic/index');

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
            url: '/topic/find',
            data: {
                topic_id: self.props.params.topic_id
            },
            success: function (data) {
                self.setState({
                    topic: data
                });

                if (self.props.route.path.indexOf('/edit') > -1) {
                    self.props.form.setFieldsValue(data);
                }
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

        const likeColumns = [{
            title: '会员姓名',
            dataIndex: 'member.member_name',
            key: 'member_name'
        }, {
            width: 150,
            title: '创建时间',
            dataIndex: 'system_create_time',
            key: 'system_create_time'
        }];

        const commentColumns = [{
            width: 100,
            title: '会员姓名',
            dataIndex: 'member.member_name',
            key: 'member_name'
        }, {
            title: '评论',
            dataIndex: 'topic_comment_text',
            key: 'topic_comment_text'
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
                        <h2>红圈表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="图片">
                        {
                            this.state.topic.topic_image.map(function (item, index) {
                                return (
                                    <img key={index} src={Helper.host + item} style={{
                                        width: 100,
                                        height: 100,
                                        marginRight: 5
                                    }}/>
                                )
                            }.bind(this))
                        }
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="内容">
                        {getFieldDecorator('topic_text', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Input type="textarea" rows={5} style={{
                                width: '100%'
                            }} placeholder="请输入内容"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="点赞">
                        <Table columns={likeColumns} dataSource={this.state.topic.topicLikeList} pagination={false} size="small" bordered/>
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="评论">
                        <Table columns={commentColumns} dataSource={this.state.topic.topicCommentList} pagination={false} size="small" bordered/>
                    </FormItem>
                    <FormItem wrapperCol={{
                        offset: Helper.formItemLayout.labelCol.span
                    }}>
                        <Button type="primary" icon="check-circle" size="default"
                                onClick={this.onClickSubmit.bind(this)}>确定</Button>
                    </FormItem>
                    <br />
                    <br />
                    <br />
                </Form>
            </div>
        )
    }
}

TopicDetail = Form.create({})(TopicDetail);

export default withRouter(connect((state) => state, {
    setAction
})(TopicDetail));