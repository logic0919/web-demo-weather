const key = '10f539b8897d421ca51e3613b421b1d0';



function fn() {
    // const res = await axios.get('https://devapi.qweather.com/v7/weather/7d', {
    //     params: {
    //         location: '101010100',
    //         key
    //     }
    // })
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://192.168.0.146:9080/test')
    xhr.addEventListener('loadend', () => {
        console.log(xhr);
        console.log(xhr.response);//json
        let data = JSON.parse(xhr.response)//json->对象
        console.log(data);
    })
    xhr.send()
}
fn();



// function myAxios(config) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest()
//         if (config.params) {
//             const paramsObj = new URLSearchParams(config.params)
//             const queryString = paramsObj.toString()
//             config.url += `?${queryString}`
//         }
//         xhr.open(config.method || 'GET', config.url)
//         xhr.addEventListener('loadend', () => {
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 resolve(JSON.parse(xhr.response))
//             }
//             else {
//                 reject(new Error(xhr.response))
//             }
//         })
//         xhr.send()
//     })
// }
// function render(id) {
//     // 七天天气模块
//     function getWeather() {
//         myAxios({
//             method: 'GET',
//             url: 'https://devapi.qweather.com/v7/weather/7d',
//             params: {
//                 location: id,
//                 key
//             }
//         }).then(result => {
//             console.log(result);
//         }).catch(error => {
//             console.dir(error)
//         })
//     }
//     getWeather()
// }
// render('101010100')
