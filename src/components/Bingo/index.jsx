const { useState } = require("react");

const returnArray = () => Array.from({ length: 10 }, (value, key) => key + 1);

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
  };

  return (
    <section>
      {selection && <div>{selection}</div>}
      {numbers.length > 0 ? (
        <button onClick={setNumber}>Pick a Number!</button>
      ) : (
        "Game Over"
      )}
      <div>{usedNumbers.map((i) => i).join(", ")}</div>
    </section>
  );
};

export default Bingo;
