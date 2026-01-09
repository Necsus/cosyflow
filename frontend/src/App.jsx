import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NewsDetail from './pages/NewsDetail'
import CategoryNews from './pages/CategoryNews'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/category/:categoryId" element={<CategoryNews />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
