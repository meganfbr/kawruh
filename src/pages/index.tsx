
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  BookOpen,
  BarChart3,
  BrainCircuit,
  Network,
  Database,
  Bot,
  ArrowRight,
  Sparkles,
  Code2,
} from 'lucide-react';

import styles from './index.module.css';

const categories = [
  {
    icon: Code2,
    title: 'Python Programming',
    desc: 'Pelajari sintaks, struktur data, fungsi, dan pemrograman Python dari dasar.',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    desc: 'Pelajari eksplorasi data, statistik, visualisasi, dan pengolahan dataset.',
  },
  {
    icon: BrainCircuit,
    title: 'Machine Learning',
    desc: 'Pahami supervised learning, unsupervised learning, dan evaluasi model.',
  },
  {
    icon: Network,
    title: 'Deep Learning',
    desc: 'Jelajahi neural network, CNN, RNN, Transformers, dan computer vision.',
  },
  {
    icon: Database,
    title: 'Dataset Explorer',
    desc: 'Temukan sumber dataset untuk kebutuhan pembelajaran dan penelitian.',
  },
  {
    icon: Bot,
    title: 'AI Research Assistant',
    desc: 'Dapatkan panduan merancang eksperimen dan memilih metode AI.',
  },
];

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Home"
      description="Kawruh - Learn, Explore, Innovate"
    >
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>

            <span className={styles.badge}>
              <Sparkles size={16} />
              Your Learning & Research Companion
            </span>

            <h1>
              Explore Knowledge.
              <br />
              <span>Build Intelligence.</span>
            </h1>

            <p>
              Belajar Python, Data Analytics, Machine Learning,
              dan Deep Learning dalam satu platform.
              Temukan panduan, tools, dataset, dan inspirasi
              untuk membangun project AI-mu.
            </p>

            <div className={styles.actions}>
              <Link
                className={styles.primaryButton}
                to="/docs/intro"
              >
                Mulai Belajar
                <ArrowRight size={18} />
              </Link>

              <Link
                className={styles.secondaryButton}
                to="/docs/intro"
              >
                <BookOpen size={18} />
                Jelajahi Dokumentasi
              </Link>
            </div>

          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionLabel}>
              Explore Learning Paths
            </span>

            <h2>What Would You Like to Learn?</h2>

            <p>
              Pilih topik dan mulai perjalanan belajarmu
              bersama Kawruh.
            </p>
          </div>

          <div className={styles.grid}>
            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className={styles.card}
                  key={item.title}
                >
                  <div className={styles.cardIcon}>
                    <Icon size={28} strokeWidth={1.8} />
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.desc}</p>

                  <div className={styles.cardFooter}>
                    <span>Explore Topic</span>
                    <ArrowRight size={17} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </Layout>
  );
}
