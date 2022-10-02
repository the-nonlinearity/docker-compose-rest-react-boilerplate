import React, { useState, FormEvent } from 'react'

import { postNewUser } from '../../services/interceptors'

export function Register () {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  })
  const [pendingSubmit, setPendingSubmit] = useState(false)

  const { email, password, passwordConfirm } = formInput

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormInput({
      ...formInput,
      [name]: value
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setPendingSubmit(true)
    postNewUser(email, password).then(() => {
      setPendingSubmit(false)
      console.log('created!!!!!!!!')
    })
    setFormInput({
      email: '',
      password: '',
      passwordConfirm: ''
    })
  }

  if (pendingSubmit) { return <p>Pending...</p> }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
      <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            name="email"
            id="email"
            onChange={handleFormChange}
            placeholder='Enter email'
        />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            name="password"
            id="password"
            onChange={handleFormChange}
            placeholder='Enter password'
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            value={passwordConfirm}
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            onChange={handleFormChange}
            placeholder='Confirm password'
          />
        </div>

        <button
          type="submit"
          disabled={password !== passwordConfirm || !password}
        >
        </button>
      </form>
    </div>
  )
}
