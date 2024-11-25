import styles from './style.module.css'

export default function Header() {
    return (
        <div className={styles.headerSiderbar}>
            <div className={styles.contentUser}>
                <div className={styles.userProfile}></div>
                <div className={styles.userInfor}>
                    <h3>Israel Rodrigues</h3>
                    <span>Fullstack Develop</span>
                </div>
            </div>
        </div>
    );
}