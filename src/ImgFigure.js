import React from 'react';

const ImgFigure = (props) => {
    
    let styleObj = {
        left: props.model.pos.left + 'px',
        top: props.model.pos.top + 'px',
        transform: 'rotate(' + props.model.rotate + 'deg)',
        zIndex:props.model.zIndex
    }
    if(props.model.isCenter){
        // center的属性必须去掉旋转的行间样式会冲突导致class样式失效
        delete styleObj.transform;
    }
    let imgFigureClassName = 'image-figure';
        imgFigureClassName += props.model.isInverse? ' is-inverse': '';
        console.log("重新渲染："+props.model.isInverse)
    return (
            <figure style={styleObj} className={imgFigureClassName} onClick={(e) => { props.changeStyle(e, props.index) }} >
                <img src={props.model.imgurl} 
                    alt={'图片' + props.index} 
                    key={props.model.imgurl}/>
                <figcaption>
					<h2 className="img-title">{props.text.title}</h2>
					<div className="img-back" onClick = {(e)=>console.log(e.currentTarget)}>
						<p>
                            {props.text.desc}
						</p>
					</div>
				</figcaption>
            </figure>

    );
}
export default ImgFigure;