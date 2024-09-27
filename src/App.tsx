import GoldenHour from "./components/GoldenHour.tsx"
import Footer from "./components/Footer.tsx"
import "./App.css"

function App() {
  return (
    <div className="app-container">
      <h1 className="golden-hour-title">Golden Hour App</h1>
      <GoldenHour />
      <Footer />
    </div>
  )
}

export default App
