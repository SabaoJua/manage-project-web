import { useState, useEffect } from 'react';
import styles from './style.module.css'

// icons
import { FaSearch } from "react-icons/fa";



export default function HeaderContent() {
    const [currentTime, setCurrentTime] = useState({ time: '', date: '' });

    // Função para formatar o horário e a data
    const updateTime = () => {
        const now = new Date();

        // Formatar a hora
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        // Formatar a data
        const date = now.toLocaleDateString('pt-BR', {
            weekday: 'long', // Exibe o nome do dia da semana
            day: '2-digit',
            month: 'short',
        });

        // Atualizar o estado com a hora e data formatados
        setCurrentTime({ time, date });
    };

    // Usar o useEffect para atualizar a hora a cada segundo
    useEffect(() => {
        const intervalId = setInterval(updateTime, 1000); // Atualiza a cada 1 segundo

        // Executa a função imediatamente para garantir que o horário apareça sem atraso
        updateTime();

        // Limpeza do intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.header}>
            <div className={styles.headerContainter}>
                <div className={styles.headerContainerSearch}>
                    <div className={styles.headerSearch}><FaSearch /> Projetos, tarefas...</div>
                </div>
            </div>

            <div className={styles.headerTime}>
                <h4>{currentTime.time}</h4>
                <span>{currentTime.date}</span>
            </div>
        </div>
    );
}