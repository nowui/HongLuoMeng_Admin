import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Popconfirm, Form, Input} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_BRAND} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class BrandIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.brandReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/brand/index');

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_BRAND, {
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
            url: '/brand/list',
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
            pathname: '/brand/add',
            query: {}
        });
    }

    onClickEdit(brand_id) {
        this.props.router.push({
            pathname: '/brand/edit/' + brand_id,
            query: {}
        });
    }

    onClickDel(brand_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/brand/delete',
            data: {
                brand_id: brand_id
            },
            success: function (data) {
                self.load(self.props.brandReducer.page);
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        const columns = [{
            title: '名称',
            dataIndex: 'brand_name',
            key: 'brand_name'
        }, {
            width: 150,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  <a onClick={this.onClickEdit.bind(this, record.brand_id)}>修改</a>
                  <span className="ant-divider"/>
                  <Popconfirm title={Helper.delete} okText={Helper.yes} cancelText={Helper.no}
                              onConfirm={this.onClickDel.bind(this, record.brand_id)}>
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
                        <h2>品牌列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button type="primary" icon="plus-circle" size="default"
                                onClick={this.onClickAdd.bind(this)}>新增</Button>
                    </Col>
                </Row>

                <Form horizontal className={styles.contentSearch}>
                    <Row>
                        <Col sm={7}>
                            <FormItem {...Helper.formItemSearchLayout} label="名称">
                                {getFieldDecorator('brand_name', {
                                    initialValue: ''
                                })(
                                    <Input type="text" style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="请输入品牌名称"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={7}>
                        </Col>
                        <Col sm={7}>
                        </Col>
                        <Col sm={3} style={{
                            textAlign: 'right'
                        }}>
                            <Button type="ghost" icon="search" size="default" className="button-reload"
                                    onClick={this.load.bind(this, this.state.page)}>搜索</Button>
                        </Col>
                    </Row>
                </Form>

                <div className={styles.contentSearchMain}>
                    <Table columns={columns} dataSource={this.state.list} pagination={pagination}/>
                </div>
            </div>
        )
    }
}

BrandIndex = Form.create({})(BrandIndex);

export default withRouter(connect((state) => state, {
    setAction
})(BrandIndex));