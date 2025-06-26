import { DashboardProvider } from "./contexts/DashboardContext.jsx";
import { ShorturlsProvider } from "./contexts/ShorturlsContext.jsx";
import Router from "./routers/router.jsx";

const App = () => {
  return (
    <DashboardProvider>
      <ShorturlsProvider>
        <Router />
      </ShorturlsProvider>
    </DashboardProvider>
  );
};
export default App;
