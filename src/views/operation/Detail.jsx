import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Row, Col, Breadcrumb, Button, Form, Input, InputNumber } from 'antd'
import { connect } from 'react-redux'
import { SET_SPIN } from '../../commons/Constant'
import { setAction } from '../../actions/Index'
import Helper from '../../commons/Helper'

import styles from '../Style.less'

const createForm = Form.create
const FormItem = Form.Item

class OperationDetail extends Component {

    constructor(props) {
        super(props)

        self = this

        self.category_id = ''

        this.state = {

        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/operation/index')

        self.props.form.setFieldsValue({
            operation_sort: 0
        })

        if (self.props.route.path.indexOf('/edit') > -1) {
            self.load()
        }
    }

    load = function() {
        let self = this

        self.props.setAction(SET_SPIN, {
            isLoad: true
        })

        Helper.ajax({
            url: '/operation/find',
            data: {
                operation_id: self.props.params.operation_id
            },
            success: function(data) {
                self.props.form.setFieldsValue(data)
            },
            complete: function() {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                })
            }
        })
    }

    onClickBack(event) {
        event.preventDefault()

        this.props.router.goBack()
    }

    onClickSubmit(event) {
        event.preventDefault()

        self.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return
            }

            let self = this

            self.props.setAction(SET_SPIN, {
                isLoad: true
            })

            let type

            if (self.props.route.path.indexOf('/edit') > -1) {
                type = 'update'

                values.operation_id = self.props.params.operation_id
            } else {
                type = 'save'

                values.menu_id = self.props.params.menu_id
            }


            Helper.ajax({
                url: '/operation/' + type,
                data: values,
                success: function(data) {
                    Helper.notificationSuccess()

                    self.props.router.goBack()
                },
                complete: function() {
                    self.props.setAction(SET_SPIN, {
                        isLoad: false
                    })
                }
            })
        })
    }

    render() {
        const {getFieldDecorator, getFieldError, isFieldValidating} = this.props.form

        return (
            <div>
        <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
          <Col span={12}>
            <h2>菜单操作表单</h2>
          </Col>
          <Col span={12} className={styles.contentMenu}>
            <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
          </Col>
        </Row>
        <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
          <FormItem {...Helper.formItemLayout} label="名称" >
            {getFieldDecorator('operation_name', {
                rules: [{
                    required: true,
                    message: Helper.required
                }]
            })(
                <Input type="text" style={{
                    width: Helper.inputWidth
                }} placeholder="请输入名称" />
            )}
          </FormItem>
          <FormItem {...Helper.formItemLayout} label="键值" >
            {getFieldDecorator('operation_key')(
                <Input type="text" style={{
                    width: Helper.inputWidth
                }} placeholder="请输入键值" />
            )}
          </FormItem>
          <FormItem {...Helper.formItemLayout} label="数值" >
            {getFieldDecorator('operation_value')(
                <Input type="text" style={{
                    width: Helper.inputWidth
                }} placeholder="请输入数值" />
            )}
          </FormItem>
          <FormItem {...Helper.formItemLayout} label="排序" >
            {getFieldDecorator('operation_sort', {
                rules: [{
                    type: 'number',
                    required: true,
                    message: Helper.required
                }]
            })(
                <InputNumber style={{
                    width: Helper.inputWidth
                }} placeholder="请输入排序" min={0} max={99} />
            )}
          </FormItem>
          <FormItem wrapperCol={{
                offset: Helper.formItemLayout.labelCol.span
            }}>
            <Button type="primary" icon="check-circle" size="default" onClick={this.onClickSubmit.bind(this)}>确定</Button>
          </FormItem>
        </Form>
      </div>
        )
    }
}

OperationDetail = Form.create({

})(OperationDetail)

export default withRouter(connect((state) => state, {
    setAction
})(OperationDetail))