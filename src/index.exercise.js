import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { Logo } from 'components/logo'
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'


const App = () => {

  const [openModal, setOpenModal] = React.useState(null)

  return (
    <div>
      <Logo width='80' height='80' />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>

      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm buttonText="login"/>
      </Dialog>

      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm buttonText="Register"/>
      </Dialog>

    </div>
  )
}

export default App

const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(<App/>)




function LoginForm({onSubmit, buttonText}) {

  const [formData, setFormData] = React.useState({
    userName: '',
    password: ''
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)
    //how do i pass state to a different component
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <label htmlFor="userName">Username</label>
      </div>
      <div>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}


// 👨‍💼 The user should be able to login or register by providing a username and
// password.

// For this one, create a `LoginForm` component which renders a form accepting a
// username and password. When the user submits the form, it should call an
// `onSubmit` prop with the `username` and `password`. Here's how it will be used:

// ```javascript
// function Example() {
//   function handleSubmit(formData) {
//     console.log('login', formData)
//   }
//   return <LoginForm onSubmit={handleSubmit} buttonText="Login" />
// }
// ```

// That should render a form where the submit button says "Login" and when the user
// clicks it, you'll get a console.log with the form's data.
