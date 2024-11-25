import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query; // Aqui você pega o parâmetro 'id'

  const [name, setName] = useState("");
  const [status, setStatus] = useState("aguardando");
  const [date, setDate] = useState("");
  const [responsible, setResponsible] = useState("");
  const [tag, setTag] = useState("");

  const [project, setProject] = useState();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    // const fetchProject = async () => {
    //   try {
    //     console.log("Iniciando requisição para a API...");
    //     const response = await fetch(
    //       `http://192.168.1.45:3000/api/projects/${id}`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json; charset=UTF-8",
    //         },
    //       }
    //     );

    //     const dataInfo = await response;
    //     setProject(dataInfo);
    //     console.log("projeto:", dataInfo);
    //   } catch (error) {
    //     setError(error.message);
    //     console.error("Erro na requisição:", error);
    //   }
    // };

    // fetchProject();

    const fetchTasks = async () => {
      try {
        console.log("Iniciando requisição para a API...");
        const response = await fetch(
          `http://192.168.1.45:3000/api/projects/${id}/tasks`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );
        const dataInfo = await response.json();
        setTasks((tasks) => dataInfo);
      } catch (error) {
        setError(error.message);
        console.error("Erro na requisição:", error);
      }
    };

    fetchTasks();
  }, []);

  async function apiRoute() {
    const data = {
      name,
      status,
      date,
      responsible,
      tag,
    };

    try {
      const response = await axios.post(
        `http://192.168.1.45:3000/api/projects/${id}/tasks`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      tasks.items.push(data);

      console.log("Resposta do servidor:", response.data);

      setError("Sucesso! Task adicionada com sucesso!");
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError("Erro ao criar projeto.");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    apiRoute();
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await axios.put(
        `http://192.168.1.45:3000/api/tasks/${taskId}/status`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      // Atualizar a tarefa na lista de tasks
      const updatedTasks = tasks.items.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks({ items: updatedTasks });

      // Fechar o modal após a atualização
      setIsModalOpen(false);
      setError("Status da tarefa atualizado com sucesso!");
    } catch (error) {
      setError("Erro ao atualizar o status.");
    }
  };

  // Para abrir o modal e selecionar a tarefa a ser editada
  const handleEditClick = (task) => {
    setTaskToEdit(task); // Preenche os dados da tarefa
    setStatus(task.status); // Carrega o status atual no formulário
    setIsModalOpen(true); // Abre o modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  return (
    <>
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-3">
            <label htmlFor="name">Tarefa</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tarefa"
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
              <option value="backlog">Backlog</option>
              <option value="todo">Todo</option>
              <option value="in progress">Em progresso</option>
              <option value="review">Concluído</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="responsible">Responsável</label>
            <input
              id="responsible"
              name="responsible"
              type="text"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              placeholder="Responsável pela tarefa"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date">Data</label>
            <input
              id="date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Responsável pela tarefa"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="responsible">Tag</label>
            <input
              id="tag"
              name="tag"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Tag da tarefa"
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

        {tasks && tasks.items && tasks.items.length > 0 ? (
          <table className="min-w-80 table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-2 border-b">Tarefa</th>
                <th className="px-4 py-2 border-b">Responsável</th>
                <th className="px-4 py-2 border-b">Data</th>
                <th className="px-4 py-2 border-b">Tag</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {tasks.items.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b text-sm text-gray-400">
                    {task.name}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-400">
                    {task.responsible}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-400">
                    {task.date}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-400">
                    {task.tag}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-400">
                    {task.status}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-400">
                  <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() => handleEditClick(task)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Não há tarefas cadastradas para este projeto.</p>
        )}

        {isModalOpen && taskToEdit && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-xl font-semibold">Editar Status da Tarefa</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStatusChange(taskToEdit.id, status);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="status">Selecione o Status</label>
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  >
                    <option value="backlog">Backlog</option>
                    <option value="todo">Todo</option>
                    <option value="in progress">Em progresso</option>
                    <option value="review">Revisão</option>
                    <option value="done">Concluído</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md"
                >
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="mt-2 w-full py-2 px-4 bg-gray-500 text-white rounded-md"
                >
                  Fechar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
