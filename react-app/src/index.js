import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

let itemList = [];

function newLine(e){
  if(e.keyCode === 13){
    let target = e.target;
    itemList.push(target.value);
    target.value = "";
    root.render(<ListBlock/>)
  }
}


class ListBlock extends React.Component{
  render(){
    return(
      <div className='list-block'>
        <h1>To Do List</h1>
        {itemList.map((task) => <ListElement val={task} />)}
        <input type='text' onKeyDown={newLine}/>
      </div>
    );
  }
}
class ListElement extends React.Component{
  render(){
    return(
      <div className='list-element'>
        <div></div>
        <div>{this.props.val}</div>
        <div>[^]</div>
      </div>
    );
  }
}
root.render(<ListBlock/>);