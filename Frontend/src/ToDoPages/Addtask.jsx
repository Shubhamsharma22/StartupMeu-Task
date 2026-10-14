import { useState } from "react";

const Addtask = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const form = event.currentTarget;
    const values = new FormData(form);
    const task = {
      title: values.get("title").trim(),
      content: values.get("content").trim(),
      priority: values.get("priority"),
      status: values.get("status"),
    };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify(task),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to add the task.");
      }

      setSuccess(result.message || "Task added successfully.");
      form.reset();
    } catch (submitError) {
      setError(submitError.message || "Unable to connect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
 
 
 
    return(
 <main className="min-h-screen bg-white px-5 font-sans text-[#191919] sm:px-8">
    <header className="-mx-5 flex h-[54px] items-center justify-between border-b border-[#dedede] px-8 sm:-mx-8 sm:px-10">
      <a href="/dashboard" className="inline-flex h-6 w-6 items-center justify-center" aria-label="All tasks">
        <svg viewBox="0 0 24 24" className="h-[19px] w-[19px] fill-current" aria-hidden="true">
          <path d="M13.15 2.55a2 2 0 0 0-2.83 0L3.1 9.77a2 2 0 0 0 0 2.83l2.06 2.05 9.27-9.27-1.28-1.28Zm2.7 2.7-9.27 9.27 1.72 1.72 9.27-9.27-1.72-1.72Zm3.14 3.14-9.27 9.27 2.06 2.06a2 2 0 0 0 2.83 0l7.22-7.22a2 2 0 0 0 0-2.83l-2.84-2.83Z" />
        </svg>
      </a>
      <button className="flex h-7 w-7 flex-col items-center justify-center gap-1" type="button" aria-label="Menu">
        <span className="h-px w-4 bg-[#555]" />
        <span className="h-px w-4 bg-[#555]" />
        <span className="h-px w-4 bg-[#555]" />
      </button>
    </header>

    <div className="mx-auto w-full max-w-[560px] pb-8 pt-5">
      <a href="/dashboard" className="inline-flex items-center gap-1 text-[11px] text-[#777] hover:text-[#191919]">
        <svg viewBox="0 0 20 20" className="h-3 w-3 fill-none stroke-current stroke-[1.5]" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m12.5 4-6 6 6 6M7 10h10" />
        </svg>
        All tasks
      </a>

      <section className="mt-3" aria-labelledby="add-task-title">
        <h1 id="add-task-title" className="text-[20px] font-bold leading-7 tracking-[-0.3px]">Add Task</h1>
        <p className="mt-1 text-[11px] leading-4 text-[#888]">Make room for what matters. Add the details and get organized.</p>

        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,2.2fr)_minmax(150px,1fr)] sm:gap-4">
            <label className="block text-[10px] font-medium leading-4">
              Task name
              <input className="mt-1 h-9 w-full rounded-[7px] border border-[#dedede] bg-white px-2.5 text-[11px] font-normal outline-none placeholder:text-[#999] focus:border-[#777]" type="text" name="title" placeholder="Enter task name" required />
            </label>
            <label className="block text-[10px] font-medium leading-4">
              Due date
              <input className="mt-1 h-9 w-full rounded-[7px] border border-[#dedede] bg-white px-2.5 text-[11px] font-normal outline-none focus:border-[#777]" type="date" name="dueDate" defaultValue="2024-03-27" />
            </label>
          </div>

          <label className="mt-3 block text-[10px] font-medium leading-4">
            Description
            <textarea className="mt-1 h-[72px] w-full resize-none rounded-[7px] border border-[#dedede] bg-white px-2.5 py-2 text-[11px] font-normal leading-5 outline-none placeholder:text-[#999] focus:border-[#777]" name="content" placeholder="Add a description" required />
          </label>

          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <fieldset className="min-w-0">
              <legend className="mb-1.5 text-[10px] font-medium">Status</legend>
              <div className="grid grid-cols-2 gap-1.5">
                <label className="relative flex h-[39px] cursor-pointer items-center justify-center rounded-[7px] border border-[#dedede] bg-white">
                  <input className="peer sr-only" type="radio" name="status" value="pending" />
                  <span className="rounded px-2 py-0.5 text-[10px] leading-4 peer-checked:bg-[#d8dfe1]">Pending</span>
                  <svg className="ml-1 hidden h-3 w-3 peer-checked:block" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
                </label>
                <label className="relative flex h-[39px] cursor-pointer items-center justify-center rounded-[7px] border border-[#dedede] bg-white has-[:checked]:border-[#222]">
                  <input className="peer sr-only" type="radio" name="status" value="in-progress" defaultChecked />
                  <span className="rounded bg-[#d8c7eb] px-2 py-0.5 text-[10px] leading-4">in-progress</span>
                  <svg className="ml-1 h-3 w-3" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
                </label>
                <label className="relative flex h-[39px] cursor-pointer items-center justify-center rounded-[7px] border border-[#dedede] bg-white has-[:checked]:border-[#222]">
                  <input className="peer sr-only" type="radio" name="status" value="completed" />
                  <span className="rounded bg-[#bde0c3] px-2 py-0.5 text-[10px] leading-4">Completed</span>
                  <svg className="ml-1 hidden h-3 w-3 peer-checked:block" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
                </label>
                <label className="relative flex h-[39px] cursor-pointer items-center justify-center rounded-[7px] border border-[#dedede] bg-white has-[:checked]:border-[#222]">
                  <input className="peer sr-only" type="radio" name="status" value="All" />
                  <span className="rounded bg-[#f8e1e4] px-2 py-0.5 text-[10px] leading-4">All</span>
                  <svg className="ml-1 hidden h-3 w-3 peer-checked:block" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
                </label>
              </div>
            </fieldset>

            <fieldset className="min-w-0">
              <legend className="mb-1.5 text-[10px] font-medium">Priority</legend>
              <div className="grid grid-cols-3 gap-1.5">
                <label className="relative flex h-[39px] cursor-pointer items-center justify-center rounded-[7px] border border-[#dedede] bg-white has-[:checked]:border-[#222]">
                  <input className="peer sr-only" type="radio" name="priority" value="high" defaultChecked />
                  <span className="rounded bg-[#ffc66e] px-2 py-0.5 text-[10px] leading-4">High</span>
                  <svg className="ml-1 h-3 w-3" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
                </label>
                <label className="relative flex h-[39px] cursor-pointer items-center justify-center rounded-[7px] border border-[#dedede] bg-white has-[:checked]:border-[#222]">
                  <input className="peer sr-only" type="radio" name="priority" value="medium" />
                  <span className="rounded bg-[#fff080] px-2 py-0.5 text-[10px] leading-4">Medium</span>
                  <svg className="ml-1 hidden h-3 w-3 peer-checked:block" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
                </label>
                <label className="relative flex h-[39px] cursor-pointer items-center justify-center rounded-[7px] border border-[#dedede] bg-white has-[:checked]:border-[#222]">
                  <input className="peer sr-only" type="radio" name="priority" value="low" />
                  <span className="rounded bg-[#9bd3a0] px-2 py-0.5 text-[10px] leading-4">Low</span>
                  <svg className="ml-1 hidden h-3 w-3 peer-checked:block" viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
                </label>
              </div>
            </fieldset>
          </div>

          {error && <p className="mb-2 text-xs text-red-600" role="alert">{error}</p>}
          {success && <p className="mb-2 text-xs text-green-700" role="status">{success}</p>}

          <div className="mt-4 flex justify-end gap-2 border-t border-[#ededed] pt-3">
            <a className="inline-flex h-[35px] items-center justify-center rounded-[7px] border border-[#dedede] px-5 text-[11px] font-medium text-[#333] no-underline" href="/dashboard">Cancel</a>
            <button className="inline-flex h-[35px] items-center gap-1.5 rounded-[7px] bg-[#19191b] px-5 text-[11px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={submitting}>
              <span className="text-base font-normal leading-none">+</span>
              Add Task
            </button>
          </div>
        </form>
      </section>
    </div>
  </main>
)}

export default Addtask



