import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Row, Col, Button, Form, Input, InputNumber } from 'antd'
import { connect } from 'react-redux'
import { SET_SPIN } from '../../commons/Constant'
import { setAction } from '../../actions/Index'
import Helper from '../../commons/Helper'

import styles from '../Style.less'

class MemberLevelDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/member/level/index')

        this.props.form.setFieldsValue({

        })

        if (this.props.route.path.indexOf('/edit') > -1) {
            this.load()
        }
    }

    load = function() {
        let self = this

        self.props.setAction(SET_SPIN, {
            isLoad: true
        })

        Helper.ajax({
            url: '/member/level/find',
            data: {
                member_level_id: self.props.params.member_level_id
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

        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return
            }

            let self = this

            self.props.setAction(SET_SPIN, {
                isLoad: true
            })

            let type = self.props.route.path.indexOf('/edit') > -1 ? 'update' : 'save'

            values.member_level_id = self.props.params.member_level_id

            Helper.ajax({
                url: '/member/level/' + type,
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
        const FormItem = Form.Item
        const {getFieldDecorator, getFieldError, isFieldValidating} = this.props.form

        return (
            <div>
        <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
          <Col span={12}>
            <h2>会员等级表单</h2>
          </Col>
          <Col span={12} className={styles.contentMenu}>
            <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
          </Col>
        </Row>
        <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
          <FormItem {...Helper.formItemLayout} label="名称" >
            {getFieldDecorator('member_level_name', {
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
          <FormItem {...Helper.formItemLayout} label="数值" >
            {getFieldDecorator('member_level_value', {
                rules: [{
                    type: 'number',
                    required: true,
                    message: Helper.required
                }]
            })(
                <InputNumber style={{
                    width: Helper.inputWidth
                }} placeholder="请输入数值" min={0} max={99999999999} />
            )}
          </FormItem>
          <FormItem {...Helper.formItemLayout} label="排序" >
            {getFieldDecorator('member_level_sort', {
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

MemberLevelDetail = Form.create({

})(MemberLevelDetail)

export default withRouter(connect((state) => state, {
    setAction
})(MemberLevelDetail))