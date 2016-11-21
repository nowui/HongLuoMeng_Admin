import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Row, Col, Button, Form, Input } from 'antd'
import { connect } from 'react-redux'
import { SET_SPIN } from '../../commons/Constant'
import { setAction } from '../../actions/Index'
import Helper from '../../commons/Helper'

import styles from '../Style.less'

const createForm = Form.create
const FormItem = Form.Item

class AdminDetail extends Component {

    constructor(props) {
        super(props)

        self = this

        self.category_id = ''

        this.state = {

        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/admin/index')

        self.props.form.setFieldsValue({

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
            url: '/admin/find',
            data: {
                admin_id: self.props.params.admin_id
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

        self.props.router.goBack()
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

            let type = self.props.route.path.indexOf('/edit') > -1 ? 'update' : 'save'

            values.admin_id = self.props.params.admin_id

            Helper.ajax({
                url: '/admin/' + type,
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
            <h2>商店表单</h2>
          </Col>
          <Col span={12} className={styles.contentMenu}>
            <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
          </Col>
        </Row>
        <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
          {getFieldDecorator('user_id')(
                <Input type="hidden" />
            )}
          <FormItem {...Helper.formItemLayout} label="名称" >
            {getFieldDecorator('admin_name', {
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
          <FormItem {...Helper.formItemLayout} label="帐号" >
            {getFieldDecorator('user_account', {
                rules: [{
                    required: true,
                    message: Helper.required
                }]
            })(
                <Input type="text" style={{
                    width: Helper.inputWidth
                }} placeholder="请输入帐号" />
            )}
          </FormItem>
          <FormItem {...Helper.formItemLayout} label="密码" >
            {getFieldDecorator('user_password')(
                <Input type="password" style={{
                    width: Helper.inputWidth
                }} placeholder="请输入密码" />
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

AdminDetail = Form.create({

})(AdminDetail)

export default withRouter(connect((state) => state, {
    setAction
})(AdminDetail))