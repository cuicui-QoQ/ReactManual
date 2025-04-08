import React, { useEffect } from 'react'
export function useComponentWillUnmount(fn: () => void) {
    useEffect(() => fn, [])
}

export function useComponentDidMount(fn: () => void) {
    useEffect(fn, [])
}

export function useComponentDidUpdate(fn: () => void, deps: any[]) {
    useEffect(fn, deps)
}

export function useComponentWillMount(fn: () => void) {}

export function useInterval(callback: () => void, delay: number) {
    useEffect(() => {
        const id = setInterval(callback, delay)
        return () => clearInterval(id) // 在组件卸载时清理定时器
    }, [callback, delay])
}
