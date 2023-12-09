"use client";
import { Fields } from "./Fields";

export function OutputFields({ obj, type }) {
  if (type === "PromptTemplate" || type === "ReActSingleInputOutputParser")
    return <Fields obj={obj.kwargs} />;

  if (type === "ChatPromptTemplate") {
    let a = obj.kwargs.messages.map((item) => ({
      content: item.kwargs.content,
    }));
    return (
      <>
        {a.map((item, i) => (
          <Fields key={i} obj={item} />
        ))}
      </>
    );
  }

  if (type === "ChatOpenAI") {
    let a = obj.generations.flatMap((item) =>
      item.map((item) => ({
        text: item.text,
        finish_reason: item.generation_info.finish_reason,
        type: item.type,
      }))
    );
    return (
      <>
        {a.map((item, i) => (
          <Fields key={i} obj={item} />
        ))}
        <Fields obj={obj.llm_output} />
      </>
    );
  }

  return <Fields obj={obj} />;
}
