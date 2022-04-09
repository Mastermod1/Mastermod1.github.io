import React from 'react';
import ReactToPrint from 'react-to-print';
import DailyBlock from './DailyBlock.js';
 
function hidePlaceholders(e){
    let inputs = document.querySelectorAll('input'); 
    inputs.forEach((e) => e.classList.toggle("hide"));
    e.target.classList.toggle("inp-btn-hidden");
}
class ExportPdfComponent extends React.Component {
    render() {
      return (
        <div>
          <DailyBlock ref={(response) => (this.componentRef = response)} />
          
          <ReactToPrint className='react-to-print'
            content={() => this.componentRef}
            trigger={() => <button className="btn print-btn"></button>}
          />
          <button className='btn inp-btn' onClick={hidePlaceholders}  ></button>
        </div>
      );
    }
}
 
export default ExportPdfComponent;