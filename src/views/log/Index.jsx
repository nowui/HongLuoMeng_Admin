import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button} from 'antd';
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
            url: '/log/list',
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

    onClickEdit(log_id) {
        this.props.router.push({
            pathname: '/log/edit/' + log_id,
            query: {}
        })
    }

    render() {
        const columns = [{
            title: '请求地址',
            dataIndex: 'log_url',
            key: 'log_url'
        }, {
            title: '请求时间',
            dataIndex: 'log_create_time',
            key: 'log_create_time'
        }, {
            title: '平台',
            dataIndex: 'log_platform',
            key: 'log_platform'
        }, {
            title: '状态',
            dataIndex: 'log_code',
            key: 'log_code'
        }, {
            title: '耗时(毫秒)',
            dataIndex: 'log_run_time',
            key: 'log_run_time'
        }, {
            width: 150,
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
                        <Button type="default" icon="reload" size="default"
                                onClick={this.load.bind(this, this.state.page)}>刷新</Button>
                    </Col>
                </Row>

                <div className={styles.contentMain}>
                    <Table columns={columns} dataSource={this.state.list} pagination={pagination}/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect((state) => state, {
    setAction
})(LogIndex));