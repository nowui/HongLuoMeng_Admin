import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Popconfirm, Form, Input, Tag} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_MEMBER} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class MemberIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.memberReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/member/index');

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_MEMBER, {
            page: this.state.page,
        });
    }

    onChange = function (currentPage) {
        this.load(currentPage);
    }

    load = function (currentPage) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/member/list',
            data: {
                page: currentPage,
                limit: Helper.limit,
                member_name: self.props.form.getFieldValue('member_name')
            },
            success: function (data) {
                self.setState({
                    page: currentPage,
                    total: data.total,
                    list: data.list
                });
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    onClickSearch() {
        this.load(1);
    }

    onClickEdit(member_id) {
        this.props.router.push({
            pathname: '/member/edit/' + member_id,
            query: {}
        });
    }

    onClickDel(member_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/member/delete',
            data: {
                member_id: member_id
            },
            success: function () {
                Helper.notificationSuccess();

                self.load(self.state.page);
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

        const columns = [{
            title: '名称',
            dataIndex: 'member_name',
            key: 'member_name'
        }, {
            width: 100,
            title: '真是姓名',
            dataIndex: 'member_real_name',
            key: 'member_real_name'
        }, {
            width: 100,
            title: '微博粉丝数',
            dataIndex: 'member_weibo_fans',
            key: 'member_weibo_fans'
        }, {
            width: 100,
            title: '会员审核状态',
            dataIndex: 'member_status',
            key: 'member_status',
            render: (text, record, index) => (
                record.member_status ?
                    '通过'
                    :
                    <span style={{
                        color: '#f50'
                    }}>待审核</span>
            )
        }, {
            width: 100,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  <a onClick={this.onClickEdit.bind(this, record.member_id)}>查看</a>
                  <span className="ant-divider"/>
                  <Popconfirm title={Helper.delete} okText={Helper.yes} cancelText={Helper.no}
                              onConfirm={this.onClickDel.bind(this, record.member_id)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
            )
        }];

        const pagination = {
            current: this.state.page,
            total: this.state.total,
            pageSize: Helper.limit,
            onChange: this.onChange.bind(this)
        };

        return (
            <div>
                <Row className={styles.contentTitle}>
                    <Col span={12}>
                        <h2>会员列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                    </Col>
                </Row>

                <Form horizontal className={styles.contentSearch}>
                    <Row>
                        <Col sm={8}>
                            <FormItem {...Helper.formItemSearchLayout} label="会员名称" className={styles.contentSearchFormItem}>
                                {getFieldDecorator('member_name', {
                                    initialValue: ''
                                })(
                                    <Input type="text" style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="请输入会员名称"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                        </Col>
                        <Col sm={8} style={{
                            textAlign: 'right'
                        }}>
                            <Button type="ghost" icon="search" size="default" className="button-reload"
                                    onClick={this.onClickSearch.bind(this)}>搜索</Button>
                        </Col>
                    </Row>
                </Form>

                <div className={styles.contentSearchMain + ' ' + styles.contentMainSearchPaddingTop}>
                    <Table columns={columns} dataSource={this.state.list} pagination={pagination} bordered/>
                </div>
            </div>
        )
    }
}

MemberIndex = Form.create({})(MemberIndex);

export default withRouter(connect((state) => state, {
    setAction
})(MemberIndex));