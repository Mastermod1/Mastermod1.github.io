import React from 'react';
import ReactDOM from 'react-dom';
import ExportPdfComponent from "./export-pdf.js";
import './index.css';
import './App.css';
import './reset.css';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <ExportPdfComponent/>
);