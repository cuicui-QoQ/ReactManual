import React, {useEffect, useRef, useState} from 'react';
import {getPexelsList} from '../api'
import ListItem from './item';

const List = () => {
    const [list, setList] = React.useState<any>([])
    const [visibleItems, setVisibleItems] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemHeight = 100; // 假设每个列表项高度为100px

    const getList = async () => {
        const res = await getPexelsList({
            per_page: 100, // 获取更多数据用于测试
            page: 1,
            query: 'nature'
        })
        setList(res.data.urlList)
    }

    const updateVisibleItems = () => {
        if (!containerRef.current) return;

        const scrollTop = containerRef.current.scrollTop;
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = startIndex + Math.ceil(containerRef.current.clientHeight / itemHeight);

        setVisibleItems(list.slice(startIndex, endIndex + 1));
    }

    useEffect(() => {
        getList()
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', updateVisibleItems);
            updateVisibleItems(); // 初始渲染
        }
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', updateVisibleItems);
            }
        }
    }, [list])

    return (
        <div
            ref={containerRef}
            style={{
                height: '100vh',
                overflow: 'auto',
                position: 'relative'
            }}
        >
            <div style={{
                height: `${list.length * itemHeight}px`,
                position: 'relative'
            }}>
                {visibleItems.map((item, index) => {
                    const startIndex = Math.floor((containerRef.current?.scrollTop || 0) / itemHeight);
                    const actualIndex = startIndex + index;
                    return (
                        <div
                            key={actualIndex}
                            style={{
                                position: 'absolute',
                                top: `${actualIndex * itemHeight}px`,
                                width: '100%'
                            }}
                        >
                            <ListItem item={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List
