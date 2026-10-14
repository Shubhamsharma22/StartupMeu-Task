import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const statuses = ["pending", "in-progress", "completed", "All"];
const priorities = ["high", "medium", "low"];

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", content: "", status: "pending", priority: "high" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTask() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/task", {
          headers: token ? { Authorization: "Bearer " + token } : {},
        });
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Unable to load task.");
        const foundTask = (result.tasks || []).find((item) => item._id === id);
        if (!foundTask) throw new Error("Task not found.");

        if (active) {
          setTask({
            title: foundTask.title || "",
            content: foundTask.content || "",
            status: foundTask.status || "pending",
            priority: foundTask.priority || "high",
          });
        }
      } catch (loadError) {
        if (active) setError(loadError.message || "Unable to load task.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTask();
    return () => { active = false; };
  }, [id]);

  function updateField(event) {
    const { name, value } = event.target;
    setTask((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify(task),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Unable to update task.");
      navigate("/Dashboard");
    } catch (submitError) {
      setError(submitError.message || "Unable to update task.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white px-5 font-sans text-[#191919] sm:px-8">
      <header className="-mx-5 flex h-[54px] items-center justify-between border-b border-[#dedede] px-8 sm:-mx-8 sm:px-10">
        <a href="/Dashboard" className="inline-flex h-6 w-6 items-center justify-center" aria-label="All tasks">
          <svg viewBox="0 0 24 24" className="h-[19px] w-[19px] fill-current" aria-hidden="true"><path d="M13.15 2.55a2 2 0 0 0-2.83 0L3.1 9.77a2 2 0 0 0 0 2.83l2.06 2.05 9.27-9.27-1.28-1.28Zm2.7 2.7-9.27 9.27 1.72 1.72 9.27-9.27-1.72-1.72Zm3.14 3.14-9.27 9.27 2.06 2.06a2 2 0 0 0 2.83 0l7.22-7.22a2 2 0 0 0 0-2.83l-2.84-2.83Z" /></svg>
        </a>
        <button className="flex h-7 w-7 flex-col items-center justify-center gap-1" type="button" aria-label="Menu">
          <span className="h-px w-4 bg-[#555]" /><span className="h-px w-4 bg-[#555]" /><span className="h-px w-4 bg-[#555]" />
        </button>
      </header>

      <div className="mx-auto w-full max-w-[560px] pb-8 pt-5">
        <a href="/Dashboard" className="inline-flex items-center gap-1 text-[11px] text-[#777] hover:text-[#191919]">
          <svg viewBox="0 0 20 20" className="h-3 w-3 fill-none stroke-current stroke-[1.5]" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m12.5 4-6 6 6 6M7 10h10" /></svg>
          All tasks
        </a>

        <section className="mt-3" aria-labelledby="edit-task-title">
          <h1 id="edit-task-title" className="text-[20px] font-bold leading-7 tracking-[-0.3px]">Edit Task</h1>
          <p className="mt-1 text-[11px] leading-4 text-[#888]">Update the details and keep your plans organized.</p>

          {loading ? <p className="mt-4 text-xs text-[#777]" role="status">Loading task...</p> : (
            <form className="mt-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,2.2fr)_minmax(150px,1fr)] sm:gap-4">
                <label className="block text-[10px] font-medium leading-4">
                  Task name
                  <input className="mt-1 h-9 w-full rounded-[7px] border border-[#dedede] bg-white px-2.5 text-[11px] font-normal outline-none placeholder:text-[#999] focus:border-[#777]" type="text" name="title" placeholder="Enter task name" value={task.title} onChange={updateField} required />
                </label>
                <label className="block text-[10px] font-medium leading-4">
                  Due date
                  <input className="mt-1 h-9 w-full rounded-[7px] border border-[#dedede] bg-white px-2.5 text-[11px] font-normal outline-none focus:border-[#777]" type="date" name="dueDate" />
                </label>
              </div>

              <label className="mt-3 block text-[10px] font-medium leading-4">
                Description
                <textarea className="mt-1 h-[72px] w-full resize-none rounded-[7px] border border-[#dedede] bg-white px-2.5 py-2 text-[11px] font-normal leading-5 outline-none placeholder:text-[#999] focus:border-[#777]" name="content" placeholder="Add a description" value={task.content} onChange={updateField} required />
              </label>

              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <fieldset className="min-w-0">
                  <legend className="mb-1.5 text-[10px] font-medium">Status</legend>
                  <div className="grid grid-cols-2 gap-1.5">
                    {statuses.map((status) => (
                      <label key={status} className="relative flex h-[39px] cursor-pointer items-center justify-center rounded-[7px] border border-[#dedede] bg-white has-[:checked]:border-[#222]">
                        <input className="peer sr-only" type="radio" name="status" value={status} checked={task.status === status} onChange={updateField} />
                        <span className="rounded px-2 py-0.5 text-[10px] leading-4 peer-checked:bg-[#d8dfe1]">{status}</span>
                        <svg className="ml-1 h-3 w-3" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="min-w-0">
                  <legend className="mb-1.5 text-[10px] font-medium">Priority</legend>
                  <div className="grid grid-cols-3 gap-1.5">
                    {priorities.map((priority) => (
                      <label key={priority} className="relative flex h-[39px] cursor-pointer items-center justify-center rounded-[7px] border border-[#dedede] bg-white has-[:checked]:border-[#222]">
                        <input className="peer sr-only" type="radio" name="priority" value={priority} checked={task.priority === priority} onChange={updateField} />
                        <span className="rounded px-2 py-0.5 text-[10px] leading-4 peer-checked:bg-[#fff080]">{priority}</span>
                        <svg className="ml-1 h-3 w-3" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              {error && <p className="mb-2 mt-3 text-xs text-red-600" role="alert">{error}</p>}

              <div className="mt-4 flex justify-end gap-2 border-t border-[#ededed] pt-3">
                <a className="inline-flex h-[35px] items-center justify-center rounded-[7px] border border-[#dedede] px-5 text-[11px] font-medium text-[#333] no-underline" href="/Dashboard">Cancel</a>
                <button className="inline-flex h-[35px] items-center gap-1.5 rounded-[7px] bg-[#19191b] px-5 text-[11px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={submitting}>
                  {submitting ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

export default EditTask;
