~function () {
    //导入依懒
    const { win, toJSON } = window._utils
    let flag = false;
    //获取元素
    let head = document.getElementById('flow')
    let bottom = head.getElementsByTagName('li')
    let page = 0;
    //获取数据
    function getImg() {
        page++;
        //创建一个实例
        let xhr = new XMLHttpRequest();
        //调用open方法
        xhr.open('GET', `data.json?=${page}`, false)
        //监听事件
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                getting(toJSON(this.responseText))
                console.log(page)
            }
        }
        xhr.send()
    }
    function getting(data) {
        data.forEach(item => {
            let idd = joint(item)

            //按高低给每一张图片进行排序
            //获取到的类数组先转换成数组调用sort进行排序
            let ArrarList = [...bottom]
            ArrarList.sort((a, b) => {
                return a.offsetHeight - b.offsetHeight;
            })
            ArrarList[0].innerHTML += idd;
        });


    }
    //模板字符串
    function joint(item) {
        flag = false;
        const {
            src,
            title,
            height,
            link
        } = item
        return `<a href="${link}">
        <img data-src="${src}" alt="" height="${height}">
        <p class="title">${title}</p>
      </a>`
    }
    //加载更多
    function load(){
        window.onscroll = function(){
            //如何知道用户滚动到底部了
            let woff = win('offsetHeight')
            let wscr = win('scrollTop')
            let wclien = win('clientHeight')

            //为了用户体验在滑动至底部100px的时候加载
            if( woff - wscr - wclien <= 100){
                if(flag) return;
                flag = true
                getImg();
                Lazy();
            }
        }
    }
    //图片懒加载
    function Lazy(){
        //先获取所有的img
        let Imglist = document.getElementsByTagName('img')
        for( let i = 0; i<Imglist.length; i++){
            //循环出来的每一张图片保存个item这个变量
            let item = Imglist[i]
            let Imgs = item.getAttribute('data-src')
            //获取浏览器真实高度
            let woffset = item.offsetHeight;
            let wscroll = win('scrollTop')
            let wclientH = win('clientHeight')
            if( woffset - wscroll - wclientH <= 100 ){
                //动态创建一个img标签
                let newImg = document.createElement('img')
                newImg.src = Imgs
                newImg.onload = function(){
                    item.src = Imgs
                    console.log(1)
                }

            }
        }
    }
    getImg();
    load();
    Lazy();
}()