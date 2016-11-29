import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input, InputNumber} from 'antd';
import InputImage from '../../components/InputImage';
import HtmlEditor from '../../components/HtmlEditor';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class ActivityDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryList: [],
            activity_image: [],
            activity_content: ''
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/activity/index');

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
            url: '/activity/find',
            data: {
                activity_id: self.props.params.activity_id
            },
            success: function (data) {
                let activity_image = [];

                if (self.props.route.path.indexOf('/edit') > -1) {
                    if (data.activity_image != '') {
                        activity_image.push(data.activity_image);
                    }
                }

                self.setState({
                    activity_image: activity_image
                });

                if (self.props.route.path.indexOf('/edit') > -1) {
                    self.props.form.setFieldsValue(data);
                }

                self.refs.htmlEditor.init(data.activity_content);
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

            values.activity_id = self.props.params.activity_id;
            values.activity_content = self.state.activity_content;

            if (self.state.activity_image.length > 0) {
                values.activity_image = self.state.activity_image[0];
            } else {
                values.activity_image = '';
            }

            Helper.ajax({
                url: '/activity/' + type,
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
            activity_image: list
        });
    }

    onChangeContent(content) {
        this.setState({
            activity_content: content
        });
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
                    <Col span={12}>
                        <h2>品牌表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="名称">
                        {getFieldDecorator('activity_name', {
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
                    <FormItem {...Helper.formItemLayout} label="Url">
                        {getFieldDecorator('activity_url', {
                            initialValue: ''
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入Url"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="Logo">
                        <InputImage value={this.state.activity_image} limit={1}
                                    onChangeImage={this.onChangeImage.bind(this)}/>
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="排序">
                        {getFieldDecorator('activity_sort', {
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
                    <FormItem {...Helper.formItemLayout} label="活动内容">
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

ActivityDetail = Form.create({})(ActivityDetail);

export default withRouter(connect((state) => state, {
    setAction
})(ActivityDetail));