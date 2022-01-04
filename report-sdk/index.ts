import { 
    XhrError, 
    XhrRequestConfig, 
    XhrResponse 
} from 'ajax-hook'
import * as AjaxHook from 'ajax-hook'

import sendData from './core/send'
import {
    getTimePerformance,
    getResourcePerformance
} from './core/performance'
import { registerErrorEvent } from './core/error'

import * as clientData from './core/agent'

interface ReportOptions {
    domain?: string; // 上报地址
    delay?: number; // 上报延迟时间, 单位毫秒
    isAjax?: boolean; // 是否监听上报Ajax请求数据
    filterUrl?: Array<string>; // AJAX请求时需要过滤的URL信息
    isPage?: boolean; // 是否上报页面性能数据
    isError?: boolean; // 是否监听上报错误信息
    extra?: {
        [key: string]: string;
    } // 自定义信息
}

interface AjaxData {
    id: string;
    url: string;
    method: string;
    status: number;
    statusText: string;
    errorType?: string;
    requestTime: number;
    responseTime: number;
}

interface Conf {
    resourceList: Array<any>;
    performance: {
        [key: string]: number | undefined;
    };
    errorList: Array<any>;
    ajaxList: {
        [id: string]: AjaxData
    };
    page: string;
}

const defaultOptions: ReportOptions = {
    domain: 'https://api.changecoder.com/v1/proxy/report',
    delay: 1000,
    isAjax: true,
    filterUrl: [],
    isPage: true,
    isError: true
}

const generateId = (url: string) => `${Date.now()}-${url}`

export default class Report {
    opts: ReportOptions
    conf: Conf
    constructor(opts: ReportOptions) {
        this.opts = Object.assign({}, defaultOptions, opts)
        this.initConf()
    }

    initConf() {
        this.conf = {
             //资源列表 
             resourceList: [],
             // 页面性能列表
             performance: {},
             // 错误列表
             errorList: [],
             // ajax信息列表
             ajaxList: {},
             // 当前页面
             page: window.location.href
        }
    }

    sendReport() {
        const url = this.opts.domain
        const data = Object.assign({}, clientData)
        sendData(url as string, data)
    }

    start() {
        const { isAjax } = this.opts
        if (isAjax) {
            AjaxHook.proxy({
                 //请求发起前进入
                onRequest: (config: XhrRequestConfig, handler) => {
                    const id = generateId(config.url)
                    this.conf.ajaxList[id] = {
                        id,
                        url: config.url,
                        method: config.method,
                        status: 0,
                        statusText: '',
                        errorType: '',
                        requestTime: Date.now(),
                        responseTime: 0
                    }
                    config.user = id
                    handler.next(config);
                },
                //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
                onError: (err: XhrError, handler) => {
                    const id = err.config.user
                    Object.assign({}, this.conf.ajaxList[id], {
                        responseTime: Date.now(),
                        errorType: err.type
                    })
                    handler.next(err)
                },
                //请求成功后进入
                onResponse: (response: XhrResponse, handler) => {
                    const id = response.config.user
                    Object.assign({}, this.conf.ajaxList[id], {
                        responseTime: Date.now(),
                        status: response.status,
                        statusText: response.statusText
                    })
                    handler.next(response)
                }   
            })
        }
        if (this.opts.isPage) {
            window.requestAnimationFrame(() => {
                const resourceData = getResourcePerformance()
                const perforamnceData = getTimePerformance()
                this.conf.performance = perforamnceData
                this.conf.resourceList = resourceData
            })
        }
        if (this.opts.isError) {
            registerErrorEvent(this.conf.errorList)
        }
    }

    getClientData() {
        return clientData
    }
}