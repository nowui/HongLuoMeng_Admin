import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import {Spin, Row, Col, Menu, Icon} from 'antd';
import {connect} from 'react-redux';

import Helper from '../commons/Helper';

import styles from './Main.less';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoad: false,
            openKeys: ['-1'],
            selectedKeys: ['-1'],
            menuList: [],
            url: ''
        }
    }

    componentDidMount() {
        this.load();
    }

    load = function () {
        let self = this;

        Helper.ajax({
            url: '/user/menu/list',
            data: {},
            success: function (data) {
                self.setState({
                    menuList: data
                });

                if (self.state.url == '/index') {
                    if (self.state.menuList.length > 0) {
                        self.setState({
                            openKeys: [self.state.menuList[0].id]
                        });
                    }
                }

                for (let i = 0; i < self.state.menuList.length; i++) {
                    for (let k = 0; k < self.state.menuList[i].children.length; k++) {
                        let children = self.state.menuList[i].children[k]
                        if (children.link == self.state.url) {
                            self.setState({
                                openKeys: [self.state.menuList[i].id],
                                selectedKeys: [children.id]
                            });

                            break
                        }
                    }
                }
            },
            complete: function () {
            }
        })
    }

    onOpenChange(item) {
        this.setState({
            openKeys: item
        });
    }

    onClick(item) {
        this.setState({
            selectedKeys: [item.key]
        });
    }

    onSelectMenu(url) {
        this.setState({
            url: url
        })

        if (url == '/index') {
            this.setState({
                selectedKeys: ['-1']
            });
        }
    }

    onClickHome() {
        this.props.router.push({
            pathname: '/index',
            query: {}
        });
    }

    render() {
        const SubMenu = Menu.SubMenu;

        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                onSelectMenu: this.onSelectMenu.bind(this)
            })
        );

        return (
            <Spin size="large" tip="Loading.." spinning={this.props.spinReducer.isLoad}>
                <div className={styles.header}>
                    <Row>
                        <Col span={12}>
                            <h1 onClick={this.onClickHome.bind(this)} style={{
                                cursor: 'pointer'
                            }}>红萝梦 - 全球美妆网红KOL代理</h1>
                        </Col>
                        <Col span={12} style={{
                            textAlign: 'right'
                        }}>
                            <span style={{fontSize: '14px', position: 'absolute', width: '200px', right: '60'}}>{Helper.getAdminName()}</span>
                            <Link to='/logout'><Icon type="poweroff" style={{
                                fontSize: '24px',
                                marginRight: '20px',
                                marginTop: '20px',
                                color: '#ffffff'
                            }}/></Link>
                        </Col>
                    </Row>
                </div>
                <Menu className={styles.sidebar} mode="inline" openKeys={this.state.openKeys}
                      selectedKeys={this.state.selectedKeys} onOpenChange={this.onOpenChange.bind(this)}
                      onClick={this.onClick.bind(this)}>
                    {
                        this.state.menuList.map(function (item, index) {
                            return (
                                <SubMenu key={item.id}
                                         title={<span><Icon className={'anticon ' + item.icon}/>{item.name}</span>}>
                                    {
                                        item.children.map(function (children, i) {
                                            return (
                                                <Menu.Item key={children.id}><Link
                                                    to={children.link}>{children.name}</Link></Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        })
                    }
                </Menu>

                <div className={styles.content}>
                    {childrenWithProps}
                </div>
            </Spin>
        )
    }
}

export default withRouter(connect((state) => state, {})(Main));