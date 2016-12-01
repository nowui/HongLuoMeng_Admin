import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Popconfirm, Form, Input, Select} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_PRODUCT} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class ProductIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.productReducer.page,
            product_name: this.props.productReducer.product_name,
            total: 0,
            list: [],
            categoryList: [],
            brandList: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/product/index');

        this.props.form.setFieldsValue({
            product_name: this.state.product_name
        });

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_PRODUCT, {
            page: this.state.page,
            product_name: this.state.product_name
        });
    }

    load = function (currentPage) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/product/list',
            data: {
                page: currentPage,
                limit: Helper.limit,
                product_name: self.props.form.getFieldValue('product_name')
            },
            success: function (data) {
                self.setState({
                    page: currentPage,
                    product_name: self.props.form.getFieldValue('product_name'),
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

    onChange = function (currentPage) {
        this.load(currentPage);
    }

    onClickAdd() {
        this.props.router.push({
            pathname: '/product/add',
            query: {}
        });
    }

    onClickEdit(product_id) {
        this.props.router.push({
            pathname: '/product/edit/' + product_id,
            query: {}
        });
    }

    onClickDel(product_id) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/product/delete',
            data: {
                product_id: product_id
            },
            success: function () {
                self.load(self.props.productReducer.page);
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
            dataIndex: 'product_name',
            key: 'product_name'
        }, {
            width: 150,
            title: '是否热卖',
            dataIndex: 'product_is_hot',
            key: 'product_is_hot',
            render: (text, record, index) => (
                record.product_is_hot.toString()
            )
        }, {
            width: 150,
            title: '价格',
            dataIndex: 'product_price',
            key: 'product_price'
        }, {
            width: 150,
            title: '库存',
            dataIndex: 'product_stock',
            key: 'product_stock'
        }, {
            width: 150,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  <a onClick={this.onClickEdit.bind(this, record.product_id)}>修改</a>
                  <span className="ant-divider"/>
                  <Popconfirm title={Helper.delete} okText={Helper.yes} cancelText={Helper.no}
                              onConfirm={this.onClickDel.bind(this, record.product_id)}>
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
                        <h2>商品列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button type="primary" icon="plus-circle" size="default"
                                onClick={this.onClickAdd.bind(this)}>新增</Button>
                    </Col>
                </Row>

                <Form horizontal className={styles.contentSearch}>
                    <Row>
                        <Col sm={8}>
                            <FormItem {...Helper.formItemSearchLayout} label="名称" className={styles.contentSearchFormItem}>
                                {getFieldDecorator('product_name', {
                                    initialValue: ''
                                })(
                                    <Input type="text" style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="请输入产品名称"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...Helper.formItemSearchLayout} label="分类" className={styles.contentSearchFormItem}>
                                {getFieldDecorator('category_id', {
                                    initialValue: ''
                                })(
                                    <Select style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="请选择分类">
                                        {
                                            this.state.categoryList.map(function (item) {
                                                return (
                                                    <Option key={item.key} value={item.value}>{item.label}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...Helper.formItemSearchLayout} label="品牌" className={styles.contentSearchFormItem}>
                                {getFieldDecorator('brand_id', {
                                    initialValue: ''
                                })(
                                    <Select style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="请选择品牌">
                                        {
                                            this.state.brandList.map(function (item) {
                                                return (
                                                    <Option key={item.key} value={item.value}>{item.label}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <FormItem {...Helper.formItemSearchLayout} label="价格" className={styles.contentSearchFormItem}>
                                {getFieldDecorator('product_price', {
                                    initialValue: ''
                                })(
                                    <Input type="text" style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="请输入价格"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem {...Helper.formItemSearchLayout} label="库存" className={styles.contentSearchFormItem}>
                                {getFieldDecorator('product_stock', {
                                    initialValue: ''
                                })(
                                    <Input type="text" style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="请输入库存"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col sm={8} className={styles.contentSearchFormItem} style={{
                            textAlign: 'right'
                        }}>
                            <Button type="ghost" icon="search" size="default" className="button-reload"
                                    onClick={this.load.bind(this, this.state.page)}>搜索</Button>
                        </Col>
                    </Row>
                </Form>

                <div className={styles.contentMainPaddingTop}>
                    <Table columns={columns} dataSource={this.state.list} pagination={pagination} scroll={{ y: 408 }}/>
                </div>
            </div>
        )
    }
}

ProductIndex = Form.create({})(ProductIndex);

export default withRouter(connect((state) => state, {
    setAction
})(ProductIndex));