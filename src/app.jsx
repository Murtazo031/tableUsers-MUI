import { createRoot } from 'react-dom/client'
import './global.css'
import { Provider } from 'react-redux'
import { store } from './Store/store'
import TableUser from './tableUsers/table-users'

createRoot(document.getElementById('root')).render(
 <Provider store={store}>  
  <TableUser/>
</Provider>

  )
