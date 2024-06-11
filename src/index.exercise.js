// 🐨 you'll need to import react and createRoot from react-dom up here
import * as React from 'react'
import { createRoot } from 'react-dom/client'

// 🐨 you'll also need to import the Logo component from './components/logo'
import { Logo } from 'components/logo'


const App = () => {

  function handleLoginClick() {
    alert('login was clicked')
  }
  function handleRegisterClick() {
    alert('Register was clicked')
  }




  return (
    <di>
    <Logo />
    <h1>Bookshelf</h1>
    <button onClick={handleLoginClick}>Login</button>
    <button onClick={handleRegisterClick}>Register</button>
    </di>
  )
}

export default App

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(<App/>)
