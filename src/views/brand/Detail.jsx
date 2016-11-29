import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Button, Form, Input, Select} from 'antd';
import InputImage from '../../components/InputImage';
import HtmlEditor from '../../components/HtmlEditor';
import {connect} from 'react-redux';
import {SET_SPIN} from '../../commons/Constant';
import {setAction} from '../../actions/Index';
import Helper from '../../commons/Helper';

import styles from '../Style.less';

class BrandDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryList: [],
            brand_logo: [],
            brand_background: [],
            brand_agreement: ''
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/brand/index');

        this.props.form.setFieldsValue({
            brand_introduce: ''
        });

        this.load();
    }

    load = function () {
        let self = this;

        self.props.setAction(SET_SPIN, {
            isLoad: true
        });

        Helper.ajax({
            url: '/brand/find',
            data: {
                brand_id: self.props.params.brand_id
            },
            success: function (data) {
                let categoryList = []

                for (let i = 0; i < data.categoryList.length; i++) {
                    let category = data.categoryList[i]
                    categoryList.push({
                        label: category.category_name,
                        value: category.category_id,
                        key: category.category_id
                    });
                }

                let brand_logo = [];
                let brand_background = [];

                if (self.props.route.path.indexOf('/edit') > -1) {
                    if (data.brand_logo != '') {
                        brand_logo.push(data.brand_logo);
                    }

                    if (data.brand_background != '') {
                        brand_background.push(data.brand_background);
                    }
                }

                self.setState({
                    categoryList: categoryList,
                    brand_logo: brand_logo,
                    brand_background: brand_background
                });

                if (self.props.route.path.indexOf('/edit') > -1) {
                    self.props.form.setFieldsValue(data);
                }
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

            values.brand_id = self.props.params.brand_id;
            values.brand_agreement = self.state.brand_agreement;

            if (self.state.brand_logo.length > 0) {
                values.brand_logo = self.state.brand_logo[0];
            } else {
                values.brand_logo = '';
            }

            if (self.state.brand_background.length > 0) {
                values.brand_background = self.state.brand_background[0];
            } else {
                values.brand_background = '';
            }

            Helper.ajax({
                url: '/brand/' + type,
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

    onChangeCategory(value) {
        this.props.form.setFieldsValue({
            category_id: value
        });
    }

    onChangeLogoImage(list) {
        this.setState({
            brand_logo: list
        });
    }

    onChangeBackgroundImage(list) {
        this.setState({
            brand_background: list
        });
    }

    onChangeContent(content) {
        this.setState({
            brand_agreement: content
        });
    }

    render() {
        const FormItem = Form.Item;
        const Option = Select.Option;
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
                    <FormItem {...Helper.formItemLayout} label="分类">
                        {getFieldDecorator('category_id', {
                            rules: [{
                                required: true,
                                message: Helper.required
                            }]
                        })(
                            <Select style={{
                                width: Helper.inputWidth
                            }} placeholder="请选择分类" onChange={this.onChangeCategory.bind(this)}>
                                {
                                    this.state.categoryList.map(function (item) {
                                        return (
                                            <Option key={item.key} value={item.value}>{item.label}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="名称">
                        {getFieldDecorator('brand_name', {
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
                    <FormItem {...Helper.formItemLayout} label="Logo">
                        <InputImage value={this.state.brand_logo} limit={1}
                                    onChangeImage={this.onChangeLogoImage.bind(this)}/>
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="背景">
                        <InputImage value={this.state.brand_background} limit={1}
                                    onChangeImage={this.onChangeBackgroundImage.bind(this)}/>
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="介绍">
                        {getFieldDecorator('brand_introduce')(
                            <Input type="textarea" rows={5} placeholder="请输入名称"/>
                        )}
                    </FormItem>
                    <FormItem {...Helper.formItemLayout} label="协议书">
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

BrandDetail = Form.create({})(BrandDetail);

export default withRouter(connect((state) => state, {
    setAction
})(BrandDetail));