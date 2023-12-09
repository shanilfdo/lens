"use client";
import { Fields } from "./Fields";

export function InputFields({ obj, type }) {
  if (type === "ChatOpenAI" && Array.isArray(obj.messages)) {
    let a = obj.messages.flatMap((item) =>
      item.map((item) => ({ content: item.kwargs.content }))
    );
    return (
      <>
        {a.map((item, i) => (
          <Fields key={i} obj={item} />
        ))}
      </>
    );
  }
  if (type === "ReActSingleInputOutputParser") {
    return <Fields obj={obj.input} />;
  }

  return <Fields obj={obj} />;
}
