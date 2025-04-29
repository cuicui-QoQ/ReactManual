import React from 'react';
// 引入 createRoot
import { createRoot } from 'react-dom/client';

const App = () => <h1>Hello, cui-vir-list!</h1>;

// 修改渲染逻辑
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
