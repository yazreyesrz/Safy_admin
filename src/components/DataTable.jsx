export default function DataTable({ headers, rows }) {
  return (
    <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
          {headers.map((header, i) => (
            <th key={i} className="px-4 py-2 border-b">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2 border-b">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
