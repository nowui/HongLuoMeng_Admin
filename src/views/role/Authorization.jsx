import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Tree} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class RoleAuthorization extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expandedKeys: [],
            checkedKeys: [],
            operationList: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/role/index');

        this.load();
    }

    load = function () {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/role/operation/list',
            data: {
                role_id: self.props.params.role_id
            },
            success: function (data) {
                self.setState({
                    operationList: data
                });

                let expandedArray = [];
                let checkedArray = [];

                for (let i = 0; i < self.state.operationList.length; i++) {
                    let item = self.state.operationList[i];
                    expandedArray.push(item.id);

                    for (let j = 0; j < item.children.length; j++) {
                        let children = item.children[j];
                        expandedArray.push(children.id);

                        for (let k = 0; k < children.children.length; k++) {
                            let grandson = children.children[k];
                            if (grandson.selected) {
                                checkedArray.push(grandson.id);
                            }
                        }
                    }
                }

                self.setState({
                    expandedKeys: expandedArray,
                    checkedKeys: checkedArray
                });
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    onClickBack(event) {
        event.preventDefault();

        this.props.router.goBack();
    }

    onClickSubmit(event) {
        event.preventDefault();

        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }

            let self = this;

            self.props.setAction(SET_SPIN, {
                isLoad: true
            });

            let array = []

            for (let i = 0; i < self.state.checkedKeys.length; i++) {
                let item = self.state.checkedKeys[i];
                if (item.length == 32) {
                    array.push({
                        operation_id: item
                    });
                }
            }

            values.role_id = self.props.params.role_id;
            values.list = array;

            Helper.ajax({
                url: '/role/operation/update',
                data: values,
                success: function () {
                    Helper.notificationSuccess();

                    self.props.router.goBack();
                },
                complete: function () {
                    self.props.setAction(SET_SPIN, {
                        isLoad: false
                    });
                }
            });
        });
    }

    onExpand(expandedKeys) {
        this.setState({
            expandedKeys: expandedKeys
        });
    }

    onCheck(checkedKeys, object) {
        this.setState({
            checkedKeys: checkedKeys
        });
    }

    render() {
        const FormItem = Form.Item;
        const TreeNode = Tree.TreeNode;

        return (
            <div>
                <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
                    <Col span={12}>
                        <h2>角色权限表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>

                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <Row>
                        <Col span={4}>
                        </Col>
                        <Col span={20}>
                            <Tree className="myCls" showLine checkable
                                  expandedKeys={this.state.expandedKeys}
                                  checkedKeys={this.state.checkedKeys}
                                  onExpand={this.onExpand.bind(this)}
                                  onCheck={this.onCheck.bind(this)}
                            >
                                {
                                    this.state.operationList.map(function (item, index) {
                                        return (
                                            <TreeNode title={item.name} key={item.id}>
                                                {
                                                    item.children.map(function (children, i) {
                                                        return (
                                                            <TreeNode title={children.name} key={children.id}>
                                                                {
                                                                    children.children.map(function (grandson, k) {
                                                                        return (
                                                                            <TreeNode title={grandson.name}
                                                                                      key={grandson.id}>
                                                                                {

                                                                                }
                                                                            </TreeNode>
                                                                        )
                                                                    })
                                                                }
                                                            </TreeNode>
                                                        )
                                                    })
                                                }
                                            </TreeNode>
                                        )
                                    })
                                }
                            </Tree>
                        </Col>
                    </Row>
                    <br/>
                    <FormItem wrapperCol={{
                        offset: Helper.formItemLayout.labelCol.span
                    }}>
                        <Button type="primary" icon="check-circle" size="default"
                                onClick={this.onClickSubmit.bind(this)}>确定</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

RoleAuthorization = Form.create({})(RoleAuthorization);

export default withRouter(connect((state) => state, {
    setAction
})(RoleAuthorization));