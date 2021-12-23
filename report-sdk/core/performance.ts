enum ReportType {
    performance,
    network,
    error
}

interface Options {
    domain: string; // 上报地址
}

class PerformanceReport {
    opts: Options
    constructor(opts: Options) {
        this.opts = opts
    }
    // 资源列表
    resourceList = []
    // 错误列表
    errorList = []
    // 当前页面
    page =  ''

    /**
     * 上报
     */
    report = (type: ReportType) => {
        if (!window.fetch) {
            return
        }
        const data = {
            time: new Date().getTime(),
            type,
            url: location.href
        }
        // Fetch POST
        fetch(this.opts.domain, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        // Image GET


    }
}