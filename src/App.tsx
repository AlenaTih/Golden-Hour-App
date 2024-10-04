// import Header from "./components/Header.tsx"
import GoldenHour from "./components/GoldenHour.tsx"
import Footer from "./components/Footer.tsx"
import BackgroundImage from "./assets/cold-sunset-background.png"
import "./App.css"

function App() {
  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${BackgroundImage})`}}
    >
      {/* <Header /> */}
      <GoldenHour />
      <Footer />
    </div>
  )
}

export default App
