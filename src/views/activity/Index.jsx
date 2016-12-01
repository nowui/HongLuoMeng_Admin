import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_ACTIVITY} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class ActivityIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.activityReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/activity/index');

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_ACTIVITY, {
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
            url: '/activity/list',
            data: {
                page: currentPage,
                limit: Helper.limit
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

    onClickAdd(event) {
        this.props.router.push({
            pathname: '/activity/add',
            query: {}
        });
    }

    onClickEdit(activity_id) {
        this.props.router.push({
            pathname: '/activity/edit/' + activity_id,
            query: {}
        });
    }

    onClickDel(activity_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/activity/delete',
            data: {
                activity_id: activity_id
            },
            success: function (data) {
                self.load(self.props.activityReducer.page);
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    render() {
        const columns = [{
            title: '名称',
            dataIndex: 'activity_name',
            key: 'activity_name'
        }, {
            width: 100,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  <a onClick={this.onClickEdit.bind(this, record.activity_id)}>修改</a>
                  <span className="ant-divider"/>
                  <Popconfirm title={Helper.delete} okText={Helper.yes} cancelText={Helper.no}
                              onConfirm={this.onClickDel.bind(this, record.activity_id)}>
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
                        <h2>活动列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button type="default" icon="reload" size="default" className={styles.buttonReload}
                                onClick={this.load.bind(this, this.state.page)}>刷新</Button>
                        <Button type="primary" icon="plus-circle" size="default"
                                onClick={this.onClickAdd.bind(this)}>新增</Button>
                    </Col>
                </Row>

                <div>
                    <Table columns={columns} dataSource={this.state.list} pagination={pagination} scroll={{ y: 510 }}/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect((state) => state, {
    setAction
})(ActivityIndex));