import React from 'react';
import ReactToPrint from 'react-to-print';
import DailyBlock from './DailyBlock.js';
 
class ExportPdfComponent extends React.Component {
     
    render() {
      return (
        <div>
          <DailyBlock ref={(response) => (this.componentRef = response)} />
          
          <ReactToPrint className='react-to-print'
            content={() => this.componentRef}
            trigger={() => <button className="print-btn">Print to PDF!</button>}
          />
        </div>
      );
    }
}
 
export default ExportPdfComponent;