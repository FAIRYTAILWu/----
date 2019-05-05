~function(){
    //导入依懒工具
    const {toJSON,win} = window._utils
    //获取元素
    let head = document.getElementById('flow')
    let bottom = head.getElementsByTagName('li')
    let page = 0;
    let flag = false;
    //获取数据
    function getImg(){
        page++;
        let xhr = new XMLHttpRequest();
        xhr.open('GET',`./data.json?=page${page}`,false);
        //监听事件
        xhr.onreadystatechange = function(){
            if( xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
                render(toJSON(this.responseText))
                console.log(page)
            }
        }
        xhr.send();
    }

    //字符串拼接 模板字符串方式
    function render(data){
        //循环遍历出每一张图片
        data.forEach(item => {
            let inn = createHtml(item)

            //排序
            //获取到的类数组要转换为数组使用sort方法排序
            let ArrayList = [...bottom]
            ArrayList.sort((a,b) => {
                return a.offsetHeight - b.offsetHeight;
            })
            ArrayList[0].innerHTML += inn;
        });
    }

    //模板字符串拼接
    function createHtml({src,title,height,link}){
        flag = false;
        

        return `<a href="${link}">
        <img data-src="${src}" alt="" height="${height}">
        <p class="title">${title}</p>
      </a>`
      
     
    } 

    //加载更多
    function load(){
        
        //滑动到底时加载更多
        //如何知道用户滑动到底部
        //页面的真实高度  - 滚动条滚去的距离 - 浏览器的可视窗口
        window.onscroll = function(){
            upload();
            let woffsetheight = win('offsetHeight')
            let wscroll = win('scrollTop')
            let wcliend = win('clientHeight')
            

            //判断用户滑动到距离底部100px时加载
            if(woffsetheight - wscroll - wcliend <=100 ){
                if(flag) return
                flag = true;
                getImg();
            }
            
        }
    }
    
    //图片懒加载
    function upload(){
        //获取所有的img标签
        let imgList = document.getElementsByTagName('img')
        // console.log(imgList)
    
       for(let i = 0 ; i<imgList.length ; i++) {
           if( imgList[i].inn) continue;
            let item = imgList[i];
            let Imgscr = item.getAttribute('data-src')
            //进行判断页面的真实高度 - 滚动条滚动的高度 - 浏览器的可视区域是否等于0 等于
            let winoff = item.offsetHeight;
            let winscr = win('scrollTop')
            let wincl = win('clientHeight')
           console.log(1)

            if(winoff - winscr - wincl <= 200){
                let newImg = document.createElement('img')

                newImg.src = Imgscr;
                newImg.onload= () =>{
                    imgList[i].inn = true;
                    item.src=Imgscr;
                    newImg = null
                }
            }

        }
    }

    getImg();
    load();
    upload();
}()