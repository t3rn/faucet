import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./home.js"
import Footer from "./footer.js"
import { Box } from "rebass"
import Dots from "./dots.js"
import Modal from "./modal"

export default function App() {
  return (
    <>
      <Dots />
      <Modal />
      <BrowserRouter>
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </Box>
      </BrowserRouter>
    </>
  )
}
