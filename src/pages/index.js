import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SunSpace</h1>
      <div className={styles.buttonContainer}>
        {/* "Create New Room" Button */}
        <button
          className={styles.button}
          onClick={() => router.push('/create-room')}
        >
          Create New Room
        </button>

        {/* "Join a Room" Button */}
        <button className={styles.button}>
          Join a Room
        </button>
      </div>
    </div>
  );
}
