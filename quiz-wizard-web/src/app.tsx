import {createInMemoryServices} from 'quiz-wizard-client'
import {createStore, StoreProvider} from 'quiz-wizard-redux'
import {CssBaseline} from '@material-ui/core'

import {AuthorizationProvider, ServicesProvider} from './providers'
import {Router} from './routes'

const services = createInMemoryServices()
const store = createStore(services)

export function App() {
  return (
    <ServicesProvider value={services}>
      <StoreProvider store={store} >
        <AuthorizationProvider>
          <CssBaseline />
          <Router />
        </AuthorizationProvider>
      </StoreProvider>
    </ServicesProvider>
  )
}