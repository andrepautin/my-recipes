export default function InstructionsList({ instructions }) {
  return (
    <div>
      <h1 className="text-xl ml-3">Instructions</h1>
      <ul className="list-decimal ml-10">
        {instructions.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
