window.addEventListener('load', () => {
    let i, count
    const key = '10f539b8897d421ca51e3613b421b1d0'
    const range = 'cn'
    // get方法
    function myAxios(config) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            if (config.params) {
                const paramsObj = new URLSearchParams(config.params)
                const queryString = paramsObj.toString()
                config.url += `?${queryString}`
            }
            xhr.open(config.method || 'GET', config.url)
            xhr.addEventListener('loadend', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.response))
                }
                else {
                    reject(new Error(xhr.response))
                }
            })
            xhr.send()
        })
    }

    // 渲染折线
    function can(arrMax, arrMin) {
        let c1 = document.getElementById('c1')
        let ctx = c1.getContext('2d')
        ctx.lineWidth = 2;
        let arrmax = [].concat(arrMax)
        arrmax.sort((a, b) => b - a)
        let arrmin = [].concat(arrMin)
        arrmin.sort((a, b) => a - b)
        let max = arrmax[0]
        let min = arrmin[0]
        let sub = max - min
        let pertem = 80 / sub
        function draw(arr, color,num) {
            arr.forEach(function (a, b) {
                ctx.strokeStyle = color
                ctx.fillStyle = color
                let x = 47 + 92 * b
                let y = 174 - (a - min) * pertem - 47
                console.log(y);
                ctx.arc(x, y, 4, 0, Math.PI * 2)
                ctx.lineTo(x, y)
                ctx.stroke()
                ctx.fillStyle = "rgb(52, 53, 54)"
                ctx.font = "18px Microsoft YaHei"
                if (num==1) {
                    ctx.fillText(a + '°', x, y - 18);
                }else{
                    ctx.fillText(a + '°', x, y + 32);
                }
                ctx.textAlign = "center";
            })
        }
        ctx.beginPath()
        draw(arrMax, 'rgb(252, 195, 112)',1)
        ctx.closePath()
        ctx.beginPath()
        ctx.moveTo(47, 174 - (arrMin[0] - min) * pertem - 47)
        draw(arrMin, 'rgb(148, 204, 249)',2)
        ctx.closePath()
    }

    // 渲染页面模块
    function render(id) {
        // 七天天气模块
        function getWeather() {
            myAxios({
                method: 'GET',
                url: 'https://devapi.qweather.com/v7/weather/7d',
                params: {
                    location: id,
                    key
                }
            }).then(result => {
                let arrMax = [29]
                let arrMin = [18]
                let dayForecast = document.querySelector('.fw-main2-left-bottom')
                dayForecast.innerHTML = `
                    <div class="li">
                    <p class="date" style="text-align: center;">昨天</p>
                    <p class="day" style="text-align: center;">07月26日</p>
                    <p class="weather1" style="text-align: center;">多云</p>
                    <i class='qi-307 i1'></i>
                    <div></div>
                    <canvas id="c1" width="740" height="174"></canvas>
                    <i class='qi-307 i3'></i>
                    <p class="weather2" style="text-align: center;">晴</p>
                    <p class="wind" style="text-align: center;">微风 3级</p>
                    </div></div>`
                for (i = 0; i < 7; i++) {
                    arrMax.push(+result.daily[i].tempMax)
                    arrMin.push(+result.daily[i].tempMin)
                    dayForecast.innerHTML += `
                    <div class="li">
                    <p class="date" style="text-align: center;">今天</p>
                    <p class="day" style="text-align: center;">${result.daily[i].fxDate}</p>
                    <p class="weather1" style="text-align: center;">${result.daily[i].textDay}</p>
                    <i class='qi-${result.daily[i].iconDay} i1'></i>
                    <div></div>
                    <i class='qi-${result.daily[i].iconNight} i3'></i>
                    <p class="weather2" style="text-align: center;">${result.daily[i].textNight}</p>
                    <p class="wind" style="text-align: center;">${result.daily[i].windDirNight} ${result.daily[i].windSpeedNight}级</p>
                    </div></div>`
                }
                can(arrMax, arrMin)
            }).catch(error => {
                console.dir(error)
            })
        }
        getWeather()


        // 逐小时预报
        function getHour() {
            myAxios({
                method: 'GET',
                url: 'https://devapi.qweather.com/v7/weather/24h',
                params: {
                    location: id,
                    key
                }
            }).then(result => {
                let hourForecast = document.querySelector('.fw-main1-bottom')
                hourForecast.innerHTML = ''
                for (i = 0; i < 27; i++) {
                    hourForecast.innerHTML += `
                    <div class="li">
                        <div class="time">${result.hourly[i].fxTime.substring(11, 16)}</div>
                        <i class='qi-${result.hourly[i].icon}'></i>
                        <div class="tem">${result.hourly[i].temp}°</div>
                    </div>`
                }
            }).catch(error => {
                console.dir(error)
            })
        }
        getHour()


        // 页面展示的城市名称
        function getName() {
            myAxios({
                method: 'GET',
                url: 'https://geoapi.qweather.com/v2/city/lookup',
                params: {
                    location: id,
                    key
                }
            }).then(result => {
                document.querySelector('.place').innerHTML = `${result.location[0].adm2} ${result.location[0].name}`
                document.querySelector('.place').dataset.id = result.location[0].id
                // 显示为添加关注或是已关注
                if (localStorage.getItem('careArr') != null) {
                    let careArr = localStorage.getItem('careArr').split(',')
                    if (careArr.some(function (elem) {
                        return elem == document.querySelector('.place').dataset.id
                    })) {
                        document.querySelector('.care-inf').innerHTML = '[已关注]'
                    } else {
                        document.querySelector('.care-inf').innerHTML = '[添加关注]'
                    }
                } else {
                    document.querySelector('.care-inf').innerHTML = '[添加关注]'
                }
            }).catch(error => {
                console.dir(error)
            })
        }
        getName()
    }
    render('101010100')


    // 搜索展示模块
    function showSearch(inf) {
        myAxios({
            url: 'https://geoapi.qweather.com/v2/city/lookup',
            params: {
                location: inf,
                key,
                range
            }
        }).then(result => {
            count = 50 * result.location.length
            if (count < 226) {
                document.querySelector('.search-show').style.height = `${count}px`
            } else {
                document.querySelector('.search-show').style.height = '226px'
            }
            document.querySelector('.search-show-ol').innerHTML = result.location.map(item => {
                return `<li data-id=${item.id}>${item.adm1},${item.adm2},${item.name}</li>`
            }).join('')
        }).catch(error => {
            console.dir(error)
        })
    }
    document.querySelector('.search-input').addEventListener('input', e => {
        if (document.querySelector('.search-input').value == '') {
            document.querySelector('.search-show').style.height = '0px'
        } else {
            showSearch(e.target.value)
        }
    })
    // document.querySelector('.search-input').addEventListener('blur', () => {
    //     document.querySelector('.search-input').value = ''
    //     document.querySelector('.search-show').style.height = '0px'
    // })



    // 搜索切换模块
    document.querySelector('.search-show-ol').addEventListener('click', (e) => {
        if (e.target.tagName == 'LI') {
            render(e.target.dataset.id)
        }
    })


    // 添加关注
    document.querySelector('.care-inf').addEventListener('click', e => {
        let careArr = new Array()
        if (localStorage.getItem('careArr') != null) {
            careArr = localStorage.getItem('careArr').split(',')
        }
        if (e.target.innerHTML == '[添加关注]') {
            document.querySelector('.care-inf').innerHTML = '[已关注]'
            careArr.push(document.querySelector('.place').dataset.id)
            localStorage.setItem('careArr', careArr)
            render1()
        }
    })


    // 关注城市列表渲染
    function render1() {
        document.querySelector('.care-city1').innerHTML = ''
        if (localStorage.getItem('careArr') != null) {
            let careArr = localStorage.getItem('careArr').split(',')
            if (careArr.length == 1) {
                document.querySelector('.care-city1').innerHTML = '<p>请关注城市</p>'
            } else {
                let name
                careArr.forEach(item => {
                    myAxios({
                        method: 'GET',
                        url: 'https://geoapi.qweather.com/v2/city/lookup',
                        params: {
                            location: item,
                            key
                        }
                    }).then(result => {
                        name = result.location[0].name
                        document.querySelector('.care-city1').innerHTML += `<p data-id=${item}>${name}<a>del</a></p>`
                    }).catch(error => {
                        console.dir(error)
                    })
                })
            }
        } else {
            document.querySelector('.care-city1').innerHTML = '<p>请关注城市</p>'
        }
    }
    render1()


    // 删除关注
    document.querySelector('.care-city').addEventListener('click', e => {
        if (e.target.tagName == 'A') {
            let careArr = localStorage.getItem('careArr').split(',')
            console.log(careArr);
            let id = careArr.indexOf(e.target.parentNode.dataset.id)
            if (careArr[id] == document.querySelector('.place').dataset.id) {
                document.querySelector('.care-inf').innerHTML = '[添加关注]'
            }
            let temp = careArr[id]
            careArr[id] = careArr[0]
            careArr[0] = temp
            careArr.shift()
            localStorage.setItem('careArr', careArr)
            render1()
        }
    })


    // 城市列表的展示与隐藏
    // document.querySelector('.place').addEventListener('mouseenter', () => {
    //     document.querySelector('.care-city').style.display='block'
    // })
    // document.querySelector('.place').addEventListener('mouseleave', () => {
    //     document.querySelector('.care-city').style.display='none'
    // })
})