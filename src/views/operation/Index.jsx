import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Popconfirm, Menu} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_OPERATION} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class OperationIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.operationReducer.page,
            menu_id: this.props.operationReducer.menu_id,
            total: 0,
            list: [],
            isSelect: this.props.operationReducer.menu_id == '' ? false : true,
            openKeys: ['-1'],
            selectedKeys: [this.props.operationReducer.menu_id],
            menuList: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/operation/index');

        this.loadMenu();
    }

    componentWillUnmount() {
        this.props.setAction(SET_OPERATION, {
            page: this.state.page,
            menu_id: this.state.menu_id
        });
    }

    onChange = function (currentPage) {
        this.load(currentPage);
    }

    loadMenu = function () {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/menu/list',
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

                if (self.state.menu_id != '') {
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
            url: '/operation/list',
            data: {
                page: currentPage,
                limit: Helper.limit,
                menu_id: self.state.menu_id
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

    onClickAdd() {
        this.props.router.push({
            pathname: '/operation/add/' + this.state.menu_id,
            query: {}
        });
    }

    onClickEdit(operation_id) {
        this.props.router.push({
            pathname: '/operation/edit/' + operation_id,
            query: {}
        });
    }

    onClickDel(operation_id) {
        let self = this;

        self.setState({
            isLoad: true
        });

        Helper.ajax({
            url: '/operation/delete',
            data: {
                operation_id: operation_id
            },
            success: function () {
                Helper.notificationSuccess();

                self.load(self.state.page);
            },
            complete: function () {
                self.setState({
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
            menu_id: item.key,
            isSelect: true,
            selectedKeys: [item.key]
        });

        let self = this;

        setTimeout(function () {
            self.load(self.state.page);
        }, 1);


    }

    render() {
        const SubMenu = Menu.SubMenu;

        const columns = [{
            title: '名称',
            dataIndex: 'operation_name',
            key: 'operation_name'
        }, {
            width: 100,
            title: '排序',
            dataIndex: 'operation_sort',
            key: 'operation_sort'
        }, {
            width: 100,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
              <a onClick={this.onClickEdit.bind(this, record.operation_id)}>修改</a>
              <span className="ant-divider"/>
              <Popconfirm title={Helper.delete} okText={Helper.yes} cancelText={Helper.no}
                          onConfirm={this.onClickDel.bind(this, record.operation_id)}>
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
                        <h2>菜单操作列表</h2>
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
                <div className={styles.content}>
                    <div className={styles.contentMainLeft}>
                        <Menu className={styles.siderMenu} mode="inline" openKeys={this.state.openKeys}
                              selectedKeys={this.state.selectedKeys} onOpenChange={this.onOpenChange.bind(this)}
                              onClick={this.onClick.bind(this)}>
                            {
                                this.state.menuList.map(function (item, index) {
                                    return (
                                        <SubMenu key={item.id} title={<span>{item.name}</span>}>
                                            {
                                                item.children.map(function (children, i) {
                                                    return (
                                                        <Menu.Item key={children.id}>{children.name}</Menu.Item>
                                                    )
                                                })
                                            }
                                        </SubMenu>
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
})(OperationIndex));