import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin, Row, Col, Table, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import { SET_SPIN } from '../../../commons/Constant'
import { setAction } from '../../../actions/Index'

import Helper from '../../../commons/Helper'

import styles from '../../Style.less'

const confirm = Modal.confirm

let page = 1

class BrandApplyIndex extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/brand/apply/index')

        this.load(page)
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
            url: '/brand/apply/list',
            data: {
                page: currentPage,
                limit: Helper.limit
            },
            success: function(data) {
                page = currentPage

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

    review = function(brand_id, user_id) {
        let self = this

        self.props.setAction(SET_SPIN, {
            isLoad: true
        })

        Helper.ajax({
            url: '/brand/apply/review',
            data: {
                brand_id: brand_id,
                user_id: user_id
            },
            success: function(data) {
                self.load(page)
            },
            complete: function() {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                })
            }
        })
    }

    onClickEdit(brand_id, user_id) {
        this.props.router.push({
            pathname: '/brand/apply/edit/' + brand_id + '/' + user_id,
            query: {

            }
        })
    }

    onClickReview(brand_id, user_id) {
        let self = this

        confirm({
            title: Helper.message,
            content: '您确定通过审核吗？',
            onOk() {
                self.review(brand_id, user_id)
            },
            onCancel() {}
        })
    }

    render() {
        const columns = [{
            title: '品牌名称',
            dataIndex: 'brand_name',
            key: 'brand_name'
        }, {
            title: '会员名称',
            dataIndex: 'member_name',
            key: 'member_name'
        }, {
            title: '申请状态',
            dataIndex: 'brand_apply_review_status',
            key: 'brand_apply_review_status'
        }, {
            width: 150,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
            <span>
          <a onClick={this.onClickEdit.bind(this, record.brand_id, record.user_id)}>查看</a>
          {
                record.brand_apply_review_status ?
                    ''
                    :
                    <span>
              <span className="ant-divider"></span>
              <a onClick={this.onClickEdit.bind(this, record.brand_id, record.user_id)}>待审核</a>
            </span>
                }
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
            <h2>品牌代理申请列表</h2>
          </Col>
          <Col span={12} className={styles.contentMenu}>
            <Button type="default" icon="reload" size="default" className="button-reload" onClick={this.load.bind(this, page)}>刷新</Button>
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
})(BrandApplyIndex))