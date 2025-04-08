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
