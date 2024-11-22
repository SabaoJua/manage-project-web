import Siderbar from '@/components/layout/siderbar/siderbar';
import Content from '@/components/layout/content/Content';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <main className={styles.layout}>
      <div className={styles.container}>
        <Siderbar />

        <Content />
      </div>
    </main>
  );
}
