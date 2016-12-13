import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input, InputNumber} from 'antd';
import HtmlEditor from '../../components/HtmlEditor';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class PageDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryList: [],
            page_image: [],
            page_content: ''
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/page/index');

        if (this.props.route.path.indexOf('/edit') > -1) {
            this.load();
        }
    }

    load = function () {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/page/find',
            data: {
                page_id: self.props.params.page_id
            },
            success: function (data) {
                let page_image = [];

                if (self.props.route.path.indexOf('/edit') > -1) {
                    if (data.page_image != '') {
                        page_image.push(data.page_image);
                    }
                }

                self.setState({
                    page_image: page_image
                });

                if (self.props.route.path.indexOf('/edit') > -1) {
                    self.props.form.setFieldsValue(data);
                }

                self.refs.htmlEditor.init(data.page_content);
            },
            complete: function () {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                });
            }
        });
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

            let type = self.props.route.path.indexOf('/edit') > -1 ? 'update' : 'save';

            values.page_id = self.props.params.page_id;
            values.page_content = self.state.page_content;

            if (self.state.page_image.length > 0) {
                values.page_image = self.state.page_image[0];
            } else {
                values.page_image = '';
            }

            Helper.ajax({
                url: '/page/' + type,
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

    onChangeImage(list) {
        this.setState({
            page_image: list
        });
    }

    onChangeContent(content) {
        this.setState({
            page_content: content
        });
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
                    <Col span={12}>
                        <h2>页面表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="名称">
                        {getFieldDecorator('page_name', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入名称"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="键值">
                        {getFieldDecorator('page_key', {
                            initialValue: ''
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入键值"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="排序">
                        {getFieldDecorator('page_sort', {
                            rules: [{
                                type: 'number',
                                required: true,
                                message: Helper.required
                            }],
                            initialValue: 0
                        })(
                            <InputNumber style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入排序" min={0} max={99}/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="内容">
                        <HtmlEditor ref="htmlEditor" onChangeContent={this.onChangeContent.bind(this)}/>
                    </FormItem>
                    <FormItem wrapperCol={{
                        offset: Helper.formItemLayout.labelCol.span
                    }}>
                        <Button type="primary" icon="check-circle" size="default"
                                onClick={this.onClickSubmit.bind(this)}>确定</Button>
                    </FormItem>
                    <br />
                    <br />
                    <br />
                </Form>
            </div>
        )
    }
}

PageDetail = Form.create({})(PageDetail);

export default withRouter(connect((state) => state, {
    setAction
})(PageDetail));