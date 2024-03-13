import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url)
    let id: any = searchParams.get('id')

    if (id === '-1') {
        const data = await fetch(`${process.env.NEXT_SERVER}/api/getArticleList`)
        const articleList: Array<{
            title: string,
            createTime: string,
            id: string
        }> = await data.json()
        id = articleList[0].id
    }
    let article: any = await prisma.article.findUnique({
        where: {
            id: id,
        },
        select: {
            title: true,
            createTime: true,
            id: true,
            content: true
        }
    })
    article = article ? article : {

    }

    return NextResponse.json(article, { status: 200 });
}