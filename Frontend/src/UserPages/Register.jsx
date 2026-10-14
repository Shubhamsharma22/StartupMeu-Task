import React, { useState } from 'react'
import './Register.css'

const Register = () => {
const[name,setName] = useState("")
    const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[cpassword,setCpassword] = useState("")
  
 async function handlesubmit(e) {
e.preventDefault()

if (password !== cpassword) {
  window.alert("Passwords do not match")
  return
}

try {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })
  const result = await response.json()

  if (!response.ok) throw new Error(result.message || "Registration failed")
  window.alert(result.message || "Registration successful")
} catch (error) {
  window.alert(error.message || "Registration failed")
}
}
  
    return (
    <main className="register-screen">
      <section className="register-panel" aria-labelledby="register-title">
        <div className="register-form-content">
          <h1 className="register-title" id="register-title">Register</h1>

      <form onSubmit={handlesubmit} className="space-y-4">
          <div className="register-fields" aria-label="Registration details">



            <label className="register-field">
              <span className="visually-hidden">Name</span>
              <input type="text" name="name" placeholder="Name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>




            <label className="register-field">
              <span className="visually-hidden">Email</span>
              <input type="email" name="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>



            <label className="register-field register-field-with-icon">
              <span className="visually-hidden">Password</span>
              <input type="password" name="password" placeholder="Password" autoComplete="new-password" maxLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
              <svg className="password-eye" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
                <path d="M9.9 5.2A10.8 10.8 0 0112 5c5.2 0 8.7 4.4 9.5 6-.3.7-1.4 2.2-3.2 3.5M6.2 6.2C4.1 7.5 2.8 9.5 2.5 11c.8 1.6 4.3 6 9.5 6 1 0 1.9-.2 2.8-.5" />
              </svg>
            </label>

            <label className="register-field register-field-with-icon">
              <span className="visually-hidden">Confirm password</span>
              <input type="password" name="confirmPassword" placeholder="Confirm password" autoComplete="new-password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
              <svg className="password-eye" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
                <path d="M9.9 5.2A10.8 10.8 0 0112 5c5.2 0 8.7 4.4 9.5 6-.3.7-1.4 2.2-3.2 3.5M6.2 6.2C4.1 7.5 2.8 9.5 2.5 11c.8 1.6 4.3 6 9.5 6 1 0 1.9-.2 2.8-.5" />
              </svg>
            </label>
          </div>

          <button className="register-button" type="submit">Register</button>
</form>

          <p className="register-login-prompt">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </section>

      <section className="register-brand-panel" aria-labelledby="register-brand-title">
        <div className="register-brand-copy">
          <h2 id="register-brand-title">Start <span>Organizing</span></h2>
          <p>Start fresh with a simple and cozy way to organize your tasks, priorities, and daily plans.</p>
        </div>

        <svg className="register-illustration" viewBox="0 0 440 390" role="img" aria-label="A person organizing tasks at a laptop">
          <ellipse cx="226" cy="205" rx="176" ry="150" fill="#d1d1d1" />

          <g fill="none" stroke="#545454" strokeLinecap="round" strokeLinejoin="round">
            <path d="M81 305V204m0 34c-22-10-29-26-28-39 15 3 25 13 28 27m0 29c21-15 31-31 30-47-16 6-27 18-30 35m0 27c-19-6-30-19-33-34 15 1 26 8 33 22m0 22c18-12 27-25 27-39-15 5-24 15-27 28" strokeWidth="3" />
            <path d="M65 306h32v-8H65z" fill="#6b6b6b" strokeWidth="2" />
          </g>
          <g fill="#303030">
            <ellipse cx="55" cy="215" rx="8" ry="4" transform="rotate(35 55 215)" />
            <ellipse cx="109" cy="223" rx="8" ry="4" transform="rotate(-35 109 223)" />
            <ellipse cx="49" cy="253" rx="8" ry="4" transform="rotate(25 49 253)" />
            <ellipse cx="112" cy="262" rx="8" ry="4" transform="rotate(-30 112 262)" />
            <ellipse cx="52" cy="277" rx="8" ry="4" transform="rotate(25 52 277)" />
          </g>

          <g>
            <rect x="112" y="72" width="244" height="166" rx="4" fill="#f9f9f9" stroke="#686868" strokeWidth="3" />
            <path d="M112 78a6 6 0 016-6h232a6 6 0 016 6v21H112z" fill="#292929" />
            <path d="M112 98h244v18H112z" fill="#a7a7a7" />
            <circle cx="124" cy="86" r="2.5" fill="#eee" />
            <circle cx="133" cy="86" r="2.5" fill="#eee" />
            <circle cx="142" cy="86" r="2.5" fill="#eee" />
            <path d="M153 86h164" stroke="#dedede" strokeWidth="4" strokeLinecap="round" />
            <g fill="#d6d6d6" stroke="#bebebe" strokeWidth="1">
              <rect x="126" y="131" width="37" height="24" rx="2" />
              <rect x="174" y="131" width="37" height="24" rx="2" />
              <rect x="222" y="131" width="37" height="24" rx="2" />
              <rect x="270" y="131" width="37" height="24" rx="2" />
              <rect x="318" y="131" width="25" height="24" rx="2" />
              <rect x="126" y="167" width="37" height="24" rx="2" />
              <rect x="174" y="167" width="37" height="24" rx="2" />
              <rect x="222" y="167" width="37" height="24" rx="2" />
              <rect x="270" y="167" width="37" height="24" rx="2" />
              <rect x="318" y="167" width="25" height="24" rx="2" />
            </g>
          </g>

          <g fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M58 115h9v12h-9zM60 115v-4a3 3 0 016 0v4" />
            <path d="M362 57h9v12h-9zM364 57v-4a3 3 0 016 0v4" />
            <path d="M367 263h9v12h-9zM369 263v-4a3 3 0 016 0v4" />
          </g>

          <path d="M95 320h286" stroke="#555" strokeWidth="3" strokeLinecap="round" />
          <path d="M178 320l7-72h130l8 72" fill="#eeeeee" stroke="#555" strokeWidth="2" />
          <path d="M190 248h105v8H190z" fill="#303030" />
          <path d="M222 288h84v7h-84zM222 301h84v7h-84z" fill="#c8c8c8" />

          <path d="M163 282c-4-19 0-40 15-55l23 7-4 52-25 13z" fill="#333" />
          <path d="M185 236c7-13 14-27 24-32l19 11-8 30-24 8z" fill="#333" />
          <path d="M198 202c-3-15 3-29 16-33 13-3 24 7 24 20 0 11-6 21-17 24-10 2-20-3-23-11z" fill="#444" />
          <path d="M202 188c-1-14 7-24 20-23 10 1 16 8 17 17-8-4-17-5-25-1l-12 7z" fill="#222" />
          <path d="M199 236l-28 23-12-5 16-28M217 240l19 24-7 9-25-17" fill="none" stroke="#333" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M233 264l23-14 42 12-6 5-43-5-12 11z" fill="#555" />
          <path d="M233 264l23-14 42 12-6 5-43-5-12 11z" fill="none" stroke="#333" strokeWidth="2" strokeLinejoin="round" />
          <path d="M167 289l-4 31m53-15 6 15" stroke="#333" strokeWidth="8" strokeLinecap="round" />

          <g fill="#707070">
            <circle cx="188" cy="53" r="2" />
            <circle cx="204" cy="53" r="2" />
            <circle cx="220" cy="53" r="2" />
            <circle cx="307" cy="286" r="2" />
            <circle cx="317" cy="286" r="2" />
          </g>
        </svg>
      </section>
    </main>
  )
}

export default Register

