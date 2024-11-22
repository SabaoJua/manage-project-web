import styles from './style.module.css'

export default function HeaderContent() {
    return (
        <div className={styles.header}>
            <div className={styles.headerContainter}>
                <div className={styles.headerContainerSearch}>
                    <div className={styles.headerSearch}>Projetos, tarefas...</div>
                </div>
            </div>

            <div className={styles.headerTime}>
                <h4>20:12:44</h4>
                <span>Sexta, 22 Nov</span>
            </div>
        </div>
    );
}