import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
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
                        <Translate id="homepage.cta.learnMore">Learn More</Translate>
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
                <p>
                    <Translate id="homepage.intro.updating">努力更新中</Translate>
                    <code>ing</code>...
                </p>

                <h2 id="文档结构">
                    <Translate id="homepage.section.structure">文档结构:</Translate>
                </h2>
                <ul>
                    <li><a href="/docs/basics"><Translate id="homepage.link.basics">基础</Translate></a></li>
                    <li><a href="/docs/code"><Translate id="homepage.link.code">代码题</Translate></a></li>
                    <li><a href="/docs/scenario-questions"><Translate id="homepage.link.scenario">场景题</Translate></a></li>
                    <li><a href="/docs/interview-exp"><Translate id="homepage.link.interviewExp">面试经验</Translate></a></li>
                    <li><a href="/docs/good-tools"><Translate id="homepage.link.tools">好工具分享</Translate></a></li>
                    <li><a href="/docs/issue"><Translate id="homepage.link.issue">遇到的问题</Translate></a></li>
                </ul>

                <h3 id="目前共创">
                    <strong><Translate id="homepage.section.contributors">目前共创：</Translate></strong>
                </h3>
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

                <p>
                    <Translate
                        id="homepage.repo.invite"
                        values={{
                            corner: <code>{translate({id: 'homepage.repo.corner', message: '右上角'})}</code>,
                            fork: <code>fork</code>,
                        }}>
                        {'{corner} can view the repo, welcome to {fork} and contribute together'}
                    </Translate>
                </p>

                <h3 id="本地启动方式">
                    <strong><Translate id="homepage.section.localStart">本地启动方式：</Translate></strong>
                </h3>
                <pre style={{ backgroundColor: '#f6f8fa', padding: '1em' }}>
          1、npm install / yarn<br/>
          2、npm run prepare / yarn prepare<br/>
          3、npm run dev / yarn dev
        </pre>

                <h3 id="url和目录映射关系">
                    <code>url</code>
                    <Translate id="homepage.section.urlMap.and">和</Translate>
                    <code><Translate id="homepage.section.urlMap.dir">目录</Translate></code>
                    <Translate id="homepage.section.urlMap.relation">映射关系:</Translate>
                </h3>
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

                <p>
                    <Translate id="homepage.submission">
                        面经也可以选择投稿 773178360@qq.com 或者提 PR
                    </Translate>
                </p>
                <p>
                    <Translate id="homepage.retro">
                        好的复盘是可以帮助你下一次更好的拿到 offer
                    </Translate>
                </p>

                <h3 id="常用排序算法和概念">
                    <Translate id="homepage.section.sorting">常用排序算法和概念</Translate>
                </h3>
                <table>
                    <thead>
                    <tr>
                        <th><Translate id="homepage.sorting.algorithm">排序算法</Translate></th>
                        <th><Translate id="homepage.sorting.time">时间复杂度</Translate></th>
                        <th><Translate id="homepage.sorting.space">空间复杂度</Translate></th>
                        <th><Translate id="homepage.sorting.stable">稳定性</Translate></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><Translate id="homepage.sorting.bubble">冒泡排序</Translate></td>
                        <td>O(n²)</td>
                        <td>O(1)</td>
                        <td><Translate id="homepage.sorting.stableYes">稳定</Translate></td>
                    </tr>
                    <tr>
                        <td><Translate id="homepage.sorting.selection">选择排序</Translate></td>
                        <td>O(n²)</td>
                        <td>O(1)</td>
                        <td><Translate id="homepage.sorting.stableNo">不稳定</Translate></td>
                    </tr>
                    <tr>
                        <td><Translate id="homepage.sorting.insertion">插入排序</Translate></td>
                        <td>O(n²)</td>
                        <td>O(1)</td>
                        <td><Translate id="homepage.sorting.stableYes">稳定</Translate></td>
                    </tr>
                    <tr>
                        <td><Translate id="homepage.sorting.quick">快速排序</Translate></td>
                        <td>O(nlogn) ~ O(n²)</td>
                        <td>O(logn) ~ O(n)</td>
                        <td><Translate id="homepage.sorting.stableNo">不稳定</Translate></td>
                    </tr>
                    <tr>
                        <td><Translate id="homepage.sorting.merge">归并排序</Translate></td>
                        <td>O(nlogn)</td>
                        <td>O(n)</td>
                        <td><Translate id="homepage.sorting.stableYes">稳定</Translate></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </article>
    );
};

export default function Home(): ReactNode {
    const description = translate({
        id: 'homepage.meta.description',
        message: '面试题库，面试经验，面试技巧，面试指南',
    });
    return (
        <Layout description={description}>
            <HomepageHeader/>
            <main>
                <IntroPage/>
            </main>
        </Layout>
    );
}
