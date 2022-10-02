import React, { useState, FormEvent } from 'react'

export function Register () {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [pendingSubmit, setPendingSubmit] = useState(false)

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setPendingSubmit(true)
    console.log(emailInput, passwordInput, '<<<<<<<<')
    setPendingSubmit(false)
  }

  if (pendingSubmit) { return <p>Pending...</p> }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
      <label htmlFor="email">Email</label>
          <input
            value={emailInput}
            type="email"
            name="email"
            id="email"
            onChange={handleEmailChange}
        />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={passwordInput}
            type="password"
            name="password"
            id="password"
            onChange={handlePasswordChange}
          />
        </div>

        <button
          type="submit"
          // disabled={loginRequestStatus === 'loading'}
        >
        </button>
      </form>
    </div>
  )
}
