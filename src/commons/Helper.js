import reqwest from 'reqwest';
import {message} from 'antd';

const Helper = {
    //host: 'http://localhost:8080',
    host: 'http://api.hongluomeng.nowui.com',
    inputWidth: 390,
    inputSearchWidth: 200,
    formItemLayout: {
        labelCol: {
            span: 3
        },
        wrapperCol: {
            span: 18
        }
    },
    formItemSearchLayout: {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 18
        }
    },
    platform: 'ADMIN',
    version: '1.0.0',
    limit: 12,
    duration: 1.5,
    message: '提示',
    description: '操作成功',
    token: 'token',
    required: '不能为空',
    delete: '删除后将无法恢复，您确定要删除吗？',
    yes: '确定',
    no: '取消',
    notificationSuccess: function () {
        message.success(this.description, this.duration);
    },
    ajax: function (config) {
        reqwest({
            url: this.host + config.url,
            type: 'json',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': this.getToken(),
                'platform': this.platform,
                'version': this.version
            },
            data: JSON.stringify(config.data),
            success: function (response) {
                if (response.code == 200) {
                    config.success(response.data);
                } else {
                    message.error(response.message, this.duration);
                }
            },
            error: function () {
                message.error('网络发生错误', this.duration);
            },
            complete: function () {
                config.complete();
            }
        })
    },
    getToken() {
        return localStorage.getItem(this.token);
    },
    login: function (token) {
        localStorage.setItem(this.token, token);
    },
    logout: function () {
        localStorage.removeItem(this.token);
    }
};

export default Helper;
