import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import toc from "markdown-it-toc-done-right";
import anchor from 'markdown-it-anchor';
import lists from 'markdown-it-task-lists';
import table from 'markdown-it-multimd-table'
import './page.scss'
import 'highlight.js/styles/github.css';
import './index.scss'
export const dynamic = 'force-dynamic'

export default async function Dashboard(val: { params: { id: Array<string> } }) {
    const id = Array.isArray(val.params.id) ? val.params.id[0] : '-1'

    const data = await fetch(`${process.env.NEXT_SERVER}/api/getArticleById?id=${id}`)
    let article: {
        title: string,
        content: string
    } = await data.json()
    const md = new MarkdownIt({
        highlight: function (str: any, lang: any) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, { language: lang }).value;
                } catch (__) { }
            }
            return ''; // use external default escaping
        },
        html: true, // 支持html嵌套
        linkify: true, // 支持url生成a链接
    });
 
    article.content = article.content.replaceAll('8.130.116.190', '101.133.143.249')
    md.use(anchor)
    md.use(toc)
    md.use(lists)
    md.use(table)

    return (
        <div className='box'>
            <div className='blog'>
                <div className='blog-article'>{article.title}</div>
                {/* <MDXRemote source={article.content} /> */}
                <article className="markdown-body" >
                    <div dangerouslySetInnerHTML={{ __html: md.render(article.content) }}></div>
                </article>
            </div>
        </div>

    )
}

