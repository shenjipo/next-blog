'use client'

import './index.scss'
import { useState, useEffect, Suspense } from "react";
import { MenuDrawer } from "../menuDrawer/menuDrawer";



export function NavButton({ children }: { children: React.ReactNode }) {


    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ offsetX: 0, offsetY: 0 })
    const [isMobile, setIsMobile] = useState(false)

    let canChangeVisible = true
    useEffect(() => {
        setPosition({
            x: window.screen.width / 2,
            y: window.screen.height / 4,
        });

        setIsMobile('ontouchstart' in window.document.documentElement)
    }, [])

    const handleMouseMove = (event: any) => {

        canChangeVisible = false
        if (!isMobile) {
            setPosition({
                x: event.clientX - offset.offsetX,
                y: event.clientY - offset.offsetY,
            });
        } else {
            const orignEvent = event.changedTouches[0]
            setPosition({
                x: orignEvent.clientX - offset.offsetX,
                y: orignEvent.clientY - offset.offsetY,
            });
            event.preventDefault()
        }


    };
    const handleMouseUp = () => {

        setDragging(false);
        if (canChangeVisible) {
            const dom = document.getElementById('blog-menu')
            const className: Array<string> = dom ? dom.className.split(' ') : []
            const find = className.find(item => item === 'active')
            if (find && dom) {
                dom.setAttribute('class', 'drawer')
            } else if (dom) {
                dom.setAttribute('class', 'drawer active')
            }
        }
    };
    const handleMouseDown = (event: any, type: string) => {
        if (isMobile && type === 'onMouseDown') return
        if (!isMobile && type === 'onTouchStart') return
        canChangeVisible = true
        if (!isMobile) {
            setOffset({
                offsetX: event.clientX - position.x,
                offsetY: event.clientY - position.y
            })
        } else {
            const orignEvent = event.nativeEvent.changedTouches[0]

            setOffset({
                offsetX: orignEvent.clientX - position.x,
                offsetY: orignEvent.clientY - position.y
            })
        }

        setDragging(true);
    };

    useEffect(() => {
        if (dragging) {
            if (isMobile) {
                document.addEventListener('touchmove', handleMouseMove, {
                    passive: false
                });
                document.addEventListener('touchend', handleMouseUp);
            } else {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }

        }

        return () => {
            if (isMobile) {
                document.removeEventListener('touchmove', handleMouseMove);
                document.removeEventListener('touchend', handleMouseUp);
            } else {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }

        }
    }, [dragging])



    return (
        <div className="nav">
            <div style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }} className='nav-button' onMouseDown={(e) => handleMouseDown(e, 'onMouseDown')} onTouchStart={(e) => handleMouseDown(e, 'onTouchStart')}>
                菜单
            </div>

            {children}

        </div>

    )
};