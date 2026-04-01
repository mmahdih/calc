import './App.css';
import { useState } from 'react';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberClick = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return current !== 0 ? prev / current : 0;
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const Button = ({ value, onClick, className = '', variant = 'default' }) => (
    <button
      onClick={onClick}
      className={`calc-button ${variant} ${className}`}
    >
      {value}
    </button>
  );

  return (
    <div className="App">
      <div className="calculator-container">
        <h1>Calculator</h1>
        <div className="calculator">
          <div className="display">{display}</div>

          <div className="buttons-grid">
            {/* First Row */}
            <Button
              value="AC"
              onClick={handleClear}
              variant="special"
              className="span-2"
            />
            <Button
              value="⌫"
              onClick={handleBackspace}
              variant="special"
            />
            <Button
              value="÷"
              onClick={() => handleOperation('/')}
              variant="operator"
            />

            {/* Second Row */}
            <Button value="7" onClick={() => handleNumberClick(7)} />
            <Button value="8" onClick={() => handleNumberClick(8)} />
            <Button value="9" onClick={() => handleNumberClick(9)} />
            <Button
              value="×"
              onClick={() => handleOperation('*')}
              variant="operator"
            />

            {/* Third Row */}
            <Button value="4" onClick={() => handleNumberClick(4)} />
            <Button value="5" onClick={() => handleNumberClick(5)} />
            <Button value="6" onClick={() => handleNumberClick(6)} />
            <Button
              value="−"
              onClick={() => handleOperation('-')}
              variant="operator"
            />

            {/* Fourth Row */}
            <Button value="1" onClick={() => handleNumberClick(1)} />
            <Button value="2" onClick={() => handleNumberClick(2)} />
            <Button value="3" onClick={() => handleNumberClick(3)} />
            <Button
              value="+"
              onClick={() => handleOperation('+')}
              variant="operator"
            />

            {/* Fifth Row */}
            <Button
              value="0"
              onClick={() => handleNumberClick(0)}
              className="span-2"
            />
            <Button value="." onClick={handleDecimal} />
            <Button
              value="="
              onClick={handleEquals}
              variant="equals"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
