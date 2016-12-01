import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_ATTRIBUTE} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class AttributeIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.attributeReducer.page,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/attribute/index');

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_ATTRIBUTE, {
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
            url: '/attribute/list',
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
            pathname: '/attribute/add',
            query: {}
        });
    }

    onClickEdit(attribute_id) {
        this.props.router.push({
            pathname: '/attribute/edit/' + attribute_id,
            query: {}
        });
    }

    onClickDel(attribute_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/attribute/delete',
            data: {
                attribute_id: attribute_id
            },
            success: function (data) {
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
            title: '名称',
            dataIndex: 'attribute_name',
            key: 'attribute_name'
        }, {
            title: '类型',
            dataIndex: 'attribute_type',
            key: 'attribute_type'
        }, {
            width: 150,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  <a onClick={this.onClickEdit.bind(this, record.attribute_id)}>修改</a>
                  <span className="ant-divider"></span>
                  <Popconfirm title={Helper.delete} okText={Helper.yes} cancelText={Helper.no}
                              onConfirm={this.onClickDel.bind(this, record.attribute_id)}>
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
                        <h2>属性列表</h2>
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
})(AttributeIndex));