import React, { useState, useEffect, useMemo, useRef } from 'react'

const boardWidth = 20

enum directionType {
    right = 'right',
    left = 'left',
    up = 'up',
    down = 'down',
}

enum pointType {
    snake = 'snake',
    food = 'food',
    wall = 'wall',
    empty = 'empty',
}

enum gameStateType {
    init = 'init',
    running = 'running',
    end = 'end',
}

type PointType = {
    x: number
    y: number
}

let timeStamp = new Date().getTime()

const renderPoint = (type: pointType, key: any) => {
    let color = 'white'
    switch (type) {
        case pointType.snake:
            color = 'green'
            break
        case pointType.food:
            color = 'red'
            break
        case pointType.wall:
            color = 'black'
            break
        case pointType.empty:
            color = 'white'
            break
    }

    return (
        <div
            key={key}
            style={{
                width: '10px',
                height: '10px',
                backgroundColor: color,
            }}
        ></div>
    )
}

const getNewHead = (direction: directionType, snake: PointType[]) => {
    const snakeHead = snake[0]
    let newSnakeHead: PointType = { ...snakeHead }
    switch (direction) {
        // down
        case directionType.down:
            newSnakeHead.x += 1
            break
        // up
        case directionType.up:
            newSnakeHead.x -= 1
            break
        // left
        case directionType.left:
            newSnakeHead.y -= 1
            break
        // right
        case directionType.right:
            newSnakeHead.y += 1
            break
    }
    return newSnakeHead
}

const canMove = (
    direction: directionType,
    snake: PointType[],
    wall: PointType[],
) => {
    let newSnakeHead: PointType = getNewHead(direction, snake)
    if (
        newSnakeHead.x < 0 ||
        newSnakeHead.x >= boardWidth ||
        newSnakeHead.y < 0 ||
        newSnakeHead.y >= boardWidth
    ) {
        return false
    }
    if (
        snake.some(
            point => point.x === newSnakeHead.x && point.y === newSnakeHead.y,
        )
    ) {
        return false
    }
    if (
        wall.some(
            point => point.x === newSnakeHead.x && point.y === newSnakeHead.y,
        )
    ) {
        return false
    }
    return true
}

const getNewFood = (disablePoints: PointType[]) => {
    // fix me 这里还应该考虑棋盘填满的情况
    const foodCanSet = (newFood: PointType, disablePoints: PointType[]) => {
        let newFoodCanSet = true
        disablePoints.forEach(point => {
            if (point.x === newFood.x && point.y === newFood.y) {
                newFoodCanSet = false
            }
        })
        return newFoodCanSet
    }
    let newFood: PointType = {
        x: Math.floor(Math.random() * boardWidth),
        y: Math.floor(Math.random() * boardWidth),
    }
    while (!foodCanSet(newFood, disablePoints)) {
        newFood = {
            x: Math.floor(Math.random() * boardWidth),
            y: Math.floor(Math.random() * boardWidth),
        }
    }
    return newFood
}

const initSnake = () => {
    const snake: PointType[] = []
    for (let i = 0; i < 4; i++) {
        snake.push({ x: 10, y: 10 + i })
    }
    return snake
}

function App() {
    const [snake, setSnake] = useState(initSnake())
    const [food, setFood] = useState([{ x: 5, y: 5 }])
    const direction = useRef<directionType>(directionType.up)
    const [wall, setWall] = useState([
        { x: 4, y: 4 },
        { x: 4, y: 5 },
        { x: 4, y: 6 },
    ])
    const [gameState, setGameState] = useState('init')
    const board: pointType[][] = useMemo(() => {
        const board: pointType[][] = []
        for (let i = 0; i < boardWidth; i++) {
            board.push([])
            for (let j = 0; j < boardWidth; j++) {
                board[i].push(pointType.empty)
            }
        }
        for (const point of snake) {
            board[point.x][point.y] = pointType.snake
        }
        for (const point of food) {
            board[point.x][point.y] = pointType.food
        }
        for (const point of wall) {
            board[point.x][point.y] = pointType.wall
        }
        return board
    }, [food, snake])

    const timer = useRef<number>(0)

    const interValCb = () => {
        // 使用最新的状态值
        const currentDirection = direction.current
        if (canMove(currentDirection, snake, wall)) {
            const newHead = getNewHead(currentDirection, snake)
            const newSnake = [...snake]
            if (newHead.x === food[0].x && newHead.y === food[0].y) {
                let newFood = getNewFood([...snake, ...wall, ...food])
                setFood([newFood])
            } else {
                newSnake.length = newSnake.length - 1
            }
            newSnake.unshift(newHead)
            setSnake([...newSnake])
        } else {
            setGameState(gameStateType.end)
        }
    }

    useEffect(() => {
        if (gameState === gameStateType.running) {
            clearInterval(timer.current)
            timer.current = setInterval(interValCb, 200)
        } else if (gameState === gameStateType.end) {
            if (timer.current) {
                clearInterval(timer.current)
            }
        }
    }, [gameState, snake, direction]) // 添加依赖项

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearInterval(timer.current)
            }
        }
    }, [])

    useEffect(() => {
        if (gameState === gameStateType.init) {
            setSnake(initSnake())
        }
    }, [gameState])

    return (
        <div
            tabIndex={0}
            onKeyDown={e => {
                let nowStamp = new Date().getTime()
                if (nowStamp - timeStamp < 20) {
                    return
                }
                timeStamp = nowStamp
                let innerDirection = direction
                if (e.key === 'Enter') {
                    // 处理 Enter 键逻辑
                    console.log('Enter 键被按下')
                    setGameState(prevState => {
                        if (prevState === gameStateType.init) {
                            return gameStateType.running
                        }
                        if (prevState === gameStateType.end) {
                            return gameStateType.init
                        } else {
                            return prevState
                        }
                    })
                    return
                } else if (e.key === 'w' || e.key === 'W') {
                    // 处理 W 键逻辑
                    console.log('W 键被按下')
                    direction.current = directionType.up
                } else if (e.key === 'a' || e.key === 'A') {
                    // 处理 A 键逻辑
                    console.log('A 键被按下')
                    direction.current = directionType.left
                } else if (e.key === 's' || e.key === 'S') {
                    // 处理 S 键逻辑
                    console.log('S 键被按下')
                    direction.current = directionType.down
                } else if (e.key === 'd' || e.key === 'D') {
                    // 处理 D 键逻辑
                    console.log('D 键被按下')
                    direction.current = directionType.right
                } else {
                    // 处理其他键逻辑
                    console.log('其他键被按下')
                    return
                }
            }}
        >
            {'end' != gameState &&
                board.map((row, i) => {
                    return (
                        <div
                            key={i}
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            {row.map((point, j) => {
                                return renderPoint(point, j)
                            })}
                        </div>
                    )
                })}
            {'init' == gameState && <h1>输入enter键开始游戏</h1>}
            {'end' == gameState && <h1>你死了</h1>}
        </div>
    )
}

export default App
