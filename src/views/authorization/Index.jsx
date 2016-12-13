import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_AUTHORIZATION} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class AuthorizationIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.authorizationReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/authorization/index');

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_AUTHORIZATION, {
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
            url: '/authorization/list',
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

    onClicReload() {
        this.load(this.state.page);
    }

    onClickEdit(authorization_id) {
        this.props.router.push({
            pathname: '/authorization/edit/' + authorization_id,
            query: {}
        });
    }

    render() {
        const columns = [{
            title: '授权用户',
            dataIndex: 'user_id',
            key: 'user_id'
        }, {
            width: 150,
            title: '创建时间',
            dataIndex: 'authorization_create_time',
            key: 'authorization_create_time'
        }, {
            width: 150,
            title: '过期时间',
            dataIndex: 'authorization_expire_time',
            key: 'authorization_expire_time'
        }, {
            width: 100,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  <a onClick={this.onClickEdit.bind(this, record.authorization_id)}>查看</a>
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
                        <h2>授权列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button type="default" icon="reload" size="default" className="button-reload"
                                onClick={this.onClicReload.bind(this)}>刷新</Button>
                    </Col>
                </Row>

                <div className={styles.contentMain}>
                    <Table columns={columns} dataSource={this.state.list} pagination={pagination} bordered/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect((state) => state, {
    setAction
})(AuthorizationIndex));