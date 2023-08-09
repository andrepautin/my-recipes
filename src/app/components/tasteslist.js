export default function TastesList({ tastes }) {
  return (
    <div>
      <h1 className="text-xl ml-3">Tastes</h1>
      <ul className="list-disc ml-10">
        {tastes.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
