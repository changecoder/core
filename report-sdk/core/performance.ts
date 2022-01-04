interface ResourceData {
    name: string; 
    type: string; 
    duration: string | number; 
    decodedBodySize: number; 
    nextHopProtocol: string;
}

const isSupported: boolean = !!window.performance

/**
 * 统计页面性能
 */
const getTimePerformance = () => {
    // 在新的标准(Navigation Timing Level 2 草案中), timing被移除, 因此我们这里不使用performance.timing
    // 新标准的返回值为基于startTime时间的duration
    const timing = isSupported && (window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)
    if (!timing) {
        return {}
    }
    return {
        // 重定向时间
        redirectTime: timing.redirectEnd - timing.redirectStart || 0,
        // 查询缓存数据时间
        appcacheTime: timing.domainLookupStart - timing.fetchStart || 0,
        // DNS解析时间
        dnsTime: timing.domainLookupEnd - timing.domainLookupStart || 0,
        // TCP连接耗时
        tcpConnectedTime: timing.connectEnd - timing.connectStart || 0,
        // Request请求耗时
        requestTime: timing.responseEnd - timing.requestStart || 0,
        // 首字节耗费时间  
        ttfbTime: timing.responseStart || 0,
        // 首屏时间(在无侵入时使用,在head结束处或body开始处计算结束时间更准确)
        firstPaintTime: timing.domInteractive || 0,
        //dom渲染完成时间
        domRenderEndTime: timing.domContentLoadedEventEnd || 0,
        // 解析DOM树耗时
        analysisTime: timing.domComplete - timing.domInteractive || 0,
        //页面onload时间
        onLoadTime: timing.loadEventEnd || 0,
        // 页面准备时间 
        prepareTime: timing.fetchStart || 0,
        // 卸载页面的时间
        unloadTime: timing.unloadEventEnd - timing.unloadEventStart || 0,     
        // 首屏时间(在无侵入时使用,在body dom结束处计算结束时间更准确)
        firstContentPaintTime: timing.domComplete || 0
    }
}

const getResourcePerformance = () => {
    const resource = isSupported && (window.performance.getEntriesByType('resource') as PerformanceResourceTiming[])
    if (!resource) {
        return []
    }
    const resourceList: Array<ResourceData> = []
    resource.forEach(item => {
        const json = {
            name: item.name,
            type: item.initiatorType,
            duration: item.duration.toFixed(2) || 0,
            decodedBodySize: item.decodedBodySize || 0,
            nextHopProtocol: item.nextHopProtocol
        }
        resourceList.push(json)
    })
    return resourceList
}

export {
    getTimePerformance,
    getResourcePerformance
}