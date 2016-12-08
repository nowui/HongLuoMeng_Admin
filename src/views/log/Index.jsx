import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Form, Input, Select} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_LOG} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class LogIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.logReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/log/index');

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_LOG, {
            page: this.state.page
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
            url: '/log/list',
            data: {
                page: currentPage,
                limit: Helper.limit,
                log_url: self.props.form.getFieldValue('log_url'),
                log_code: self.props.form.getFieldValue('log_code'),
                log_platform: self.props.form.getFieldValue('log_platform')
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

    onClickEdit(log_id) {
        this.props.router.push({
            pathname: '/log/edit/' + log_id,
            query: {}
        })
    }

    render() {
        const FormItem = Form.Item;
        const Option = Select.Option;
        const {getFieldDecorator} = this.props.form;

        const columns = [{
            title: '请求地址',
            dataIndex: 'log_url',
            key: 'log_url'
        }, {
            width: 150,
            title: '请求时间',
            dataIndex: 'log_create_time',
            key: 'log_create_time'
        }, {
            width: 100,
            title: '平台',
            dataIndex: 'log_platform',
            key: 'log_platform'
        }, {
            width: 100,
            title: '状态',
            dataIndex: 'log_code',
            key: 'log_code'
        }, {
            width: 100,
            title: '耗时(毫秒)',
            dataIndex: 'log_run_time',
            key: 'log_run_time'
        }, {
            width: 100,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
              <a onClick={this.onClickEdit.bind(this, record.log_id)}>查看</a>
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
                        <h2>日志列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button type="default" icon="search" size="default"
                                onClick={this.onClickSearch.bind(this)}>搜索</Button>
                    </Col>
                </Row>

                <Form horizontal className={styles.contentSearch}>
                    <Row>
                        <Col sm={8}>
                            <FormItem {...Helper.formItemSearchLayout} label="请求地址" className={styles.contentSearchFormItem}>
                                {getFieldDecorator('log_url', {
                                    initialValue: ''
                                })(
                                    <Input type="text" style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="请输入请求地址"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...Helper.formItemSearchLayout} label="响应状态" className={styles.contentSearchFormItem}>
                                {getFieldDecorator('log_code', {
                                    initialValue: ''
                                })(
                                    <Select style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="响应状态">
                                        <Option key="0" value="">全部</Option>
                                        <Option key="200" value="200">200</Option>
                                        <Option key="400" value="400">400</Option>
                                        <Option key="500" value="500">500</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...Helper.formItemSearchLayout} label="请求平台" className={styles.contentSearchFormItem}>
                                {getFieldDecorator('log_platform', {
                                    initialValue: ''
                                })(
                                    <Select style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="请求平台">
                                        <Option key="0" value="">全部</Option>
                                        <Option key="IOS" value="IOS">IOS</Option>
                                        <Option key="WEB" value="WEB">WEB</Option>
                                        <Option key="ADMIN" value="ADMIN">ADMIN</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>

                <div className={styles.contentMainPaddingTop}>
                    <Table columns={columns} dataSource={this.state.list} pagination={pagination} bordered/>
                </div>
            </div>
        )
    }
}

LogIndex = Form.create({})(LogIndex);

export default withRouter(connect((state) => state, {
    setAction
})(LogIndex));