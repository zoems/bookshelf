/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {FullPageSpinner} from './components/lib'
import * as colors from './styles/colors'
import {client} from './utils/api-client'
import {useAsync} from './utils/hooks'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

// but how are you getting the form passed?


async function getUser() {
  let user = null

  const token = await auth.getToken()

if (token) {
  // we're logged in! Let's go get the user's data:
  const data = await client('me', {token})
    console.log(data.user)
    user = data.user
  }

return user
}


function App() {

  const {setData, isError, error, isLoading, isSuccess, data: user, run,} = useAsync()


  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))

  const logout = () => {
    auth.logout()
    setData(null)
  }

  React.useEffect(() => {
    run(getUser())
  },[run])


  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  } else if (isLoading) {
    return (<FullPageSpinner/>)
  } else if (isSuccess) {
    return user? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp login={login} register={register} />
    )
  }


}

export {App}
