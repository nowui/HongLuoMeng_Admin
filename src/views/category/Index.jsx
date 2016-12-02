import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import {Row, Col, Table, Button, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_CATEGORY} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class CategoryIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.categoryReducer.page,
            category: {},
            expandedRowKeys: []
        }
    }

    componentDidMount() {
        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_CATEGORY, {
            page: this.state.page,
        });
    }

    load = function (currentPage) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        let url = '';

        if (self.props.category_key == '') {
            url += self.props.sub_url + '/list';
        } else {
            url += '/' + self.props.category_key + self.props.sub_url + '/list';
        }


        Helper.ajax({
            url: url,
            data: {
                page: currentPage,
                limit: Helper.limit,
                category_key: self.props.category_key
            },
            success: function (data) {
                self.checkList(data.children)

                self.setState({
                    page: currentPage,
                    category: data
                });
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    checkList(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].key = list[i].id;

            this.setState({
                expandedRowKeys: this.state.expandedRowKeys.concat(list[i].id)
            });

            if (list[i].children) {
                this.checkList(list[i].children);
            }
        }
    }

    onClickAdd(parent_id) {
        let url = '';

        if (this.props.category_key == '') {
            url += this.props.sub_url + '/add';
        } else {
            url += '/' + this.props.category_key + this.props.sub_url + '/add/' + parent_id;
        }

        this.props.router.push({
            pathname: url,
            query: {}
        });
    }

    onClickEdit(category_id) {
        let url = '';

        if (this.props.category_key == '') {
            url += this.props.sub_url + '/edit/' + category_id;
        } else {
            url += '/' + this.props.category_key + this.props.sub_url + '/edit/' + category_id;
        }

        this.props.router.push({
            pathname: url,
            query: {}
        });
    }

    onClickDel(category_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        let url = '';

        if (this.props.category_key == '') {
            url += self.props.sub_url + '/delete';
        } else {
            url += '/' + self.props.category_key + self.props.sub_url + '/delete';
        }

        Helper.ajax({
            url: url,
            data: {
                category_id: category_id
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

    onRowClick(expanded, record) {
        let index = -1;
        let array = [];

        for (let i = 0; i < this.state.expandedRowKeys.length; i++) {
            if (record.id == this.state.expandedRowKeys[i]) {
                index = i;

                break;
            }
        }

        if (index == -1) {
            array = this.state.expandedRowKeys;

            array.push(record.id);
        } else {
            for (let i = 0; i < this.state.expandedRowKeys.length; i++) {
                if (i != index) {
                    array.push(this.state.expandedRowKeys[i]);
                }
            }
        }

        this.setState({
            expandedRowKeys: array
        });
    }

    render() {
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        }, {
            width: 180,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                    {
                        this.props.category_key == '' ?
                            ''
                            :
                            <a onClick={this.onClickAdd.bind(this, record.id)}>新增</a>
                    }
                    {
                        this.props.category_key == '' ?
                            ''
                            :
                            <span className="ant-divider"/>
                    }
                    <a onClick={this.onClickEdit.bind(this, record.id)}>修改</a>
                    <span className="ant-divider"/>
                    {
                        this.props.operation.map(function (item, index) {
                            return (
                                <span key={item.key}>
                                  <Link to={item.url + '/' + record.id}>{item.name}</Link>
                                  <span className="ant-divider"/>
                                </span>
                            )
                        })
                    }
                    <Popconfirm title={Helper.delete} okText={Helper.yes} cancelText={Helper.no}
                                onConfirm={this.onClickDel.bind(this, record.id)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
            )
        }];

        const pagination = {
            current: 1,
            total: 1,
            pageSize: Helper.limit
        };

        return (
            <div>
                <Row className={styles.contentTitle}>
                    <Col span={12}>
                        <h2>{this.props.category_name}列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button type="default" icon="reload" size="default" className={styles.buttonReload}
                                onClick={this.load.bind(this, this.state.page)}>刷新</Button>
                        <Button type="primary" icon="plus-circle" size="default"
                                onClick={this.onClickAdd.bind(this, this.state.category.id)}>新增</Button>
                    </Col>
                </Row>

                <Table columns={columns} dataSource={this.state.category.children}
                       expandedRowKeys={this.state.expandedRowKeys}
                       onExpand={this.onRowClick.bind(this)} pagination={pagination} bordered/>
            </div>
        )
    }
}

CategoryIndex.propTypes = {
    category_key: React.PropTypes.string.isRequired,
    sub_url: React.PropTypes.string.isRequired,
    category_name: React.PropTypes.string.isRequired,
    operation: React.PropTypes.array.isRequired
};

CategoryIndex.defaultTypes = {
    operation: []
};

export default withRouter(connect((state) => state, {
    setAction
})(CategoryIndex));