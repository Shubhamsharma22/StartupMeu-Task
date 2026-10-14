import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLoginsuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

const navigate = useNavigate()

  async function handleSubmit(e) {
  e.preventDefault();
setError("")
  const userCredentials = { email, password };

  try {
    const res = await fetch("http://localhost:3000/api/auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    onLoginsuccess(data.token);

    console.log("Login successful:", data);
  navigate("/Dashboard")
  } catch (error) {
    console.error("Error:", error.message);
  }
}

  return (
    <main className="grid min-h-screen w-full grid-cols-[0.87fr_1fr] bg-white font-sans text-[#171717]">
      <section className="flex min-w-0 items-center justify-center border-r border-[#e4e4e4] px-[7%] py-8" aria-labelledby="login-title">
        <div className="w-[82%] max-w-[372px]">
          <h1 className="mb-[13vh] text-center text-[clamp(10px,2.2vw,28px)] font-bold leading-tight tracking-[-0.45px]" id="login-title">
            Login
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-[2.8vh]">
              <label className="block">
                <span className="sr-only">Email</span>
                <input
                  className="h-[clamp(23px,6vw,54px)] w-full rounded-[clamp(4px,1vw,11px)] border border-[#d8d8d8] bg-white px-[clamp(6px,1.3vw,18px)] text-[clamp(7px,1vw,14px)] text-[#202020] outline-none transition focus:border-[#0a9b69] focus:ring-2 focus:ring-[#0a9b69]/10"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              <label className="relative block">
                <span className="sr-only">Password</span>
                <input
                  className="h-[clamp(23px,6vw,54px)] w-full rounded-[clamp(4px,1vw,11px)] border border-[#d8d8d8] bg-white px-[clamp(6px,1.3vw,18px)] pr-9 text-[clamp(7px,1vw,14px)] text-[#202020] outline-none transition focus:border-[#0a9b69] focus:ring-2 focus:ring-[#0a9b69]/10"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <svg className="pointer-events-none absolute right-[clamp(6px,1.2vw,16px)] top-1/2 h-[clamp(10px,1.6vw,19px)] w-[clamp(10px,1.6vw,19px)] -translate-y-1/2 fill-none stroke-[#4c4c4c] stroke-[1.6]" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </label>
            </div>

            <div className="mt-[4vh] flex justify-start">
              <a className="text-[clamp(6px,0.8vw,11px)] text-[#333] hover:underline" href="/forgot-password">
                Forgot password?
              </a>
            </div>

            {error && <p className="mt-2 text-xs text-red-600" role="alert">{error}</p>}

            <button className="mt-[7vh] h-[clamp(23px,6vw,54px)] w-full rounded-[clamp(4px,1vw,10px)] bg-[#19191b] text-[clamp(7px,1vw,14px)] font-bold text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a9b69]" type="submit">
              Login
            </button>
          </form>

          <p className="mt-[7vh] text-center text-[clamp(6px,0.9vw,13px)] leading-tight text-[#151515]">
            Don&apos;t have an account?{' '}
            <a className="text-[#099b69] hover:underline" href="/register">Register</a>
          </p>
        </div>
      </section>

      <section className="flex min-w-0 flex-col items-center overflow-hidden px-[5%] pt-[16vh] text-center" aria-labelledby="login-brand-title">
        <div className="w-full max-w-[500px]">
          <h2 className="text-[clamp(13px,3.4vw,33px)] font-bold leading-tight tracking-[-0.75px]">
            Stay on <span className="text-[#0a9b69]">Track</span>
          </h2>
          <p className="mx-auto mt-[9vh] max-w-[460px] text-[clamp(8px,1.8vw,18px)] leading-snug text-[#858585]">
            Welcome back! Pick up right where you left off and stay on top of what matters most.
          </p>
        </div>

        <svg className="mt-[12vh] block h-auto w-[60%] max-w-[438px]" viewBox="0 0 240 240" role="img" aria-label="A person planning tasks beside a goals checklist">
          <rect x="11" y="25" width="55" height="126" fill="#fff" stroke="#c9c9c9" strokeWidth="3" />
          <path d="M38 25v126M11 88h55" stroke="#dedede" strokeWidth="2" />
          <rect x="82" y="24" width="115" height="156" rx="2" fill="#fff" stroke="#aaa" strokeWidth="2" />
          <text x="103" y="54" fill="#252525" fontSize="12" fontWeight="700">GOALS</text>
          <g fill="none" stroke="#777" strokeWidth="1.5">
            <path d="m94 67 3 3 5-6m-8 19 3 3 5-6m-8 19 3 3 5-6m-8 19 3 3 5-6" />
            <path d="M108 68h75m-75 19h75m-75 19h75m-75 19h75" />
          </g>
          <path d="M24 184V127m0 16c-13-7-18-17-17-26 9 2 15 9 17 19m0 17c12-9 17-18 16-28-9 3-15 10-16 21m0 17c-11-4-16-11-17-20 8 1 14 5 17 12m0 17c10-7 14-15 14-23-8 3-12 9-14 16" fill="none" stroke="#292929" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 187h21v-6H14z" fill="#454545" />
          <path d="M105 148c-8-12-6-28 4-38 10-10 26-8 31 4 5 11-1 25-11 30-8 4-17 6-24 4Z" fill="#e8a898" />
          <path d="M104 124c-1-16 7-25 19-25 9 0 17 7 18 17-8-4-18-3-25 2l-12 6Z" fill="#252525" />
          <path d="M102 147c-15 9-20 24-17 41 14 9 40 10 55 1l-2-23-19-20Z" fill="#303030" />
          <path d="m103 155-21 18m41-17 20 15" fill="none" stroke="#e8a898" strokeWidth="8" strokeLinecap="round" />
          <path d="M141 169c12-8 19-4 24-1l27 2-1 5-28 1-20 8" fill="#333" />
          <path d="M96 186 88 211m42-24 9 23" stroke="#292929" strokeWidth="9" strokeLinecap="round" />
          <path d="M72 214h126" stroke="#555" strokeWidth="2" strokeLinecap="round" />
          <path d="M180 190c9-7 19-5 24 2 4 6 3 13-2 16-5 3-11 0-16-3-4 3-9 3-12 0-4-4-1-10 6-15Z" fill="#222" />
          <circle cx="198" cy="192" r="1.5" fill="#fff" />
        </svg>
      </section>
    </main>
  )
}

export default Login
