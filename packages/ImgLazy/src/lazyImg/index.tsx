import React, { useEffect, useRef } from 'react'

interface ImgLazyProps {
    dataSrc: string
}
const ImgLazy = ({ dataSrc }) => {
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (imgRef.current) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement
                        img.src = img.dataset.src || ''
                        observer.unobserve(img)
                    }
                })
            })

            observer.observe(imgRef.current)
            return () => {
                if (imgRef.current) {
                    observer.unobserve(imgRef.current)
                    observer.disconnect()
                }
            }
        }
    }, [])

    return <img ref={imgRef} data-src={dataSrc} alt="Lazy loaded" />
}

export default ImgLazy
