import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {

    // By unique identifier

    let articleList = await prisma.article.findMany({
        where: {
            author: 'wangxing',
            isPreviewShow: '1',

        },
        select: {
            title: true,
            createTime: true,
            id: true,
        }
    })

    articleList = articleList.sort((a, b) => {
        if (!a.createTime || !b.createTime) {
            return 1
        }
        return b.createTime - a.createTime
    })
    return NextResponse.json(articleList, { status: 200 });
}