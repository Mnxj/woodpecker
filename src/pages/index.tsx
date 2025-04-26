import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/basics">
                        Learn More
                    </Link>
                </div>
            </div>
        </header>
    );
}

const IntroPage = () => {
    return (
        <article style={{padding:40}}>
            <div className="theme-doc-markdown markdown">
                <p>努力更新中<code>ing</code>...</p>

                <h2 id="文档结构">文档结构:</h2>
                <ul>
                    <li><a href="/docs/basics">基础</a></li>
                    <li><a href="/docs/code">代码题</a></li>
                    <li><a href="/docs/scenario-questions">场景题</a></li>
                    <li><a href="/docs/interview-exp">面试经验</a></li>
                    <li><a href="/docs/good-tools">好工具分享</a></li>
                    <li><a href="/docs/issue">遇到的问题</a></li>
                </ul>

                <h3 id="目前共创"><strong>目前共创：</strong></h3>
                <div style={{ textAlign: 'center' }}>
                    <a href="https://github.com/mnxj" target="_blank" rel="noopener noreferrer">
                        <img title="mnxj" alt="mnxj" width="50px"
                             src="https://avatars.githubusercontent.com/u/63659134?v=4"/>
                    </a>
                    <a href="https://github.com/lhui" target="_blank" rel="noopener noreferrer">
                        <img title="lhui" alt="lhui" width="50px"
                             src="https://avatars.githubusercontent.com/u/36818242?v=4"/>
                    </a>
                </div>

                <p><code>右上角</code>可以查看仓库，欢迎大家 <code>fork</code>，共同完善</p>

                <h3 id="本地启动方式"><strong>本地启动方式：</strong></h3>
                <pre style={{ backgroundColor: '#f6f8fa', padding: '1em' }}>
          1、npm install / yarn<br/>
          2、npm run prepare / yarn prepare<br/>
          3、npm run dev / yarn dev
        </pre>

                <h3 id="url和目录映射关系"><code>url</code>和<code>目录</code>映射关系:</h3>
                <pre style={{ backgroundColor: '#f6f8fa', padding: '1em' }}>
          {`const NameMap = {
  '3-code': '代码题',
  '2-basics': '基础',
  '4-frontend': '大前端',
  '4-scenario-questions': '场景题',
  '2-backend': '后端',
  '6-network': '网络',
  '8-test': '测试',
  '3-database': '数据库',
  '5-interview-exp': '面试经验',
  '2-leet-code': '力扣',
  '6-good-tools': '好工具分享',
  '7-issue': '遇到的问题',
};`}
        </pre>

                <p>面经也可以选择投稿 <code>773178360@qq.com</code> 或者提 PR</p>
                <p>好的复盘是可以帮助你下一次更好的拿到 offer</p>

                <h3 id="常用排序算法和概念">常用排序算法和概念</h3>
                <table>
                    <thead>
                    <tr>
                        <th>排序算法</th>
                        <th>时间复杂度</th>
                        <th>空间复杂度</th>
                        <th>稳定性</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>冒泡排序</td>
                        <td>O(n²)</td>
                        <td>O(1)</td>
                        <td>稳定</td>
                    </tr>
                    <tr>
                        <td>选择排序</td>
                        <td>O(n²)</td>
                        <td>O(1)</td>
                        <td>不稳定</td>
                    </tr>
                    <tr>
                        <td>插入排序</td>
                        <td>O(n²)</td>
                        <td>O(1)</td>
                        <td>稳定</td>
                    </tr>
                    <tr>
                        <td>快速排序</td>
                        <td>O(nlogn) ~ O(n²)</td>
                        <td>O(logn) ~ O(n)</td>
                        <td>不稳定</td>
                    </tr>
                    <tr>
                        <td>归并排序</td>
                        <td>O(nlogn)</td>
                        <td>O(n)</td>
                        <td>稳定</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </article>
    );
};

export default function Home(): ReactNode {
    return (
        <Layout
            description="面试题库，面试经验，面试技巧，面试指南">
            <HomepageHeader/>
            <main>
                <IntroPage/>
            </main>
        </Layout>
    );
}
