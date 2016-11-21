import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Spin, Row, Col, Breadcrumb, Table, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import { SET_SPIN } from '../../../commons/Constant'
import { setAction } from '../../../actions/Index'
import Helper from '../../../commons/Helper'

import styles from '../../Style.less'

const confirm = Modal.confirm

let page = 1

class CategoryAttributeIndex extends Component {

    constructor(props) {
        super(props)

        this.state = {
            page: page,
            total: 0,
            list: []
        }
    }

    componentDidMount() {
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
            url: '/product/category/attribute/list',
            data: {
                page: currentPage,
                limit: Helper.limit,
                category_id: self.props.category_id
            },
            success: function(data) {
                page = currentPage

                self.setState({
                    page: currentPage,
                    total: data.total,
                    list: data
                })
            },
            complete: function() {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                })
            }
        })
    }

    del = function(attribute_id) {
        let self = this

        self.props.setAction(SET_SPIN, {
            isLoad: true
        })

        Helper.ajax({
            url: '/product/category/attribute/delete',
            data: {
                category_id: self.props.category_id,
                attribute_id: attribute_id
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

    onClickAdd(event) {
        this.props.router.push({
            pathname: '/product/category/attribute/add/' + this.props.category_id,
            query: {

            }
        })
    }

    onClickBack(event) {
        event.preventDefault()

        this.props.router.goBack()
    }

    onClickEdit(attribute_id) {
        this.props.router.push({
            pathname: '/product/category/attribute/edit/' + this.props.category_id + '/' + attribute_id,
            query: {

            }
        })
    }

    onClickDel(attribute_id) {
        let self = this

        confirm({
            title: Helper.message,
            content: Helper.delete,
            onOk() {
                self.del(attribute_id)
            },
            onCancel() {}
        })
    }

    render() {
        const columns = [{
            title: '名称',
            dataIndex: 'attribute_name',
            key: 'attribute_name'
        }, {
            title: '类型',
            dataIndex: 'attribute_type',
            key: 'attribute_type'
        }, {
            width: 150,
            title: '操作',
            dataIndex: '',
            render: (text, record, index) => (
            <span>
          <a onClick={this.onClickEdit.bind(this, record.attribute_id)}>修改</a>
          <span className="ant-divider"></span>
          <a onClick={this.onClickDel.bind(this, record.attribute_id)}>删除</a>
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
            <h2>{this.props.name}列表</h2>
          </Col>
          <Col span={12} className={styles.contentMenu}>
            <Button icon="circle-left" size="default" className={styles.buttonReload} onClick={this.onClickBack.bind(this)}>返回</Button>
            <Button type="default" icon="reload" size="default" className={styles.buttonReload} onClick={this.load.bind(this, page)}>刷新</Button>
            <Button type="primary" icon="plus-circle" size="default" onClick={this.onClickAdd.bind(this)}>新增</Button>
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
})(CategoryAttributeIndex))