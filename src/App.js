import React, {Fragment,useState} from 'react';
import Example from './Example';
import './App.css';

const App =()=> {
  const [text,setText] = useState("");
  const [list,setList] = useState([
    {text:"1",deleteFlag:true},
    {text:"2",deleteFlag:true},
    {text:"3",deleteFlag:true},
    {text:"qwe",deleteFlag:true}
  ]);
  const onChangeHandel = (e)=>{
    setText(e.target.value);
  }
  const onClickHandel = ()=>{
    if(text===""){
      alert("不能为空")
    }else{
      setList([...list,{text:text,deleteFlag:true}])
      setText("");
    }
  }
  const clickRemove =(item,index)=>{
    console.log(item.text)
    const copylist = [...list]
    copylist.splice(index,1,{text:item.text,deleteFlag:!item.deleteFlag})
    setList(copylist)
  }
    return (
      <Fragment>
       <div>
          <input value={text} onChange={onChangeHandel}/>
          <button onClick={onClickHandel}>OK</button>
       </div>
         <ul>
           {
             list.map((item,index)=>{ 
               if(item.deleteFlag){
                  return (<li key={item.text+index}  onClick={()=>clickRemove(item,index)}>
                            { `${item.text}` }
                          </li>);
                }else{
                  return (<li key={item.text+index} onClick={()=>clickRemove(item,index)}>
                             <s> { `${item.text}` }</s>
                          </li>);
                }
             })
           } 
         </ul>
         <Example ke={"cool传给父亲的"}/>
        </Fragment>
    );
}
export default App;
