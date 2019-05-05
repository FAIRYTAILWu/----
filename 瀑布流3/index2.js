~function(){
    //导入依懒 工具方法
    let {toJSON} = window._utils;

    //获取操作元素
    let head = document.getElementById('flow')
    let bottom = head.getElementsByTagName('li')
    let page = 0;
    //绑定数据
    function arr(){
        page++;
        //创建ajax实例
        let xhr = new XMLHttpRequest();
        //配置请求方式 请求地址 是否同异步   同步（会阻塞后面代码执行 类似于排队）
        xhr.open('GET',`./data.json?=page${page}`,false);
        //3.监听数据响应
        xhr.onreadystatechange = function(){
            if( xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)){
                idd(toJSON(xhr.responseText))
                
            }
        }
        //发送ajax请求
        xhr.send()
        
    }
    

    //循环数据
    function idd(data){
        //循环获取到的每一条数据
        for( let i = 0; i<data.length;i++){
            let item = app(data[i]);

            //进行排序
            //将类数组转换为数组
            let ArrayList = [...bottom]
            ArrayList.sort((a,b)=>{
                return a.offsetHeight - b.offsetHeight
            })
            //插入图片
            ArrayList[0].innerHTML += item
        }
    }

    //模板字符串拼接
    function app({src,title,link,height}){

        return `<a href="${link}">
        <img data-src="${src}" height="${height}" alt="">
        <p class="title">${title}</p>
      </a>`

    }

    function list(){
        window.onscroll = function(){
            load();
            //获取页面滚动到底部的距离
            //页面的真实高度 - 滚动条滚去的距离 - 浏览器可视区域的高度
            //offsetHeight - scrollTop - clienHeight
            let winoffsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
            let winscrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let winclienHeight = document.documentElement.clientHeight || document.body.clientHeight;

            if( winoffsetHeight - winscrollTop - winclienHeight <= 100){
                arr();

               
            }
        }
    }

    //图片懒加载
    function load(){
        //先获取所有的img
        let ImgList = document.getElementsByTagName('img');
        
        [...ImgList].forEach((element) => {
            //获取浏览器可视高度
            let imgoffsetTop = element.offsetTop;
            let imgscrollTop = document.documentElement.scrollTop || document.body.scrollTop
            let imgclienHeight = document.documentElement.clientHeight || document.body.clientHeight;

            let imgsrc = element.getAttribute('data-src')

            if( imgoffsetTop - imgscrollTop - imgclienHeight <=100 ){
                //创建一个动态的img标签
                let newImg = document.createElement('img')
                newImg.src=imgsrc;
                newImg.onload= () =>{
                    element.src=imgsrc;
                    newImg = null;
                }
            }

        });
    }
   
    //请求初始数据
    arr();  
    list();
    load();


}()