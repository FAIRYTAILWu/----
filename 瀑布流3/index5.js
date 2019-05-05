~function () {
    //导入依懒
    const { toJSON, win } = window._utils
    //分页
    let page = 0;
    //获取数据
    function getdata() {
        page++;
        //创建一个实例
        // if(page>3) return;
        let xhr = new XMLHttpRequest();
        //调用open方法
        xhr.open('GET', `data.json?=page${page}`, false);
        //监听事件
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                joint(toJSON(this.responseText))
                console.log(page)
            }
        }
        xhr.send()
    }
    let flag = false;

    //获取数据
    let head = document.getElementById('flow')
    let bottom = head.getElementsByTagName('li')
    //字符串拼接
    function joint(data) {
        data.forEach(item => {
            let inn = createHtml(item)

            let ArrayList = [...bottom]
            ArrayList.sort((a, b) => {
                return a.offsetHeight - b.offsetHeight;
            })

            ArrayList[0].innerHTML += inn
        });

    }

    //模板字符串拼接
    function createHtml(item) {
        flag = false;
        const {
            src,
            title,
            link,
            height
        } = item

        return `<a href="${link}">
        <img data-src="${src}" alt="" height="${height}">
        <p class="title">${title}</p>
      </a>`
    }


    //加载更多
    function load() {
        
        window.onscroll = function () {
            //页面真实高度 - 滚动条滚动的高度  - 浏览器的可视区域
            let winO = win('offsetHeight')
            let winS = win('scrollTop')
            let winC = win('clientHeight')
      

            if (winO - winS - winC <= 100) {
                if(flag) return;
                flag = true;
                getdata();
                Lazyloading()
            }
        }
    }

    //图片懒加载
    function Lazyloading() {
        //获取所有的img标签
        let ImgList = document.getElementsByTagName('img')
        for (let i = 0; i < ImgList.length; i++) {
            let item = ImgList[i];
            let Imgs = item.getAttribute('data-src')
            //页面的真实高度 - 滚动条滚动的高度 - 浏览器的可视区域是否等于0 等于
            // 0说明已经划到底部了 但是我们为了用户体验我们让图片距离底部还有100px的时候去
            let woff = item.offsetHeight;
            let wscr = win('scrollTop')
            let wcilen = win('clientHeight')
            if (woff - wscr - wcilen <= 100) {
                ImgList[i].ipp = true
                let newImg = document.createElement('img')
                newImg.src = Imgs
                newImg.onload = function(){
                    item.src = Imgs
        

                }
            }
        }
    }
    getdata();
    load();
    Lazyloading();
}()