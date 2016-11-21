import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Tree} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class AdminOperation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedKeys: [],
            operationList: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/admin/index');

        this.props.form.setFieldsValue({});

        this.load();
    }

    load = function () {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/admin/operation/list',
            data: {
                user_id: self.props.params.user_id
            },
            success: function (data) {
                self.setState({
                    operationList: data
                });

                let checkedArray = [];

                for (let i = 0; i < self.state.operationList.length; i++) {
                    let item = self.state.operationList[i];
                    if (item.selected) {
                        checkedArray.push(item.id);
                    }
                }

                self.setState({
                    checkedKeys: checkedArray
                });
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        })
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

            let array = [];

            for (let i = 0; i < self.state.checkedKeys.length; i++) {
                array.push({
                    role_id: self.state.checkedKeys[i]
                })
            }

            values.user_id = self.props.params.user_id;
            values.list = array;


            Helper.ajax({
                url: '/admin/operation/update',
                data: values,
                success: function (data) {
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

    onCheck(checkedKeys, object) {
        this.setState({
            checkedKeys: checkedKeys
        });
    }

    render() {
        const FormItem = Form.Item;
        const TreeNode = Tree.TreeNode;
        ;

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
                            <Tree className="myCls" showLine checkable checkedKeys={this.state.checkedKeys}
                                  onCheck={this.onCheck}>
                                {
                                    this.state.operationList.map(function (item, index) {
                                        return (
                                            <TreeNode title={item.name} key={item.id}>

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

AdminOperation = Form.create({})(AdminOperation);

export default withRouter(connect((state) => state, {
    setAction
})(AdminOperation));
