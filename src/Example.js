import React, { useState, useEffect, useRef } from 'react';
import ImgFigure from './ImgFigure'
import Controller from './Controller'
import importImageArrData from './data/imagedata.json'


const ticks = importImageArrData.map(item => require("./images/" + item.fileName));
const Constant = {
  centerPos:{
    left:200,
    top:200
  },
  topPosRange:{
    topOfx:[100,100],
    topOfy:[100,200]
  },
  normalPosRange:{
    leftOfx:[100,100],
    rightOfx:[100,200],
    y:[100,100]
  }
 
}

export default (pro) => {

  const [imageArray, setImageArray] = useState(
    resetNewArray(0)
  );
  // 获取舞台的dom节点
  const stageDom = useRef(null);
  // 获得区域的大小常量 
  // 生命周期函数 useEffect(执行函数1,参数2 ) 参数2没变就只执行一次相当于componentDidMount函数
  useEffect(() => {
    // 舞台的宽度 和高度
    const stageWidth = stageDom.current.clientWidth;
    const stageHeight = stageDom.current.clientHeight;
    // 舞台宽高的一半
    const halfStageWidth = Math.ceil(stageWidth / 2);
    const halfStageHeigth = Math.ceil(stageHeight / 2);
    // img组件的宽度 和高度
    const figureWidth = stageDom.current.firstChild.scrollWidth;
    const figureHeight = stageDom.current.firstChild.scrollHeight;
    // img组件的一半
    const halfFigureWidth = Math.ceil(figureWidth / 2);
    const halfFigureHeigth = Math.ceil(figureHeight / 2);
    
    // 计算中心位置
     Constant.centerPos = {
       left: halfStageWidth - halfFigureWidth,
       top: halfStageHeigth - halfFigureHeigth
     };

     // 计算左右两侧的区域范围
     Constant.normalPosRange = {
       // 计算左或右侧x范围
       leftOfx:[-halfFigureWidth,halfStageWidth - halfFigureWidth*3],
       rightOfx:[halfStageWidth + halfFigureWidth,stageWidth - halfFigureWidth],
       // 左右的y的范围一样    就一个
       y:[-halfFigureHeigth,stageHeight-halfFigureHeigth]
     }

     // 计算上面的左右范围
     // 计算上面的高度范围
     Constant.topPosRange={
      topOfx:[halfStageWidth-figureWidth,halfStageWidth],
      topOfy:[-halfFigureHeigth,halfStageHeigth-halfFigureHeigth*3]
     }
     console.log(stageDom.current.clientWidth)
     console.log(importImageArrData)
     setImageArray(resetNewArray(0));
    },[]
  );
  // 更换center 修改样式 换位置
  const changeStyle = (e, index) => {

    if(imageArray[index].isCenter){
      console.log(imageArray)
      let copyArr = JSON.parse(JSON.stringify(imageArray))
      copyArr[index].isInverse = !copyArr[index].isInverse
      console.log(copyArr[index].isInverse)
      setImageArray(copyArr);

    }else{
      // 将center替换为角标为index的
      setImageArray(resetNewArray(index));
    }
    
  }

  return (
    <div className="stage" ref={stageDom}>
      {imageArray.map((model, index) => {    
        return <ImgFigure
          index={index}
          changeStyle={changeStyle}
          model={model}
          key={index}
          text={importImageArrData[index]}
        />
      })
      }
      <nav className="controller-nav">
      {imageArray.map((model, index) => {    
        return <Controller
          index={index}
          changeStyle={changeStyle}
          model={model}
          key={index}
          text={importImageArrData[index]}
        />
      })
      }
    	</nav>
    </div>
  );
}
// 重新分配图片的位置信息 param centerIndex 是指定的中心角标
const resetNewArray = (centerIndex) => {
  //获取图片的角标[1-n]
  let indexArr =  Array.from({length:importImageArrData.length},(v, k) => k);
indexArr.splice(centerIndex,1) 
// 随机获取一个要删除的值
let topIndex =indexArr.splice(Math.ceil(Math.random()*(indexArr.length -1)),1)
// 分别获取左右的 leftIndexs  剩下的indexArr就是右面的了
let leftIndexs  =indexArr.splice(0,indexArr.length/2)
  return ticks.map((imgurl, index) => {
   if(centerIndex === index){
    return  {
      imgurl: imgurl,
      pos: {
        left: Constant.centerPos.left,
        top: Constant.centerPos.top
      },
      isCenter: true,
      rotate: '0',
      isInverse: false,
      zIndex: 100

    }
   }else if(topIndex[0] === index) {
     return {
      imgurl: imgurl,
      pos: {
        left: getRangeRandom(Constant.topPosRange.topOfx[0], Constant.topPosRange.topOfx[1]),
        top: getRangeRandom(Constant.topPosRange.topOfy[0], Constant.topPosRange.topOfy[1])
      },
      isCenter: false,
      rotate: get30DegRandom(),
      isInverse: false
    }
   }else if(leftIndexs.indexOf(index)>0){
    return {
      imgurl: imgurl,
      pos: {
        left: getRangeRandom(Constant.normalPosRange.leftOfx[0], Constant.normalPosRange.leftOfx[1]),
        top: getRangeRandom(Constant.normalPosRange.y[0], Constant.normalPosRange.y[1])
      },
      isCenter: false,
      rotate: get30DegRandom(),
      isInverse: false
    }
   }else{
    return {
      imgurl: imgurl,
      pos: {
        left: getRangeRandom(Constant.normalPosRange.rightOfx[0], Constant.normalPosRange.rightOfx[1]),
        top: getRangeRandom(Constant.normalPosRange.y[0], Constant.normalPosRange.y[1])
      },
      isCenter: false,
      rotate: get30DegRandom(),
      isInverse: false
    }
   }
  })
}

// 获得一个角度
const get30DegRandom = () => {
  return ((Math.random() < 0.5 ? '' : '-') + Math.ceil(Math.random() * 30))
}
//获得一个随机数 在 low 和high 范围之间
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}