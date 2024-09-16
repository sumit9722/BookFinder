import NavBar from './NavBar'
import Modal from './Modal'
import YourBook from './YourBook'
import Sidebar from './Sidebar'
import "./App.css"
import { ModalDisplayProvider } from './ModalDisplayContext'
import { MyBookListProvider } from './MyBookListContext'
import { SearchContextProvider } from './searchcontext'
import { FilterContextProvider } from './FilterContext'

export default function App() {
  return (
    <>
      <FilterContextProvider>
        <SearchContextProvider>
          <MyBookListProvider>
            <ModalDisplayProvider>
              <NavBar />
              <Modal />
              <div className='mainbody'>
                <Sidebar />
                <YourBook />
              </div>
            </ModalDisplayProvider>
          </MyBookListProvider>
        </SearchContextProvider>
      </FilterContextProvider>
    </>
  )
}


