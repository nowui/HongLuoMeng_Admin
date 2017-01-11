import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input, InputNumber, Select} from 'antd';
import InputImage from '../../components/InputImage';
import HtmlEditor from '../../components/HtmlEditor';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class RankingDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryList: [],
            ranking_image: [],
            ranking_content: ''
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/ranking/index');

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
            url: '/ranking/find',
            data: {
                ranking_id: self.props.params.ranking_id
            },
            success: function (data) {
                let ranking_image = [];

                if (self.props.route.path.indexOf('/edit') > -1) {
                    if (data.ranking_image != '') {
                        ranking_image.push(data.ranking_image);
                    }
                }

                self.setState({
                    ranking_image: ranking_image,
                    ranking_content: data.ranking_content
                });

                if (self.props.route.path.indexOf('/edit') > -1) {
                    self.props.form.setFieldsValue(data);
                }

                self.refs.htmlEditor.init(data.ranking_content);
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

            values.ranking_id = self.props.params.ranking_id;
            values.ranking_content = self.state.ranking_content;

            if (self.state.ranking_image.length > 0) {
                values.ranking_image = self.state.ranking_image[0];
            } else {
                values.ranking_image = '';
            }

            Helper.ajax({
                url: '/ranking/' + type,
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
            ranking_image: list
        });
    }

    onChangeContent(content) {
        this.setState({
            ranking_content: content
        });
    }

    render() {
        const FormItem = Form.Item;
        const {getFieldDecorator} = this.props.form;
        const Option = Select.Option;

        return (
            <div>
                <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
                    <Col span={12}>
                        <h2>排行榜表单</h2>
                    </Col>
                    <Col span={12} className={styles.contentMenu}>
                        <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
                    </Col>
                </Row>
                <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
                    <FormItem {...Helper.formItemLayout} label="类型">
                        {getFieldDecorator('ranking_type', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Select style={{
                                width: Helper.inputWidth
                            }} placeholder="请选择类型">
                                <Option value="RED">红榜</Option>
                                <Option value="BLACK">黑榜</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="排名">
                        {getFieldDecorator('ranking_sort', {
                            rules: [{
                                type: 'number',
                                required: true,
                                message: Helper.required
                            }],
                            initialValue: 1
                        })(
                            <InputNumber style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入排名" step={1} min={1} max={10}/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="名称">
                        {getFieldDecorator('ranking_name', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }],
                            initialValue: ''
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入名称"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="标题">
                        {getFieldDecorator('ranking_title', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }],
                            initialValue: ''
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入标题"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="来源">
                        {getFieldDecorator('ranking_source', {
                            initialValue: ''
                        })(
                            <Input type="text" style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入来源"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="图片">
                        <InputImage value={this.state.ranking_image} limit={1}
                                    onChangeImage={this.onChangeImage.bind(this)}/>
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="点击量">
                        {getFieldDecorator('ranking_hits', {
                            rules: [{
                                type: 'number',
                                required: true,
                                message: Helper.required
                            }],
                            initialValue: 0
                        })(
                            <InputNumber style={{
                                width: Helper.inputWidth
                            }} placeholder="请输入点击量" min={0} max={9999999}/>
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

RankingDetail = Form.create({})(RankingDetail);

export default withRouter(connect((state) => state, {
    setAction
})(RankingDetail));