import React, {useState} from 'react';


const maths = {
  fixedView1 : "" ,
  fixedView2 : "" ,
  fixedView3 : "" ,
  fixedView4 : "" 
}

const ticks = Object.keys(maths).map(item => require("./images/" + item + ".png"));


export default (pro)=>{
    const [count,setCount]=useState(0);
    const [imageArray,setImageArray ]=useState(
      getNewArray()
    );
  
    console.log(pro.ke);
    
    const changeStyle = (e)=>{
      console.log(e.target)
      setImageArray(getNewArray());
    }
    const logMessage=()=>{
     console.log(imageArray)
    }
    return (
        <div className="stage">
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
          <button onClick={changeStyle}>
            换一下
          </button>
          <button onClick={logMessage}>
            打印一下
          </button>
  
        <figure>
          {imageArray.map((model)=>{
            return <div style={model.styleobj} className="image" onClick={changeStyle} >               
                      <img src={model.imgurl} alt="没了" key={model.imgurl}></img>
                  </div>
            })
          }
          </figure>
        </div>
      );
}
// 获得一个角度
const get30DegRandom = ()=>{
  return ((Math.random()<0.5 ? '':'-' )+ Math.ceil(Math.random() * 30))
}
const getNewArray = ()=>{
  let a = []
  ticks.forEach((imgurl)=>{
    a=  [...a, {imgurl:imgurl,
                  styleobj:{
                    left:getRangeRandom(100,1000),
                    top:getRangeRandom(100,800)
                    ,transform: 'rotate('+ get30DegRandom() +'deg)'
                  }}
      ]
  })
  return a;
}

//获得一个随机数 在 low 和high 范围之间
function getRangeRandom(low,high) {
	return Math.ceil(Math.random()* (high - low) + low);
}