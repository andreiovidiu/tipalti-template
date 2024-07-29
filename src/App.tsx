import { useState } from "react";
import { ExpensesTable } from "./components/ExpensesTable";
import { ExpensesState } from "./components/ExpensesState";

function App() {
  const [tableState, _] = useState(new ExpensesState());

  return (
    <div id="template-text">
      <h1>Expenses</h1>
      <ExpensesTable state={tableState} />
    </div>
  );
}

export default App;
