import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import {
    useComponentDidMount,
    useComponentWillUnmount,
    useComponentDidUpdate,
    useComponentWillMount,
} from './'
function Unmount(props: { cnt: number }) {
    const { cnt } = props
    const [innerCnt, setInnerCnt] = useState(cnt)

    const renderCnt = useRef(1)

    useEffect(() => {
        if (cnt % 2 !== 0) {
            setInnerCnt(cnt)
            renderCnt.current++
        }
    }, [cnt])

    useComponentWillUnmount(() => {
        // console.log('Func componentWillUnmount')
    })

    useComponentDidMount(() => {
        // console.log('Func componentDidMount')
    })

    useComponentDidUpdate(() => {
        // console.log('Func componentDidUpdate')
    }, [cnt])

    return <div>Unmount FUNC: {innerCnt}</div>
}

class UnmountClass extends React.Component<{
    cnt: number
}> {
    renderCnt: number

    constructor(props) {
        super(props)
        this.state = {}
        this.renderCnt = 0
    }

    static getDerivedStateFromProps() {
        console.log('class getDerivedStateFromProps')
        return null
    }

    getSnapshotBeforeUpdate() {
        console.log('class getSnapshotBeforeUpdate')
        return null
    }

    static getDerivedStateFromError() {
        console.log('class getDerivedStateFromError')
    }

    // DONE
    shouldComponentUpdate(props: { cnt: number }) {
        // console.log('class shouldComponentUpdate')
        if (props.cnt % 2 === 0) {
            return false
        }
        return true
    }

    // DONE
    componentDidUpdate() {
        // console.log('class componentDidUpdate')
    }

    // DONE
    componentDidMount() {
        // console.log('class componentDidMount')
    }

    // DONE
    componentWillUnmount() {
        console.log('class componentWillUnmount')
    }

    componentDidCatch() {
        console.log('class componentDidCatch')
    }
    render() {
        this.renderCnt++
        console.log('class render innerCnt', this.renderCnt)
        return <div>UnmountClass, {this.props.cnt}</div>
    }
}

function HooksTest() {
    const [show, setShow] = useState(true)
    const [cnt, setCnt] = useState(0)

    return (
        <div>
            <button onClick={() => setCnt(cnt + 1)}>add</button>
            <button onClick={() => setCnt(cnt - 1)}>sub</button>
            <>父组件中 {cnt}</>
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <Unmount cnt={cnt} />}
            {show && <UnmountClass cnt={cnt} />}
        </div>
    )
}

export default HooksTest
