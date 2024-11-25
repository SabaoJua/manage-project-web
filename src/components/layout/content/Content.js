import HeaderContent from "./Header";
import styles from "./style.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Content() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://192.168.1.45:3000/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    fetchProjects();

    const intervalId = setInterval(() => {
      fetchProjects();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.content}>
      <HeaderContent />
      <div className={styles.main}>
        <div className={styles.headerMain}>
          <div>
            <h3>Projetos</h3>
            <span>
              Você tem{" "}
              <span className={styles.textActive}>{projects.length}</span>{" "}
              projeto
            </span>
            <div className="offcanvas"></div>
          </div>
          <button className={styles.buttonAdd}>+ Add</button>
        </div>

        <div className="flex flex-wrap gap-3">
          {projects.length == 0 ? (
            <li>Carregando projetos...</li>
          ) : (
            projects.map((project, index) => 
              <div key={index} className={styles.mainContent}>
                <div className={styles.project}>
                  <h3>{project.name}</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                    ducimus a ad quaerat fugiat.
                  </p>
                  <div className={styles.projectInfor}>
                    <span className={styles.projectInforStatus}>{project.status}</span>
                    <span>{project.duration} dias</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}
