import { Button } from './components/Button';
import { CounterButton } from './components/CounterButton';


function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <div>
        <Button label="Button 1" />
        <Button>Button 2</Button>

        <CounterButton />
        <CounterButton />
        <CounterButton />
        <CounterButton />
      </div>
    </div>
  );
}

export default App;
