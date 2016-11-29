import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_CATEGORY_ATTRIBUTE} from '../../../commons/Constant';
import {setAction} from '../../../actions/Index';
import Helper from '../../../commons/Helper';

import styles from '../../Style.less';

class CategoryAttributeIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.categoryAttributeReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_CATEGORY_ATTRIBUTE, {
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
            url: '/product/category/attribute/list',
            data: {
                page: currentPage,
                limit: Helper.limit,
                category_id: self.props.category_id
            },
            success: function (data) {
                self.setState({
                    page: currentPage,
                    total: data.total,
                    list: data
                });
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    del = function (attribute_id) {

    }

    onClickAdd(event) {
        this.props.router.push({
            pathname: '/product/category/attribute/add/' + this.props.category_id,
            query: {}
        });
    }

    onClickBack(event) {
        event.preventDefault();

        this.props.router.goBack();
    }

    onClickEdit(attribute_id) {
        this.props.router.push({
            pathname: '/product/category/attribute/edit/' + this.props.category_id + '/' + attribute_id,
            query: {}
        });
    }

    onClickDel(attribute_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/product/category/attribute/delete',
            data: {
                category_id: self.props.category_id,
                attribute_id: attribute_id
            },
            success: function () {
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
                  <span className="ant-divider"/>
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
                        <h2>{this.props.name}列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" className={styles.buttonReload}
                                onClick={this.onClickBack.bind(this)}>返回</Button>
                        <Button type="default" icon="reload" size="default" className={styles.buttonReload}
                                onClick={this.load.bind(this, this.state.page)}>刷新</Button>
                        <Button type="primary" icon="plus-circle" size="default"
                                onClick={this.onClickAdd.bind(this)}>新增</Button>
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
})(CategoryAttributeIndex));