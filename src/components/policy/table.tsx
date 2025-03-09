


export default function PrivacyPolicyTable({title, headings, tables}: any) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-md shadow-sm">
                    <thead className="bg-gray-100"><tr>
                        {headings.map((heading: any, index: number) => (
                            <th scope="col" key={index} className="px-6 py-3 text-left text-sm font-medium text-gray-700 tracking-wider">
                                {heading}
                            </th>
                        ))}
                    </tr></thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tables.map((table: any, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{table.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{table.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}