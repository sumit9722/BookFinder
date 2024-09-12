import NavBar from './NavBar'
import Modal from './Modal'
import YourBook from './YourBook'
import { ModalDisplayProvider } from './ModalDisplayContext'
import { MyBookListProvider } from './MyBookListContext'

export default function App() {
  return (
    <>
      <MyBookListProvider>
        <ModalDisplayProvider>
          <NavBar />
          <Modal />
          <YourBook />
        </ModalDisplayProvider>
      </MyBookListProvider>
    </>
  )
}


