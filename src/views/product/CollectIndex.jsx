import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_PRODUCT_COLLECT} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class CollectIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.productCollectReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/product/collect/index');

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_PRODUCT_COLLECT, {
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
            url: '/product/collect/list',
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

    onClickDel(topic_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/topic/delete',
            data: {
                topic_id: topic_id
            },
            success: function (data) {
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
        const columns = [{
            width: 150,
            title: '会员姓名',
            dataIndex: 'member_name',
            key: 'member_name'
        }, {
            title: '商品名称',
            dataIndex: 'product_name',
            key: 'product_name'
        }, {
            width: 150,
            title: '创建时间',
            dataIndex: 'system_create_time',
            key: 'system_create_time'
        }, {
            width: 100,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  {/*<span className="ant-divider"/>*/}
                  {/*<Popconfirm title={Helper.delete} okText={Helper.yes} cancelText={Helper.no}*/}
                              {/*onConfirm={this.onClickDel.bind(this, record.topic_id)}>*/}
                    {/*<a>删除</a>*/}
                  {/*</Popconfirm>*/}
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
                        <h2>商品收藏列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button type="default" icon="reload" size="default"
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
})(CollectIndex));