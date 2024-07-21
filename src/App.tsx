import CheckStuff from "./components/CheckStuff";
import Header from "./components/Header";
import MUIWrapper from "./MUI/MUIWrapper";

function App() {
  return (
    <>
      <MUIWrapper>
        <Header />
        <CheckStuff />
      </MUIWrapper>
    </>
  );
}

export default App;
