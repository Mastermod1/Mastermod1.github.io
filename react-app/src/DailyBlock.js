import React from 'react';


class DailyBlock extends React.Component{
  render(){
    return(
      <div className='daily-block'>
        <h1>Daily Planner</h1>
        <CheckList title='Things to do' />
        <CheckList title='Goals' />
        <CheckList title='Notes' />
      </div>
    );
  }
}

class CheckList extends React.Component{
  constructor(props){
    super(props);
    this.state = {itemList: []};
  }
  newLine(e, caller){
    if(e.keyCode === 13){
      let target = e.target;
      let list = caller.state.itemList;
      list.push(target.value);
      caller.setState({itemList: list});
      target.value = "";
    }
  }
  render(){
    return(
      <div className={'check-list check-list-' + this.props.title[0]}>
        <h2>{this.props.title}</h2>
        {this.state.itemList.map((task) => <CheckListElement key={task} text={task} />)}
        <input type='text' onKeyDown={(e) => this.newLine(e, this)}/>
      </div>
      
    );
  }
}

class CheckListElement extends React.Component{
  render(){
    return(
      <div className='check-list-element'>
        <div></div>
        <div>{this.props.text}</div>
      </div>
    );
  }
}


export default DailyBlock;