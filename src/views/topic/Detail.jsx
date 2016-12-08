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
            topic_image: [],
            topic_content: ''
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/topic/index');

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
            url: '/topic/find',
            data: {
                topic_id: self.props.params.topic_id
            },
            success: function (data) {
                let topic_image = [];

                if (self.props.route.path.indexOf('/edit') > -1) {
                    if (data.topic_image != '') {
                        topic_image.push(data.topic_image);
                    }
                }

                self.setState({
                    topic_image: topic_image
                });

                if (self.props.route.path.indexOf('/edit') > -1) {
                    self.props.form.setFieldsValue(data);
                }

                self.refs.htmlEditor.init(data.topic_content);
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

            values.topic_id = self.props.params.topic_id;
            values.topic_image = JSON.stringify(self.state.topic_image);

            Helper.ajax({
                url: '/topic/' + type,
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
            topic_image: list
        });
    }

    onChangeContent(content) {
        this.setState({
            topic_content: content
        });
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
                    <Col span={12}>
                        <h2>活动表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="文字">
                        {getFieldDecorator('topic_text', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入文字"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="图片">
                        <InputImage value={this.state.topic_image}
                                    onChangeImage={this.onChangeImage.bind(this)}/>
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