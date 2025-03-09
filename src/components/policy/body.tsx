


export function PolicyBody({no, title, body, points, details}: any) {
    return (
        <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{no}. {title}</h2>
        {body && body.map((item: any, index: number) => (
            <p key={index} className="text-gray-700 mb-2">{item}</p>
        ))}

        {details && details.map((detail: any, index: number) => (
            <div key={index} className="text-gray-700 mb-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{no}.{index+1} {detail.title}</h3>
                <p key={index} className="text-gray-700 mb-1">{detail.body}</p>
                {detail.points && <PolicyPoints points={detail.points} />}
            </div>
        ))}

        {points && <PolicyPoints points={points} />}
        </div>
    );
}

function PolicyPoints({points}: any) {
    return (
        <ul className="ml-5 list-disc list-inside text-gray-700 mb-10">
            {points.map((point: any, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: point }}></li>
            ))}
        </ul>
            // <li>
            //     <span className="font-semibold">Dribbble</span> - Dribbble Holdings Ltd.
            // </li>
    );
}
