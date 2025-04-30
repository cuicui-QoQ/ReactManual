import React, {useEffect} from 'react';
// 引入 createRoot
import { createRoot } from 'react-dom/client';
import {getPexelsList} from './api'
import List from './list/index'

const App = () => {
    useEffect(() => {
        // 发送GET请求示例
    }, [])
    return (
        <>
            <List></List>
        </>

    )
}

// 修改渲染逻辑
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
