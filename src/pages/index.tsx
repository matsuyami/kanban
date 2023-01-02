import { Layout } from '../components/layout/Layout'
import { BoardProvider } from '../context/boardContext'

const IndexPage = () => {

  return (
    <BoardProvider>
      <Layout title="Kanban" />
    </BoardProvider>
  )
}

export default IndexPage
