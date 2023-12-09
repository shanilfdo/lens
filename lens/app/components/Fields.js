"use client";

function isObject(obj) {
  return obj === Object(obj);
}

export function Fields({ obj }) {
  return (
    <>
      {obj && (
        <ol className="ml-4">
          {Object.keys(obj).map((key) => (
            <li className="" key={key}>
              <span className="text-green-600">{key} : </span>
              {isObject(obj[key]) ? (
                <Fields obj={obj[key]} />
              ) : (
                <span className="text-cyan-500">{obj[key]}</span>
              )}
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
