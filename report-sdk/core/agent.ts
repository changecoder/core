
// 系统
export let system = 'unknow'
// 系统版本
export let systemVersion = 'unknow'
// 平台
export let platform = 'unknow'
// 内核
export let engine = 'unknow'
// 内核版本
export let engineVersion = 'unknow'
// 浏览器
export let browser = 'unknow'
// 浏览器版本
export let browserVersion = 'unknow'
// 外壳(例如微信浏览器， QQ浏览器等)
export let shell = 'unknow'
// 外壳版本
export let shellVersion = 'unknow'

export const ua = navigator.userAgent.toLowerCase()

const testUa = (regExp: RegExp): boolean => regExp.test(ua)
const testVs = (regExp: RegExp): string | undefined => ua.match(regExp)?.toString().replace(/[^0-9|_.]/g, '').replace(/_/g, '.')
const setSystemVersion = (regExp: RegExp): void => {
    const value = testVs(regExp)
    if (value) {
        systemVersion = value
    }
}
const setEngineVersion = (regExp: RegExp): void => {
    const value = testVs(regExp)
    if (value) {
        engineVersion = value
    }
}
const setBrowserVersion = (regExp: RegExp): void => {
    const value = testVs(regExp)
    if (value) {
        browserVersion = value
    }
}
const setShellVersion = (regExp: RegExp): void => {
    const value = testVs(regExp)
    if (value) {
        shellVersion = value
    }
}

const winRegExp = /windows|win32|win64|wow32|wow64/g
const macOSRegExp = /macintosh|macintel/g
const androidRegExp = /android|adr/g
const iosRegExp = /ios|iphone|ipad|ipod|iwatch/g


export const isWindows = testUa(winRegExp)
export const isMacos = testUa(macOSRegExp)
export const isAndroid = testUa(androidRegExp)
export const isIos = testUa(iosRegExp)

if (isWindows) {
    system = 'windows'
} else if (isMacos) {
    system = 'macos'
} else if (isAndroid) {
    system = 'android'
} else if (isIos) {
    system = 'ios'
}

if (isWindows) {
    if (testUa(/windows nt 5.0|windows 2000/g)) {
        systemVersion = '2000'
    } else if (testUa(/windows nt 5.1|windows xp/g)) {
        systemVersion = 'xp'
    } else if (testUa(/windows nt 5.2|windows 2003/g)) {
        systemVersion = '2003'
    } else if (testUa(/windows nt 6.0|windows vista/g)) {
        systemVersion = 'vista'
    } else if (testUa(/windows nt 6.1|windows 7/g)) {
        systemVersion = '7'
    } else if (testUa(/windows nt 6.2|windows 8/g)) {
        systemVersion = '8'
    } else if (testUa(/windows nt 6.3|windows 8.1/g)) {
        systemVersion = '8.1'
    } else if (testUa(/windows nt 10.0|windows 10/g)) {
        systemVersion = '10'
    }
} else if (isMacos) {
    setSystemVersion(/os x [\d._]+/g)
} else if (isAndroid) {
    setSystemVersion(/os x [\d._]+/g)
} else if (isIos) {
    setSystemVersion(/os [\d._]+/g)
}

if (isWindows || isMacos) {
    platform = 'desktop'
} else if (isAndroid || isIos || testUa(/mobile/g)) {
    platform = 'mobile'
}

if (testUa(/applewebkit/g)) {
    engine = 'webkit'
    if (testUa(/edge/g)) {
        browser = 'edge'
    } else if (testUa(/opr/g)) {
        browser = 'opera'
    } else if (testUa(/chrome/g)) {
        browser = 'chrome'
    } else if (testUa(/safari/g)) {
        browser = 'safari'
    }
} else if (testUa(/gecko/g) && testUa(/firefox/g)) {
    engine = 'gecko'
    browser = 'firefox'
} else if (testUa(/presto/g)) {
    engine = 'presto'
    browser = 'opera'
} else if (testUa(/trident|compatible|msie/g)) {
    engine = 'trident'
    browser = 'ie'
}


if (engine === 'webkit') {
    setEngineVersion(/applewebkit\/[\d._]+/g)
} else if (engine === 'gecko') {
    setEngineVersion(/gecko\/[\d._]+/g)
} else if (engine === 'presto') {
    setEngineVersion(/presto\/[\d._]+/g)
} else if (engine === 'trident') {
    setEngineVersion(/trident\/[\d._]+/g)
}

if (browser === 'chrome') {
    setBrowserVersion(/chrome\/[\d._]+/g);
} else if (browser === 'safari') {
    setBrowserVersion(/version\/[\d._]+/g);
} else if (browser === 'firefox') {
    setBrowserVersion(/firefox\/[\d._]+/g);
} else if (browser === 'opera') {
    setBrowserVersion(/opr\/[\d._]+/g);
} else if (browser === 'iexplore') {
    setBrowserVersion(/(msie [\d._]+)|(rv:[\d._]+)/g);
} else if (browser === 'edge') {
    setBrowserVersion(/edge\/[\d._]+/g);
}

if (testUa(/micromessenger/g)) {
    shell = 'wechat'
    setShellVersion(/micromessenger\/[\d._]+/g)
} else if (testUa(/qqbrowser/g)) {
    shell = 'qq' // QQ浏览器
    setShellVersion(/qqbrowser\/[\d._]+/g)
} else if (testUa(/ucbrowser/g)) {
    shell = 'uc'
    setShellVersion(/ucbrowser\/[\d._]+/g)
} else if (testUa(/qihu 360se/g)) {
    shell = '360' // 360浏览器(无版本)
} else if (testUa(/metasr/g)) {
    shell = 'sougou' // 搜狗浏览器(无版本)
} else if (testUa(/lbbrowser/g)) {
    shell = 'liebao' // 猎豹浏览器(无版本)
} else if (testUa(/maxthon/g)) {
    shell = 'maxthon' // 遨游浏览器
    setShellVersion(/maxthon\/[\d._]+/g)
}