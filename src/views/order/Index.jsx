import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Table, Button, Form, Input} from 'antd';
import {connect} from 'react-redux';
import {SET_SPIN, SET_ORDER} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class OrderIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: this.props.orderReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/order/index');

        this.load(this.state.page);
    }

    componentWillUnmount() {
        this.props.setAction(SET_ORDER, {
            page: this.state.page,
        });
    }

    load = function (currentPage) {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/order/list',
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

    onChange = function (currentPage) {
        this.load(currentPage);
    }

    onClickEdit(order_id) {
        this.props.router.push({
            pathname: '/order/edit/' + order_id,
            query: {}
        });
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        const columns = [{
            title: '订单号',
            dataIndex: 'order_no',
            key: 'order_no'
        }, {
            title: '订单价格',
            dataIndex: 'order_pay_price',
            key: 'order_pay_price'
        }, {
            title: '商品数量',
            dataIndex: 'order_product_pay_amount',
            key: 'order_product_pay_amount'
        }, {
            title: '状态',
            dataIndex: 'order_flow_status',
            key: 'order_flow_status'
        }, {
            width: 150,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
                <span>
                  <a onClick={this.onClickEdit.bind(this, record.order_id)}>查看</a>
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
                        <h2>订单列表</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>

                    </Col>
                </Row>

                <Form horizontal className={styles.contentSearch}>
                    <Row>
                        <Col sm={7}>
                            <FormItem {...Helper.formItemSearchLayout} label="订单编号">
                                {getFieldDecorator('order_no', {
                                    initialValue: ''
                                })(
                                    <Input type="text" style={{
                                        width: Helper.inputSearchWidth
                                    }} placeholder="请输入订单编号"/>
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

OrderIndex = Form.create({})(OrderIndex);

export default withRouter(connect((state) => state, {
    setAction
})(OrderIndex));