window.addEventListener('load', function () {
    // .fw-main2-right-bottom鼠标经过触发滑动效果
    let containers = document.querySelector('.fw-main2-right-bottom').children[0].children
    for (let i = 0; i < containers.length; i++){
        containers[i].addEventListener('mouseenter', function () {
            this.children[0].style.transform = 'translateY(-140px)'
        })
        containers[i].addEventListener('mouseleave', function () {
            this.children[0].style.transform = 'translateY(0px)'
        })
    }


    //生活指南模块的轮播图效果
    let turnLeft2 = document.querySelector('.fw-main2-right-top').children[2].children[0]
    let turnRight2 = document.querySelector('.fw-main2-right-top').children[2].children[1]
    let a = document.querySelector('.fw-main2-right-bottom').children[0]
    turnLeft2.addEventListener('click', function () {
        a.style.transform ='translateX(0%)'
    })
    turnRight2.addEventListener('click', function () {
        a.style.transform ='translateX(-50%)'
    })


    // 逐小时预报模块轮播图效果
    let count=0
    let turnLeft1 = document.querySelector('.fw-main1-top').querySelector('.turn').children[0]
    let turnRight1 = document.querySelector('.fw-main1-top').querySelector('.turn').children[1]
    let b = document.querySelector('.fw-main1-bottom')
    turnRight1.addEventListener('click', function () {
        count++
        if (count > 2) {
            count=2
        }
        if (count == 1) {
            b.style.transform ='translateX(-1200px)'
        }
        if (count == 2) {
            b.style.transform ='translateX(-1500px)'
        }
    })
    turnLeft1.addEventListener('click', function () {
        count--
        if (count < 0) {
            count=0
        }
        if (count == 0) {
            b.style.transform ='translateX(0px)'
        }
        if (count == 1) {
            b.style.transform ='translateX(-300px)'
        }
    })


    // current模块鼠标经过时下拉栏
    let inf1 = this.document.querySelector('.fw-current').querySelector('.inf1')
    let slider1 = this.document.querySelector('.fw-current').querySelector('.slider1')
    inf1.addEventListener('mouseenter', function () {
        slider1.style.display='block'
    })
    inf1.addEventListener('mouseleave', function () {
        slider1.style.display='none'
    })
})