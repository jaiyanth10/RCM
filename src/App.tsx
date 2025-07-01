import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from './providers/ConfigProvider'
import Layout from './components/Layout'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import ConfigurationPage from './pages/ConfigurationPage'
import ComponentRegistry from './components/ComponentRegistry'

function App() {
  return (
    <Router>
      <ConfigProvider>
        <ComponentRegistry />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/configuration" element={<ConfigurationPage />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </Router>
  )
}

export default App
