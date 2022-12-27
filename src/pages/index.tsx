import { Layout } from '../components/layout/Layout'
import { ColumnProvider } from '../context/columnContext'
import { BoardProvider } from '../context/boardContext'

const IndexPage = () => {

  return (
    <BoardProvider>
      <ColumnProvider>
        <Layout title="Kanban" />
      </ColumnProvider>
    </BoardProvider>
  )
}

export default IndexPage
