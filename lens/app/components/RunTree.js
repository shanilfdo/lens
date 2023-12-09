"use client";
import { useContext } from "react";
import { RunContext } from "../../utils/RunContext";

export function RunTree({ runs }) {
  const { setRun } = useContext(RunContext);
  return (
    <ul className="tree">
      {runs.map((run) => (
        <li className="" key={run.runid}>
          <p className="py-2 inline-block" onClick={() => setRun(run.data)}>
            {run.data.execution_order} : {run.data.name}
          </p>
          <RunTree runs={run.children} />
        </li>
      ))}
    </ul>
  );
}
