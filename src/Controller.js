import React from 'react';

const Controller = (props) => {
    
    // let styleObj = {
    //     left: props.model.pos.left + 'px',
    //     top: props.model.pos.top + 'px',
    //     transform: 'rotate(' + props.model.rotate + 'deg)',
    //     zIndex:props.model.zIndex
    // }
    // if(props.model.isCenter){
    //     // center的属性必须去掉旋转的行间样式会冲突导致class样式失效
    //     delete styleObj.transform;
    // }
    // let imgFigureClassName = 'image-figure';
    //     imgFigureClassName += props.model.isInverse? ' is-inverse': '';
    //     console.log("重新渲染："+props.model.isInverse)
    let controllerUnitClassName = 'controller-unit';

    if(props.model.isCenter){
        controllerUnitClassName += ' is-center';
        if (props.model.isInverse) {
            controllerUnitClassName += ' isInverse';
        }
    }
    return (
<span className={controllerUnitClassName} onClick={(e) => { props.changeStyle(e, props.index) }}></span>
    );
}
export default Controller;