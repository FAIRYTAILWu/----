~function(){
    //导入依懒
    const {win,toJSON} = window._utils

    //获取元素
    let head = document.getElementById('flow')
    let bottom = head.getElementsByTagName('li')

    let flag = false;
    let page = 0;
    //获取数据
    function getImg(){
        page++;
        let xhr = new XMLHttpRequest();
        xhr.open('GET',`data.json?=page${page}`,false);
        xhr.onreadystatechange = function(){
            if( xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
                join(toJSON(this.responseText))
                console.log(page)
            }
        }
        xhr.send();
    }

    //绑定数据 模板字符串方式
    function join(data){
        data.forEach(item => {
            let add = joint(item)

            //排序
            //类数组转数组
            let ArrayList = [...bottom]
            ArrayList.sort((a,b)=>{
                return a.offsetHeight - b.offsetHeight;
            })
            ArrayList[0].innerHTML += add;

        });
    }

    //模板字符串拼接
    function joint({src,title,height,link}){
        flag = false;

        return `<a href="${link}">
        <img data-src="${src}" alt="" height="${height}">
        <p class="title">${title}</p>
      </a> `
    }

    //加载更多
    function load(){
        window.onscroll = function(){
            //计算滚动到底部的距离 页面的真实高度 - 滚动条滚去的距离 - 浏览器的可视窗口
            let woff = win('offsetHeight')
            let wscoll = win('scrollTop')
            let wclien = win('clientHeight')

            if( woff - wscoll - wclien <= 100 ){
                if(flag) return;
                flag = true;
                getImg();
                Lazy();
            }
        }
    }



    //图片懒加载
    function Lazy(){
        //获取所有的img
        let ImgList = document.getElementsByTagName('img')
        for( let j = 0 ; j<ImgList.length ; j++){
            
            let add = ImgList[j];

            let imgs = add.getAttribute('data-src')
            //判断用户是否滑动到底部
            let offse = add.offsetHeight;
            let scrollt = win('scrollTop')
            let clienth = win('clientHeight')
            console.log(1)

            if( offse - scrollt - clienth <=100 ){
                let newImg = document.createElement('img')
                newImg.src = imgs
                newImg.onload = function(){
                    add.src = imgs;
                }

            }
        }
    }
    getImg();
    load();
    Lazy();
    
}()