import "./styles.css";
import { useState } from "react";

const returnArray = () => Array.from({ length: 75 }, (value, key) => key + 1);

const speaker = (number) => {
  const synth = window.speechSynthesis;
  const speaker = new SpeechSynthesisUtterance();

  synth.cancel();

  if (!number) {
    return;
  }

  speaker.text = number;

  speechSynthesis.speak(speaker);

  let parts = `${number}`.split("");

  if (parts.length > 1) {
    parts = [parts[0], "and", parts[1]];

    parts.forEach((element) => {
      const speaker = new SpeechSynthesisUtterance();

      speaker.text = element;

      speechSynthesis.speak(speaker);
    });

    speechSynthesis.speak(speaker);
  }
};

const Bingo = () => {
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [numbers, setNumbers] = useState(returnArray());
  const [selection, setSelection] = useState(null);

  const setNumber = () => {
    const float = Math.random() * numbers.length;
    const int = Math.floor(float);
    const target = numbers[int];

    setUsedNumbers([...usedNumbers, target]);

    const filteredNumbers = numbers.filter((num) => num !== target);

    setNumbers(filteredNumbers);
    setSelection(target);
    speaker(target);
  };

  const resetState = () => {
    speaker();
    setUsedNumbers([]);
    setNumbers(returnArray());
    setSelection(null);
  };

  return (
    <section className="bingo">
      <div className="bingo__main">
        <div>
          {selection && (
            <div className="bingo__number">
              <span>{selection}</span>
            </div>
          )}
        </div>

        <div>
          <div className="bingo__actions">
            <button
              className="bingo__button"
              disabled={numbers.length <= 0}
              onClick={setNumber}
            >
              Next Ball
            </button>
            {usedNumbers.length > 0 && (
              <button className="bingo__button" onClick={resetState}>
                Reset Game
              </button>
            )}
          </div>
          <div className="bingo__user-numbers">
            {returnArray().map((num) => (
              <span className={usedNumbers.includes(num) ? `is--active` : ""}>
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bingo;
