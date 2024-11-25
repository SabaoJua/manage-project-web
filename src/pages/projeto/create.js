import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("aguardando");
  const [sequence, setSequence] = useState(0);
  const [duration, setDuration] = useState();

  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Iniciando requisição para a API...");
        const response = await fetch(
          "http://192.168.1.45:3000/api/projects",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        const data = await response.json();
        setProjects(data);
        console.log("Projetos recebidos:", data);
      } catch (error) {
        setError(error.message);
        console.error("Erro na requisição:", error);
      }
    };

    fetchProjects();
  }, []);

  async function apiRoute() {
    const data = {
      name,
      status,
      duration,
    };

    try {
      const response = await axios.post(
        "http://192.168.1.45:3000/api/projects",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta do servidor:", response.data);
      setStatus("Sucesso! Projeto criado.");
    } catch (error) {
      console.error("Erro na requisição:", error);
      setStatus("Erro ao criar projeto.");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    apiRoute();
  };

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <form onSubmit={handleSubmit} method="POST">
        <div className="mb-3">
          <label htmlFor="name">Nome do Projeto</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do Projeto"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status">Selecione o Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          >
            <option value="aguardando">Aguardando</option>
            <option value="em desenvolvimento">Em desenvolvimento</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="duration">Duração do projeto (dias)</label>
          <input
            id="duration"
            name="duration"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Sequência do projeto"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
