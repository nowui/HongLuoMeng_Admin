import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Row, Col, Button, Form, Input, Select, InputNumber, Checkbox, Radio } from 'antd'
import InputImage from '../../components/InputImage'
import HtmlEditor from '../../components/HtmlEditor'
import { connect } from 'react-redux'
import { SET_SPIN } from '../../commons/Constant'
import { setAction } from '../../actions/Index'
import Helper from '../../commons/Helper'

import styles from '../Style.less'

class ProductDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categoryList: [],
            brandList: [],
            memberLevelList: [],
            product_image: [],
            product_content: '',
            categoryAttributeList: [],
            categoryAttributeSkuList: [],
            skuList: [],
            productSkuList: [],
            productSku: []
        }
    }

    componentDidMount() {
        this.props.onSelectMenu('/product/index')

        this.load()
    }

    load = function() {
        let self = this

        self.props.setAction(SET_SPIN, {
            isLoad: true
        })

        Helper.ajax({
            url: '/product/find',
            data: {
                product_id: self.props.params.product_id
            },
            success: function(data) {
                let categoryList = []

                for (let i = 0; i < data.categoryList.length; i++) {
                    let category = data.categoryList[i]
                    categoryList.push({
                        label: category.category_name,
                        value: category.category_id,
                        key: category.category_id
                    })
                }

                let brandList = []

                for (let i = 0; i < data.brandList.length; i++) {
                    let brand = data.brandList[i]
                    brandList.push({
                        label: brand.brand_name,
                        value: brand.brand_id,
                        key: brand.brand_id
                    })
                }

                let categoryAttributeSkuList = []

                if (typeof (data.categoryAttributeList) == 'undefined') {
                    data.categoryAttributeList = []
                }

                for (let i = 0; i < data.categoryAttributeList.length; i++) {
                    let category_attribute = data.categoryAttributeList[i]
                    if (category_attribute.attribute_type == 'sku') {
                        let item = []

                        for (let k = 0; k < category_attribute.attribute_default_value.length; k++) {
                            item.push({
                                value: category_attribute.attribute_default_value[k],
                                isCheck: false
                            })
                        }

                        categoryAttributeSkuList.push({
                            attribute_id: category_attribute.attribute_id,
                            attribute_name: category_attribute.attribute_name,
                            item: item
                        })
                    }
                }

                self.setState({
                    categoryList: categoryList,
                    brandList: brandList,
                    memberLevelList: data.memberLevelList,
                    product_image: data.product_image,
                    categoryAttributeList: data.categoryAttributeList,
                    categoryAttributeSkuList: categoryAttributeSkuList,
                    productSkuList: data.productSkuList,
                    productSku: data.productSku
                })

                self.props.form.setFieldsValue(data)

                self.setCategoryAttributeFieldsValue()

                if (self.props.route.path.indexOf('/edit') > -1) {
                    //设置一般价格和库存
                    for (let i = 0; i < self.state.productSkuList.length; i++) {
                        let productSku = self.state.productSkuList[i]
                        if ('[]' == JSON.stringify(productSku.product_attribute_value)) {
                            self.props.form.setFieldsValue({
                                product_price_base: productSku.product_price,
                                product_stock_base: productSku.product_stock
                            })
                        }
                    }

                    self.refs.htmlEditor.init(data.product_content)

                    self.setState({
                        product_content: data.product_content
                    })
                }

                //设置sku
                setTimeout(function() {
                    for (let i = 0; i < self.state.productSkuList.length; i++) {
                        let productSku = self.state.productSkuList[i]
                        let sku_id = ''

                        for (let j = 0; j < productSku.product_attribute_value.length; j++) {
                            let product_attribute_value = productSku.product_attribute_value[j]
                            sku_id += '_' + product_attribute_value.attribute_value

                            self.checkCategoryAttributeSkuList(product_attribute_value.attribute_id, product_attribute_value.attribute_value, true)

                            let object = {}

                            object[product_attribute_value.attribute_id + '.' + product_attribute_value.attribute_value] = true

                            self.props.form.setFieldsValue(object)
                        }

                        let priceObject = {}
                        priceObject['product_price.' + sku_id] = productSku.product_price
                        self.props.form.setFieldsValue(priceObject)

                        let stockObject = {}
                        stockObject['product_stock.' + sku_id] = productSku.product_stock
                        self.props.form.setFieldsValue(stockObject)
                    }

                    self.check(0, 0, [])
                }, 100)
            },
            complete: function() {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                })
            }
        })
    }

    loadCategoryAttribute = function(categoryId) {
        let self = this

        self.props.setAction(SET_SPIN, {
            isLoad: true
        })

        Helper.ajax({
            url: '/product/category/attribute/list',
            data: {
                product_id: self.props.params.product_id,
                category_id: categoryId
            },
            success: function(data) {
                let categoryAttributeSkuList = []

                if (typeof (data) == 'undefined') {
                    data = []
                }

                for (let i = 0; i < data.length; i++) {
                    let category_attribute = data[i]
                    if (category_attribute.attribute_type == 'sku') {
                        let item = []

                        for (let k = 0; k < category_attribute.attribute_default_value.length; k++) {
                            item.push({
                                value: category_attribute.attribute_default_value[k],
                                isCheck: false
                            })
                        }

                        categoryAttributeSkuList.push({
                            attribute_id: category_attribute.attribute_id,
                            item: item
                        })
                    }
                }

                self.setState({
                    categoryAttributeSkuList: categoryAttributeSkuList,
                    categoryAttributeList: data
                })

                self.setCategoryAttributeFieldsValue()
            },
            complete: function() {
                self.props.setAction(SET_SPIN, {
                    isLoad: false
                })
            }
        })
    }

    setCategoryAttributeFieldsValue = function() {
        for (let i = 0; i < this.state.categoryAttributeList.length; i++) {
            let categoryAttribute = this.state.categoryAttributeList[i]
            let object = {}

            object['categoryAttributeList.' + categoryAttribute.attribute_id] = categoryAttribute.attribute_value

            this.props.form.setFieldsValue(object)
        }
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

            values.product_id = self.props.params.product_id
            values.product_image = JSON.stringify(self.state.product_image)
            values.product_content = self.state.product_content

            let categoryAttributeList = []
            for (let i = 0; i < self.state.categoryAttributeList.length; i++) {
                let categoryAttribute = self.state.categoryAttributeList[i]
                categoryAttributeList.push({
                    attribute_id: categoryAttribute.attribute_id,
                    attribute_name: categoryAttribute.attribute_name,
                    attribute_value: self.props.form.getFieldValue('categoryAttributeList.' + categoryAttribute.attribute_id)
                })
            }
            values.categoryAttributeList = categoryAttributeList

            let productSkuList = []
            let memberLevelPriceList = []
            for (let i = 0; i < self.state.memberLevelList.length; i++) {
                let memberLevel = self.state.memberLevelList[i]
                memberLevelPriceList.push({
                    member_level_id: memberLevel.member_level_id,
                    member_level_name: memberLevel.member_level_name,
                    member_level_price: self.props.form.getFieldValue('memberLevelList.' + memberLevel.member_level_id)
                })
            }

            productSkuList.push({
                product_attribute_value: [],
                product_stock: self.props.form.getFieldValue('product_stock_base'),
                product_price: self.props.form.getFieldValue('product_price_base'),
                member_level_price: memberLevelPriceList
            })

            for (let i = 0; i < self.state.skuList.length; i++) {
                let sku_id = ''

                let sku = self.state.skuList[i]
                for (let j = 0; j < sku.length; j++) {
                    sku_id += '_' + sku[j].attribute_value
                }

                let member_level_price = []

                for (let i = 0; i < self.state.memberLevelList.length; i++) {
                    let memberLevel = self.state.memberLevelList[i]
                    member_level_price.push({
                        member_level_id: memberLevel.member_level_id,
                        member_level_name: memberLevel.member_level_name,
                        member_level_price: self.props.form.getFieldValue('memberLevelList.' + memberLevel.member_level_id + sku_id)
                    })
                }

                let product_stock = self.props.form.getFieldValue('product_stock.' + sku_id)
                let product_price = self.props.form.getFieldValue('product_price.' + sku_id)

                productSkuList.push({
                    product_attribute_value: sku,
                    product_stock: product_stock,
                    product_price: product_price,
                    member_level_price: member_level_price
                })
            }

            values.productSkuList = productSkuList

            values.memberLevelList = []

            values.product_price_base = undefined
            values.product_stock_base = undefined
            values.product_price = undefined
            values.product_stock = undefined

            self.props.setAction(SET_SPIN, {
                isLoad: true
            })

            let type = self.props.route.path.indexOf('/edit') > -1 ? 'update' : 'save'

            Helper.ajax({
                url: '/product/' + type,
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

    onChangeCategory(value) {
        this.loadCategoryAttribute(value)

        this.props.form.setFieldsValue({
            category_id: value
        })
    }

    onChangeSku(attribute_id, attribute_value, event) {
        this.checkCategoryAttributeSkuList(attribute_id, attribute_value, event.target.checked)

        this.check(0, 0, [])
    }

    checkCategoryAttributeSkuList(attribute_id, attribute_value, checked) {
        let categoryAttributeSkuList = this.state.categoryAttributeSkuList

        for (let i = 0; i < categoryAttributeSkuList.length; i++) {
            let categoryAttribute = categoryAttributeSkuList[i]
            if (categoryAttribute.attribute_id == attribute_id) {
                for (let j = 0; j < categoryAttribute.item.length; j++) {
                    let item = categoryAttribute.item[j]
                    if (item.value == attribute_value) {
                        if (checked) {
                            item.isCheck = true
                        } else {
                            item.isCheck = false
                        }
                    }
                }
            }
        }

        this.setState({
            categoryAttributeSkuList: categoryAttributeSkuList
        })
    }

    check(index, count, skuList) {
        if (index >= this.state.categoryAttributeSkuList.length) {
            return
        }

        let list = []

        for (let i = 0; i < this.state.categoryAttributeSkuList.length; i++) {
            if (i == index) {
                let categoryAttribute = this.state.categoryAttributeSkuList[i]
                for (let j = 0; j < categoryAttribute.item.length; j++) {
                    let item = categoryAttribute.item[j]
                    if (item.isCheck) {
                        list.push([{
                            attribute_id: categoryAttribute.attribute_id,
                            attribute_name: categoryAttribute.attribute_name,
                            attribute_value: item.value
                        }])
                    }

                }
            }
        }

        if (skuList.length == 0) {
            skuList = list
        } else {
            let array = skuList.concat()

            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < list.length; j++) {
                    skuList[array.length * j + i] = array[i].concat()

                    if (typeof (skuList[array.length * j + i][count]) == 'undefined') {
                        skuList[array.length * j + i][count] = list[j][0]
                    }
                }
            }
        }

        index++

        if (list.length > 0) {
            count++
        }

        if (index == this.state.categoryAttributeSkuList.length) {
            this.setState({
                skuList: skuList
            })
        }

        this.check(index, count, skuList.concat())
    }

    onChangeImage(list) {
        this.setState({
            product_image: list
        })
    }

    onChangeContent(content) {
        this.setState({
            product_content: content
        })
    }

    render() {
        const FormItem = Form.Item
        const Option = Select.Option
        const RadioGroup = Radio.Group
        const {getFieldDecorator, getFieldError, isFieldValidating} = this.props.form

        return (
            <div>
        <Row className={styles.contentTitle + ' ' + styles.contentTitleBottom}>
          <Col span={12}>
            <h2>商品表单</h2>
          </Col>
          <Col span={12} className={styles.contentMenu}>
            <Button icon="circle-left" size="default" onClick={this.onClickBack.bind(this)}>返回</Button>
          </Col>
        </Row>
        <Form horizontal className={styles.contentMain + ' ' + styles.contentMainPaddingTop}>
          <h3>基本信息</h3>
            <FormItem {...Helper.formItemLayout} label="分类" >
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
                this.state.categoryList.map(function(item) {
                    return (
                        <Option key={item.key} value={item.value}>{item.label}</Option>
                    )
                })
                }
                </Select>
            )}

            </FormItem>
            <FormItem {...Helper.formItemLayout} label="品牌" >
              {getFieldDecorator('brand_id', {
                rules: [{
                    required: true,
                    message: Helper.required
                }]
            })(
                <Select style={{
                    width: Helper.inputWidth
                }} placeholder="请选择品牌">
                  {
                this.state.brandList.map(function(item) {
                    return (
                        <Option key={item.key} value={item.value}>{item.label}</Option>
                    )
                })
                }
                </Select>
            )}
            </FormItem>
            <FormItem {...Helper.formItemLayout} label="名称" >
              {getFieldDecorator('product_name', {
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
            <FormItem {...Helper.formItemLayout} label="价格" >
              {getFieldDecorator('product_price_base', {
                rules: [{
                    type: 'number',
                    required: true,
                    message: Helper.required
                }],
                initialValue: 0.01
            })(
                <InputNumber style={{
                    width: Helper.inputWidth
                }} placeholder="请输入价格" min={0.00} max={9999.00} step={0.01} />
            )}
            </FormItem>
            {
            this.state.memberLevelList.map(function(item) {
                let price = 0.01

                for (let i = 0; i < this.state.productSkuList.length; i++) {
                    let productSku = this.state.productSkuList[i]
                    for (let j = 0; j < productSku.member_level_price.length; j++) {
                        let member_level_price = productSku.member_level_price[j]
                        if (item.member_level_id == member_level_price.member_level_id && '[]' == JSON.stringify(productSku.product_attribute_value)) {
                            price = member_level_price.member_level_price
                        }
                    }
                }

                return (
                    <FormItem key={item.member_level_id} {...Helper.formItemLayout} label={item.member_level_name + '价格'} >
                    {getFieldDecorator('memberLevelList.' + item.member_level_id, {
                        rules: [{
                            type: 'number',
                            required: true,
                            message: Helper.required
                        }],
                        initialValue: price
                    })(
                        <InputNumber style={{
                            width: Helper.inputWidth
                        }} placeholder={"请输入" + item.member_level_name + '价格'} min={0.00} max={9999.00} step={0.01} />
                    )}
                  </FormItem>
                )
            }.bind(this))
            }
            <FormItem {...Helper.formItemLayout} label="库存" >
              {getFieldDecorator('product_stock_base', {
                rules: [{
                    type: 'number',
                    required: true,
                    message: Helper.required
                }],
                initialValue: 1
            })(
                <InputNumber style={{
                    width: Helper.inputWidth
                }} placeholder="请输入库存" min={0} max={9999} />
            )}
            </FormItem>
            <FormItem {...Helper.formItemLayout} label="图片" >
              <InputImage value={this.state.product_image} onChangeImage={this.onChangeImage.bind(this)} />
            </FormItem>
            <FormItem {...Helper.formItemLayout} label="标记" >
              <Col span="3">
                <FormItem>
                  {getFieldDecorator('product_is_new', {
                valuePropName: 'checked',
                initialValue: false
            })(
                <Checkbox>新品</Checkbox>
            )}
                </FormItem>
              </Col>
              <Col span="3">
                <FormItem>
                  {getFieldDecorator('product_is_recommend', {
                valuePropName: 'checked',
                initialValue: false
            })(
                <Checkbox>推荐</Checkbox>
            )}
                </FormItem>
              </Col>
              <Col span="3">
                <FormItem>
                  {getFieldDecorator('product_is_bargain', {
                valuePropName: 'checked',
                initialValue: false
            })(
                <Checkbox>特价</Checkbox>
            )}
                </FormItem>
              </Col>
              <Col span="3">
                <FormItem>
                  {getFieldDecorator('product_is_hot', {
                valuePropName: 'checked',
                initialValue: false
            })(
                <Checkbox>热卖</Checkbox>
            )}
                </FormItem>
              </Col>
              <Col span="3">
                <FormItem>
                  {getFieldDecorator('product_is_sell_out', {
                valuePropName: 'checked',
                initialValue: false
            })(
                <Checkbox>卖完</Checkbox>
            )}
                </FormItem>
              </Col>
            </FormItem>
            <FormItem {...Helper.formItemLayout} label="状态" >
              {getFieldDecorator('product_is_sale', {
                initialValue: true
            })(
                <RadioGroup>
                  <Radio value={true}>上架</Radio>
                  <Radio value={false}>下架</Radio>
                </RadioGroup>
            )}
            </FormItem>
            <div className={styles.hr}></div>
            <h3>SKU</h3>
            {
            this.state.categoryAttributeList.map(function(item, index) {
                const options = []
                const value = []

                for (let i = 0; i < this.state.productSkuList.length; i++) {
                    let productSku = this.state.productSkuList[i]
                    for (let j = 0; j < productSku.product_attribute_value.length; j++) {
                        let product_attribute_value = productSku.product_attribute_value[j]
                        if (product_attribute_value.attribute_id == item.attribute_id) {
                            value.push(product_attribute_value.attribute_value)
                        }
                    }
                }

                if (item.attribute_type == 'sku') {
                    for (let i = 0; i < item.attribute_default_value.length; i++) {
                        options.push({
                            label: item.attribute_default_value[i],
                            value: item.attribute_default_value[i]
                        })
                    }
                }
                return (
                item.attribute_type == 'sku' ?
                    <FormItem key={item.attribute_id} {...Helper.formItemLayout} label={item.attribute_name} >
                    {
                    item.attribute_default_value.map(function(attribute_default_value, i) {
                        return (
                            <div style={{
                                float: 'left',
                                width: '100px',
                                height: '30px'
                            }} key={i}>
                            <FormItem>
                            {getFieldDecorator(item.attribute_id + '.' + attribute_default_value, {
                                valuePropName: 'checked'
                            })(
                                <Checkbox onChange={this.onChangeSku.bind(this, item.attribute_id, attribute_default_value)}>{attribute_default_value}</Checkbox>
                            )}
                            </FormItem>
                          </div>
                        )
                    }.bind(this))
                    }
                  </FormItem>
                    :
                    ''
                )
            }.bind(this))
            }
            {
            this.state.skuList.map(function(item, index) {
                return (
                index == 0 ?
                    <Row key={index}>
                    <Col span={3}></Col>
                    <Col span={18}>
                      {
                    item.map(function(sku, i) {
                        return (
                            <div key={i}>
                              <div style={{
                                float: 'left',
                                width: '50px',
                                height: '40px',
                                lineHeight: '30px'
                            }}></div>
                            </div>
                        )
                    })
                    }
                      <div className={styles.skuInput}>价格</div>
                      {
                    this.state.memberLevelList.map(function(memberLevel) {
                        return (
                            <div key={memberLevel.member_level_id} className={styles.skuInput}>{memberLevel.member_level_name + '价格'}</div>
                        )
                    }.bind(this))
                    }
                      <div className={styles.skuInput}>库存</div>
                    </Col>
                  </Row>
                    :
                    ''
                )
            }.bind(this))
            }
            {
            this.state.skuList.map(function(item, index) {
                let sku_id = ''

                return (
                    <Row key={index}>
                    <Col span={3}></Col>
                    <Col span={18}>
                      {
                    item.map(function(sku, i) {
                        sku_id += '_' + sku.attribute_value
                        return (
                            <div key={i}>
                              <div style={{
                                float: 'left',
                                width: '50px',
                                height: '40px',
                                lineHeight: '30px'
                            }}>{sku.attribute_value}</div>
                            </div>
                        )
                    })
                    }
                      <div className={styles.skuInput}>
                        {getFieldDecorator('product_price.' + sku_id, {
                        rules: [{
                            type: 'number',
                            required: true,
                            message: Helper.required
                        }],
                        initialValue: 0.01
                    })(
                        <InputNumber style={{
                            width: '100%'
                        }} placeholder="请输入价格" min={0.00} max={9999.00} step={0.01} />
                    )}
                      </div>
                      {
                    this.state.memberLevelList.map(function(memberLevel) {
                        let price = 0.01

                        for (let i = 0; i < this.state.productSkuList.length; i++) {
                            let productSku = this.state.productSkuList[i]
                            for (let j = 0; j < productSku.member_level_price.length; j++) {
                                let member_level_price = productSku.member_level_price[j]
                                if (memberLevel.member_level_id == member_level_price.member_level_id && JSON.stringify(item) == JSON.stringify(productSku.product_attribute_value)) {
                                    price = member_level_price.member_level_price
                                }
                            }
                        }

                        return (
                            <div key={memberLevel.member_level_id} className={styles.skuInput}>
                              {getFieldDecorator('memberLevelList.' + memberLevel.member_level_id + sku_id, {
                                rules: [{
                                    type: 'number',
                                    required: true,
                                    message: Helper.required
                                }],
                                initialValue: price
                            })(
                                <InputNumber style={{
                                    width: '100%'
                                }} placeholder={memberLevel.member_level_name + '价格'} min={0.00} max={9999.00} step={0.01} />
                            )}
                            </div>
                        )
                    }.bind(this))
                    }
                      <div className={styles.skuInput}>
                        {getFieldDecorator('product_stock.' + sku_id, {
                        rules: [{
                            type: 'number',
                            required: true,
                            message: Helper.required
                        }],
                        initialValue: 1
                    })(
                        <InputNumber style={{
                            width: '100%'
                        }} placeholder="请输入库存" min={0} max={9999} step={1} />
                    )}
                      </div>
                    </Col>
                  </Row>
                )
            }.bind(this))
            }
            <div className={styles.hr}></div>
            <h3>参数信息</h3>
            {
            this.state.categoryAttributeList.map(function(item) {
                return (
                item.attribute_type == 'normal' ?
                    <FormItem key={item.attribute_id} {...Helper.formItemLayout} label={item.attribute_name} >
                    {getFieldDecorator('categoryAttributeList.' + item.attribute_id)(
                        <Input type="text" style={{
                            width: Helper.inputWidth
                        }} placeholder={'请输入' + item.attribute_name} />
                    )}
                  </FormItem>
                    :
                    ''
                )
            }.bind(this))
            }
            <div className={styles.hr}></div>
            <h3>详细介绍</h3>
            <FormItem {...Helper.formItemLayout} label="内容" >
              <HtmlEditor ref="htmlEditor" onChangeContent={this.onChangeContent.bind(this)} />
            </FormItem>
            <FormItem wrapperCol={{
                offset: Helper.formItemLayout.labelCol.span
            }}>
              <Button type="primary" icon="check-circle" size="default" onClick={this.onClickSubmit.bind(this)}>确定</Button>
            </FormItem>
            <br />
            <br />
            <br />
        </Form>
      </div>
        )
    }
}

ProductDetail = Form.create({

})(ProductDetail)

export default withRouter(connect((state) => state, {
    setAction
})(ProductDetail))