const imageReport = (url: string, data: any) => {
    const img = new Image()
    const params = Object.keys(data).reduce((a, key) => [`${key}=${encodeURIComponent(data[key])}`].concat(a), [])
    img.src = `${url}?${params.join('&')}`
}

const sendBeacon = (url: string, data: any) => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
        let value = data[key]
        if (typeof value !== 'string') {
            value = JSON.stringify(value)
        }
        formData.append(key, value)
    })
    navigator.sendBeacon(url, data)
}

const sendData = (url: string, data: any) => {
    if ('sendBeacon' in navigator) {
        sendBeacon(url, data)
    } else {
        imageReport(url, data)
    }
}

export default sendData