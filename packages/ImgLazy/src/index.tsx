import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import ImgLazy from './lazyImg'

const testUrl =
    'https://img2.baidu.com/it/u=210843546,3566921899&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889'
const App = () => {
    return (
        <>
            <h1>Hello, ImgLazy!</h1>
            <div
                style={{
                    width: '100px',
                    height: '200vh',
                    backgroundColor: 'red',
                }}
            ></div>
            <ImgLazy dataSrc={testUrl}></ImgLazy>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
