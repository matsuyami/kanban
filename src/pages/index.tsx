import { Board } from '../components/kanban/Board'
import { Layout } from '../components/layout/Layout'
import { ColumnProvider } from '../context/columnContext'

const IndexPage = () => {

  return (
    <ColumnProvider>
      <Layout title="Kanban" >
        <Board />
      </Layout >
    </ColumnProvider>
  )
}

export default IndexPage
