
const fetchImgs= ()=> {
    let promise=new Promise((res,rej)=>{
        $.ajax({
            url: "https://picsum.photos/list",
            type: "GET",
            dataType: "JSON",
            data: JSON.stringify({}),
            success: (data)=>{
                let randomArr=Array.from({length: 10}, () => Math.floor(Math.random() * data.length));
                filteredImgArr=randomArr.reduce((accVal,currVal)=>{
                    accVal.push(data[currVal])
                    return accVal
                }, [])
                return res(filteredImgArr)
            }
           
        })
    })
    
    return promise
}

const startImgSlides=()=> {
    
    console.log("hi")
    
    return timeInterval
}

const stopImgSlides=(timer)=> { 
    
}

const renderImg= async ()=> {

    var width='200px'
    var imgIdx= 1
    var timeInterval

    filteredImgArr=await fetchImgs()
    filteredImgArr.forEach(eachImgObj=>{
        $('.slider-ul').append(`<li><h4 id="author-name">${eachImgObj.author}</h4><img src="https://picsum.photos/200/300?image=${eachImgObj.id}" alt=""></li>`)
    })

    function startImgSlides(){
        timeInterval= setInterval(() => {
            $('.slider-ul').animate({'margin-left': `-=${width}`}, 1000, ()=>{
                imgIdx++;
                if(imgIdx == filteredImgArr.length){
                    imgIdx=1;
                    $('.slider-ul').css('margin-left', 0)
                }
            })
        }, 2000);
    }
    
    function stopImgSlides(){
        clearInterval(timeInterval)
    }
    
    $('.slider-ul').on('mouseenter',stopImgSlides).on('mouseleave', startImgSlides)
    
    startImgSlides()
}