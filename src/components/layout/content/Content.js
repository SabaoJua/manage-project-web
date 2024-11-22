import HeaderContent from './Header';
import styles from './style.module.css';

export default function Content() {
    return (
        <div className={styles.content}>
            <HeaderContent />
            <div className={styles.main}>
                <div className={styles.headerMain}>
                    <div>
                        <h3>Projetos</h3>
                        <span>Você tem <span className={styles.textActive}>2</span> projeto</span>
                        <div className="offcanvas"></div>
                    </div>
                    <button className={styles.buttonAdd}>+ Add</button>
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.project}>
                        <h3>Name project</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ducimus a ad quaerat fugiat.</p>
                        <div className={styles.projectInfor}>
                            <span className={styles.projectInforStatus}>Andamento</span>
                            <span>10 dias</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}