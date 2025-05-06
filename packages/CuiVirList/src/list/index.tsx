import React, {useEffect, useRef, useState} from 'react';
import {getPexelsList} from '../api'
import ListItem from './item';

// containerRef.current.scrollTop 表示当前滚动项的位置
// containerRef.current.clientHeight 表示当前内容区的高度
const List = () => {
    const [list, setList] = React.useState<any>([])
    const [visibleItems, setVisibleItems] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemHeight = 100; // 假设每个列表项高度为100px

    const getList = async () => {
        // const res = await getPexelsList({
        //     per_page: 100, // 获取更多数据用于测试
        //     page: 1,
        //     query: 'nature'
        // })
        const len = list.length;
        const newList = [...list]
        for (let i = 0; i<100; i++) {
            newList.push(len + i + 'aaaa');
        }
        setList(newList)
    }



    useEffect(() => {
        getList()
    }, [])

    useEffect(() => {
        let lock = false;
        if (containerRef.current) {
            const visListLen =  Math.ceil((containerRef.current?.clientHeight || 0) / itemHeight) + 1
            containerRef.current.addEventListener('scroll', (e) => {
                if (!lock) {
                    lock = true;
                    window.requestAnimationFrame(() => {
                        const startIdx = Math.floor((containerRef.current?.scrollTop || 0) / itemHeight)
                        const buffer = 3;
                        const sliceStart = Math.max(startIdx - buffer, 0);
                        const sliceEnd = Math.min(startIdx + visListLen + buffer, list.length)
                        setVisibleItems(list.slice(sliceStart, sliceEnd))
                        if (startIdx > 95) {
                            console.log('sliceStart', sliceStart, 'sliceEnd', sliceEnd)
                        }
                        lock = false;
                    })
                }

            })
            setVisibleItems(list.slice(0, visListLen))
        }

        return () => {

        }
    }, [list])

    return (
        <div style={{
            marginTop: '100px',
            height: '500px',
            overflow: 'auto',
            position: 'relative'
        }}
        ref={containerRef}
        >
            <div style={{
                height: `${list.length * itemHeight}px`,
                position: 'relative'
            }}
            >
                {
                    visibleItems.map((item, idx) => {
                        const startIdx = Math.floor((containerRef.current?.scrollTop || 0) / itemHeight)
                        const curIdx = startIdx + idx;
                        return (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: `${curIdx * itemHeight}px`,
                                    backgroundColor: `${curIdx % 2 ? '#bfa' : '#ccc'}`,
                                    height: itemHeight,
                                    width: '100px',
                                }}
                            >{item}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default List
