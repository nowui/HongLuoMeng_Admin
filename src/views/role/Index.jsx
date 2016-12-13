import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Popconfirm, Menu} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_ROLE} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class RoleIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.roleReducer.page,
            group_id: this.props.roleReducer.group_id,
            list: [],
            isSelect: this.props.roleReducer.group_id == '' ? false : true,
            openKeys: ['-1'],
            selectedKeys: [this.props.roleReducer.group_id],
            menuList: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/role/index');

        this.loadMenu();
    }

    componentWillUnmount() {
        this.props.setAction(SET_ROLE, {
            page: this.state.page,
            group_id: this.state.group_id
        });
    }

    loadMenu = function () {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/group/list',
            data: {},
            success: function (data) {
                self.setState({
                    menuList: data.children
                });

                let array = [];

                for (let i = 0; i < self.state.menuList.length; i++) {
                    array.push(self.state.menuList[i].id);
                }

                self.setState({
                    openKeys: array
                });

                if (self.state.group_id != '') {
                    self.load(self.state.page);
                }
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    load = function (currentPage) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/role/list',
            data: {
                page: currentPage,
                limit: Helper.limit,
                group_id: self.state.group_id
            },
            success: function (data) {
                self.setState({
                    page: currentPage,
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

    onChange = function (currentPage) {
        this.load(currentPage);
    }

    onClickAdd() {
        this.props.router.push({
            pathname: '/role/add/' + this.state.group_id,
            query: {}
        });
    }

    onClickEdit(role_id) {
        this.props.router.push({
            pathname: '/role/edit/' + role_id,
            query: {}
        });
    }

    onClickAuthorization(role_id) {
        this.props.router.push({
            pathname: '/role/authorization/' + role_id,
            query: {}
        });
    }

    onClickDel(role_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/role/delete',
            data: {
                role_id: role_id
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

    onClose(item) {
        this.setState({
            openKeys: item.openKeys
        });
    }

    onOpenChange(item) {
        this.setState({
            openKeys: item
        });
    }

    onClick(item) {
        this.setState({
            group_id: item.key,
            isSelect: true,
            selectedKeys: [item.key]
        });

        let self = this;

        setTimeout(function () {
            self.load(1);
        }, 1);
    }

    render() {
        const columns = [{
            title: '名称',
            dataIndex: 'role_name',
            key: 'role_name'
        }, {
            width: 100,
            title: '排序',
            dataIndex: 'role_sort',
            key: 'role_sort'
        }, {
            width: 150,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  <a onClick={this.onClickEdit.bind(this, record.role_id)}>修改</a>
                  <span className="ant-divider"/>
                  <a onClick={this.onClickAuthorization.bind(this, record.role_id)}>授权</a>
                  <span className="ant-divider"/>
                  <Popconfirm title={Helper.delete} okText={Helper.yes} cancelText={Helper.no}
                              onConfirm={this.onClickDel.bind(this, record.role_id)}>
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
                        <h2>分组角色列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        {
                            this.state.isSelect ?
                                <Button type="primary" icon="plus-circle" size="default"
                                        onClick={this.onClickAdd.bind(this)}>新增</Button>
                                :
                                <span> </span>
                        }
                    </Col>
                </Row>
                <div>
                    <div className={styles.contentMainLeft}>
                        <Menu className={styles.siderMenu} mode="inline" openKeys={this.state.openKeys}
                              selectedKeys={this.state.selectedKeys} onOpenChange={this.onOpenChange.bind(this)}
                              onClick={this.onClick.bind(this)}>
                            {
                                this.state.menuList.map(function (item, index) {
                                    return (
                                        <Menu.Item key={item.id}>{item.name}</Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </div>

                    <div className={styles.contentMainRight}>
                        <Table columns={columns} dataSource={this.state.list} pagination={pagination} bordered/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect((state) => state, {
    setAction
})(RoleIndex));