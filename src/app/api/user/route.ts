import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
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
    return NextResponse.json(articleList, { status: 200 });
}