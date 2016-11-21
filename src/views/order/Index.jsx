import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Row, Col, Table, Button } from 'antd'
import { connect } from 'react-redux'
import { SET_SPIN, SET_ORDER } from '../../commons/Constant'
import { setAction } from '../../actions/Index'
import Helper from '../../commons/Helper'

import styles from '../Style.less'

class OrderIndex extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: this.props.orderReducer.page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/order/index')

        this.load(this.state.page)
    }

    componentWillUnmount() {
        this.props.setAction(SET_ORDER, {
            page: this.state.page,
        })
    }

    onChange = function(currentPage) {
        this.load(currentPage)
    }

    load = function(currentPage) {
        let self = this

        self.props.setAction(SET_SPIN, {
            isLoad: true
        })

        Helper.ajax({
            url: '/order/list',
            data: {
                page: currentPage,
                limit: Helper.limit
            },
            success: function(data) {
                self.setState({
                    page: currentPage,
                    total: data.total,
                    list: data.list
                })
            },
            complete: function() {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                })
            }
        })
    }

    onClickEdit(order_id) {
        this.props.router.push({
            pathname: '/order/edit/' + order_id,
            query: {

            }
        })
    }

    render() {
        const columns = [{
            title: '订单号',
            dataIndex: 'order_no',
            key: 'order_no'
        }, {
            title: '订单价格',
            dataIndex: 'order_payment_price',
            key: 'order_payment_price'
        }, {
            title: '商品数量',
            dataIndex: 'order_payment_amount',
            key: 'order_payment_amount'
        }, {
            width: 150,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
            <span>
          <a onClick={this.onClickEdit.bind(this, record.order_id)}>查看</a>
        </span>
            )
        }]

        const pagination = {
            current: this.state.page,
            total: this.state.total,
            pageSize: Helper.limit,
            onChange: this.onChange.bind(this)
        }

        return (
            <div>
        <Row className={styles.contentTitle}>
          <Col span={12}>
            <h2>订单列表</h2>
          </Col>
          <Col span={12} className={styles.contentMenu}>
            <Button type="default" icon="reload" size="default" className="button-reload" onClick={this.load.bind(this, this.state.page)}>刷新</Button>
          </Col>
        </Row>

        <div className={styles.contentMain}>
          <Table columns={columns} dataSource={this.state.list} pagination={pagination} />
        </div>
      </div>
        )
    }
}

export default withRouter(connect((state) => state, {
    setAction
})(OrderIndex))