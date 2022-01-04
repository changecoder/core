interface ReportData {
    resourceUrl?: string;
    col?: number;
    line?: number;
}

interface InfoData {
    time?: number;
    msg?: string;
    data?: ReportData;
}

const createInfo = (data: InfoData) => Object.assign({}, {
    time: new Date().getTime()
}, data)

const processStack = (stack: string): ReportData => {
    let resourceUrl: string = ''
    let col: number = 0
    let line: number = 0
    let errs = stack.match(/\(.+?\)/)
    if (errs && errs.length) {
        let errString = errs[0]
        errString = errString.replace(/\w.+[js|html]/g, $1 => { 
            resourceUrl = $1
            return '' 
        })
        const errArr = errString.split(':')
        try {
            line = parseInt(errArr[1])
            col = parseInt(errArr[2])
        } catch (e) {

        }
    }
    return {
        resourceUrl,
        col,
        line
    }
}
const globalErrorListener = (errorList: Array<any>) => {
    // 资源加载失败 （字体加载失败是否触发待确定）
    window.addEventListener('error', (e: ErrorEvent) => {
        const info = createInfo({
            msg: e.error.stack ? e.error.stack.toString(): e.message,
            data: {
                resourceUrl: (e.target as HTMLLinkElement).href || (e.target as HTMLScriptElement | HTMLImageElement).src || (e.target as HTMLMediaElement).currentSrc,
                line: e.lineno,
                col: e.colno
            }
        })
        if (e.target !== window) {
            errorList.push(info)
        }
    })
    // JS运行时失败
    window.onerror = function (msg, _url, line, col, error) {
        const info = createInfo({
            msg: error?.stack ? error.stack.toString() : msg as string,
            data: {
                resourceUrl: _url,
                line,
                col
            }
        })
        errorList.push(info)
    }
    // Promise错误
    window.addEventListener('unhandledrejection', function (e: PromiseRejectionEvent) {
        const error = e.reason
        const stack = error.stack || ''
        const info = createInfo({
            msg: error.message || '',
            data: processStack(stack)
        })
        errorList.push(info)
    })
    // 页面奔溃处理
}

export {
    globalErrorListener as registerErrorEvent
}