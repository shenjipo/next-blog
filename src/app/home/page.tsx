

import './page.scss'
export const dynamic = 'force-dynamic'
import Link from 'next/link';

export default async function Home() {
    const navList = [
        { id: 0, name: '博客1(PC端)', url: 'http://101.133.143.249/Blog/#/Preview/PreviewBlog/997d5b4b-4e2a-43e5-b9ef-7eff375a1278' },
        { id: 1, name: '博客2(移动+PC端)', url: '/dashboard' },
        { id: 2, name: 'github主页(梯子)', url: 'https://shenjipo.github.io/' },
    ]


    return (
        <div className='home'>
            <img className='home-img' src="/NextImages/water.jpg" alt="图片加载失败" >

            </img>
            <div className='home-nav'>
                {
                    navList.map(item => {
                        return (
                            <div className='nav-item' key={item.id}>
                                <Link href={item.url}>{item.name}</Link>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}
