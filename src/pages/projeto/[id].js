import { useRouter } from "next/router";
import Siderbar from "@/components/layout/siderbar/siderbar";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import styleContent from "../../components/layout/content/style.module.css";
import { useEffect, useState } from "react";
import HeaderContent from "@/components/layout/content/Header";
import { FaEdit } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const initialColumns = [
    {
      color: "bg-orange-200",
      statusColumn: "backlog",
      name: "Backlog",
      tasks: ["Tarefa 1"],
    },
    { color: "bg-gray-300", statusColumn: "todo", name: "Todo", tasks: [] },
    {
      color: "bg-green-300",
      statusColumn: "in progress",
      name: "Em Progresso",
      tasks: [],
    },
    {
      color: "bg-purple-200",
      statusColumn: "review",
      name: "Revisão",
      tasks: [],
    },
    { color: "bg-sky-200", statusColumn: "done", name: "Concluído", tasks: [] },
  ];

  const [columns, setColumns] = useState(initialColumns);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("backlog");
  const [date, setDate] = useState("");
  const [responsible, setResponsible] = useState("");
  const [tag, setTag] = useState("");

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState("");
  const [error, setError] = useState(null);

  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
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
        setTasks((tasks) => dataInfo.items);
        setProject(dataInfo);

        console.dataInfo;

        console.log("Tarefas:", tasks);
        console.log("Projeto:", project);
      } catch (error) {
        setError(error.message);
        console.error("Erro na requisição:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Reorganiza as tarefas nas colunas de acordo com o status
    const updatedColumns = initialColumns.map((column) => {
      const filteredTasks = tasks.filter((task) => task.status === column.statusColumn);
      return {
        ...column,
        tasks: filteredTasks,
      };
    });

    setColumns(updatedColumns);
  }, [tasks]);

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

      tasks.push(data);

      console.log("Resposta do servidor:", response.data);

      setError("Sucesso! Task adicionada com sucesso!");
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError("Erro ao criar projeto.");
    }
  }

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    apiRoute();
  };

  const handleModalOpen = (modalData, modalType) => {
    // Define os dados do modal (geral)
    setModalData(modalData); // Você pode definir o estado que armazena os dados do modal
    setModalType(modalType); // Define o tipo do modal (se for de edição, criação, etc)
    setIsModalOpen(true); // Abre o modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Fecha o modal
    setModalData(null); // Limpa os dados do modal, caso necessário
    setModalType(null); // Limpa o tipo do modal
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR"); // Formato brasileiro (DD/MM/YYYY)
  };

  return (
    <main className={styles.layout}>
      <div className={styles.container}>
        <Siderbar />

        <div className={styleContent.content}>
          <HeaderContent />

          <div className={styleContent.main}>
            <div className={styleContent.headerMain}>
              <div>
                <h3 className="text-gray-800">Detalhes do projeto</h3>
                <span>Projeto: {project.name}</span>
              </div>
              <button
                className={styleContent.buttonAdd}
                onClick={() => handleModalOpen(null, "create")}
              >
                + Task
              </button>
            </div>

            <div
              className="flex gap-3 pb-5"
              style={{ height: "calc(100vh - 190px)" }}
            >
              {columns.map((column, columnIndex) => (
                <div
                  key={column.id}
                  className={`w-80 p-4 rounded-lg shadow-lg ${column.color} group`}
                >
                  <h3 className="text-xl text-gray-700 border-b border-b-slate-400 font-semibold mb-4">
                    {column.name}
                  </h3>
                  <div className="flex-1 overflow-y-auto space-y-4 max-h-[calc(100vh-290px)]">
                    {column.tasks.length === 0 ? (
                      <p className="text-gray-500">Nenhuma tarefa</p>
                    ) : (
                      column.tasks.map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="bg-white p-4 rounded-md shadow-md cursor-pointer"
                        >
                          <div className="flex border-b">
                            <div>
                              <h5 className="text-gray-900 text-lg font-bold">
                                {task.name}
                              </h5>
                              <p className="text-gray-400 text-sm">
                                Descrição da tarefa
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-gray-500">{formatDate(task.date)}</p>
                            <div className="flex -space-x-1 overflow-hidden">
                            {task.responsible ? (
                              <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-blue-200 flex justify-center items-center text-xs">
                                {task.responsible[0].toUpperCase()}
                              </span>
                            ) : null}
                            </div>
                          </div>
                          <button
                            className="hidden group-hover:block px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-600 transition duration-300"
                            onClick={() => handleModalOpen(task, "edit")}
                          >
                            <FaEdit />
                            </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            {modalType === "edit" && (
              <>
                <h3 className="text-xl font-semibold">
                  Editar Status da Tarefa
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleStatusChange(modalData.id, status);
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
              </>
            )}
            {modalType === "create" && (
              <>
                <h3 className="text-xl font-semibold">Criar Nova Tarefa</h3>

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
                    Salvar
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="mt-2 w-full py-2 px-4 bg-gray-500 text-white rounded-md"
                  >
                    Fechar
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
