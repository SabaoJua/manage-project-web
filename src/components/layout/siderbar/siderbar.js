import Header from '@/components/layout/header/Header';
import styles from './style.module.css';

// Icons
import { FaHome, FaCog } from "react-icons/fa";

export default function Siderbar() {
    return (
        <div className={styles.siderbar}>
            <Header></Header>

            <div className={styles.siderbarContentLink}>
                <div className={styles.siderbarLinks}>
                    <span className={styles.siderbarLinksTitle}>Menu</span>
                    <div className={styles.siderbarLinkActive}>
                        <span className={styles.siderbarLinkIcon}><FaHome /></span>
                        <span className={styles.siderbarLinkText}>Projetos</span>
                    </div>
                    {/* <div className={styles.siderbarLink}>
                        <span className={styles.siderbarLinkIcon}>icon</span>
                        <span className={styles.siderbarLinkText}>Dashboard</span>
                    </div>
                    <div className={styles.siderbarLink}>
                        <span className={styles.siderbarLinkIcon}>icon</span>
                        <span className={styles.siderbarLinkText}>Tarefas do dia</span>
                    </div>
                    <div className={styles.siderbarLink}>
                        <span className={styles.siderbarLinkIcon}>icon</span>
                        <span className={styles.siderbarLinkText}>Todas Tarefas</span>
                    </div> */}
                </div>
                <div className={styles.siderbarLinks}>
                    <span className={styles.siderbarLinksTitle}>Geral</span>
                    <div className={styles.siderbarLink}>
                        <span className={styles.siderbarLinkIcon}><FaCog /></span>
                        <span className={styles.siderbarLinkText}>Configuração</span>
                    </div>
                </div>
            </div>

            <div className={styles.contentModeDark}>

                <div className={styles.buttonModeDark}>
                    <div>Dark</div>
                    <div>Light</div>
                </div>
            </div>
        </div>
    );
}