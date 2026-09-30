import React from 'react';
import ReactDOM from 'react-dom/client';
import HeroPreview from './HeroPreview';
import './preview.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><HeroPreview /></React.StrictMode>,
);
