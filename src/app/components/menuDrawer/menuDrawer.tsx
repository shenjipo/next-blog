import './index.scss'
import { Utils } from "@/app/utils/utils";
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export async function MenuDrawer({ visible }: { visible: boolean }) {
    const data = await fetch(`${process.env.NEXT_SERVER}/api/getArticleList`)
    const articleList: Array<{
        title: string,
        createTime: string,
        id: string
    }> = await data.json()



    return (


        <div className={`drawer ${visible ? 'active' : ''}`} id="blog-menu">
            {/* <Input type="text" label="请输入内容搜索" /> */}
            {
                articleList.map(item => {
                    return (
                        <div className="menu-item" key={item.id}>
                            <Link href={`/dashboard/${item.id}`}>
                                {item.title}--{Utils.formatDate(item.createTime)}
                            </Link>

                        </div>
                    )
                })
            }
        </div>



    )
};