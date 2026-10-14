import { useEffect, useState } from "react";

const priorityStyles = {
  high: "bg-[#ffc66e] text-[#4d3b20]",
  medium: "bg-[#fff080] text-[#4d4820]",
  low: "bg-[#9bd3a0] text-[#2e4d32]",
};

const statusStyles = {
  pending: "bg-[#f8e1e4] text-[#54383b]",
  "in-progress": "bg-[#d8c7eb] text-[#30283a]",
  completed: "bg-[#bde0c3] text-[#304735]",
  All: "bg-[#d8dfe1] text-[#343b3d]",
};

const Dashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTasks() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/task", {
          headers: token ? { Authorization: "Bearer " + token } : {},
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Unable to load tasks.");
        }

        setTasks(Array.isArray(result.tasks) ? result.tasks : []);
      } catch (requestError) {
        setError(requestError.message || "Unable to connect. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    getTasks();
  }, []);

  const visibleTasks = tasks.filter((task) => {
    const matchesStatus =
      activeStatus === "All" || task.status?.toLowerCase() === activeStatus;
    const matchesSearch = [task.title, task.content, task.priority, task.status]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white px-4 py-4 font-sans text-[#191919] sm:px-6">
      <div className="mx-auto w-full max-w-[900px]">
        <header className="relative flex h-8 items-start justify-between border-b border-[#dedede] pb-4">
          <a className="mt-0.5 inline-flex h-5 w-5 items-center justify-center text-[#191919]" href="/dashboard" aria-label="Task manager home">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true">
              <path d="M13.15 2.55a2 2 0 0 0-2.83 0L3.1 9.77a2 2 0 0 0 0 2.83l2.06 2.05 9.27-9.27-1.28-1.28Zm2.7 2.7-9.27 9.27 1.72 1.72 9.27-9.27-1.72-1.72Zm3.14 3.14-9.27 9.27 2.06 2.06a2 2 0 0 0 2.83 0l7.22-7.22a2 2 0 0 0 0-2.83l-2.84-2.83Z" />
            </svg>
          </a>
          <button className="mr-1 rounded-[6px] border border-[#dedede] px-3 py-1 text-[11px] font-medium text-[#333] hover:bg-[#f5f5f5]" type="button" onClick={onLogout}>
            Log out
          </button>
        </header>

        <section className="mt-8 flex items-center gap-2" aria-label="Task tools">
          <label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-[6px] border border-[#dedede] px-3 text-[#a0a0a0] sm:max-w-[320px]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-none stroke-current stroke-[1.6]" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.7" />
              <path strokeLinecap="round" d="m16 16 4.3 4.3" />
            </svg>
            <input className="h-full min-w-0 flex-1 border-0 bg-transparent text-[11px] text-[#333] outline-none placeholder:text-[#a0a0a0]" type="search" placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search tasks" />
          </label>
          <button className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[6px] border border-[#d2d2d2] bg-white px-2 text-[11px] font-medium text-[#333]" type="button">
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-[1.4]" aria-hidden="true">
              <path strokeLinecap="round" d="M4 3v14m6-14v14m6-14v14M2 6h4m2 5h4m2-5h4" />
              <circle cx="4" cy="6" r="1.5" fill="white" />
              <circle cx="10" cy="11" r="1.5" fill="white" />
              <circle cx="16" cy="6" r="1.5" fill="white" />
            </svg>
            Filter
          </button>
          <a className="ml-auto inline-flex h-9 shrink-0 items-center gap-1 rounded-[6px] bg-[#19191b] px-3 text-[11px] font-semibold text-white no-underline" href="/addtask">
            <span className="text-base font-normal leading-none">+</span>
            New Task
          </a>
        </section>

        <nav className="-mx-1 mt-6 flex min-h-[57px] items-center gap-2 border-2 border-[#a341ff] px-4 text-[12px] font-medium text-[#a4a5ab] sm:gap-5 sm:px-7" aria-label="Task status">
          {["pending", "in-progress", "completed", "All"].map((status) => (
            <button
              key={status}
              className={`inline-flex items-center whitespace-nowrap rounded-md px-2.5 py-2 capitalize transition-colors ${
                activeStatus === status
                  ? "bg-[#e7e7e7] text-[#5c5c5c]"
                  : "text-inherit hover:bg-[#f3f3f3] hover:text-[#5c5c5c]"
              }`}
              type="button"
              aria-pressed={activeStatus === status}
              onClick={() => setActiveStatus(status)}
            >
              {status}
            </button>
          ))}
        </nav>

        <section className="mt-6 space-y-2 px-1" aria-label="Tasks">
          {loading && <p className="py-4 text-sm text-[#777]" role="status">Loading tasks...</p>}
          {error && <p className="py-4 text-sm text-red-600" role="alert">{error}</p>}
          {!loading && !error && visibleTasks.length === 0 && <p className="py-4 text-sm text-[#777]">No tasks found.</p>}
          {!error && visibleTasks.map((task) => (
            <article key={task._id} className="grid min-h-[64px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 bg-[#f5f5f5] px-3 py-2 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:px-4">
              <div className="min-w-0">
                <h2 className="truncate text-[12px] font-semibold leading-4 text-[#171717]">{task.title}</h2>
                <p className="mt-1 break-words text-[11px] leading-4 text-[#777]">{task.content}</p>
                <a className="mt-1 inline-block text-[10px] font-medium text-[#555] underline" href={`/EditTask/${task._id}`}>Edit task</a>
              </div>
              <span className={`rounded-md px-2 py-0.5 text-[10px] leading-4 ${priorityStyles[task.priority] || "bg-[#e5e5e5] text-[#333]"}`}>
                {task.priority}
              </span>
              <span className={`col-start-2 row-start-2 justify-self-end rounded-md px-2 py-0.5 text-[10px] leading-4 sm:col-start-auto sm:row-start-auto ${statusStyles[task.status] || "bg-[#e5e5e5] text-[#333]"}`}>
                {task.status}
              </span>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
