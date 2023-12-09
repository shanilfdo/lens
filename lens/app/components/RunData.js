"use client";
import { useContext } from "react";
import { RunContext } from "../../utils/RunContext";
import { InputFields } from "./InputFields";
import { OutputFields } from "./OutputFields";

export function RunData() {
  let { run } = useContext(RunContext);

  return (
    <div className="w-full border border-gray-200 rounded-lg shadow dark:border-gray-700">
      <h2 className="px-4 py-2 border-b border-gray-200 rounded-t-lg bg-header dark:border-gray-700 dark:bg-header">
        {run.execution_order} : {run.name}
      </h2>
      <div className="w-full border border-gray-200 rounded-lg shadow bg-body dark:border-gray-700 mt-2">
        <h2 className="px-4 py-2 border-b border-gray-200 rounded-t-lg bg-header dark:border-gray-700 dark:bg-header">
          Input
        </h2>
        <div className="p-2">
          <InputFields obj={run.inputs} type={run.name} />
        </div>
      </div>
      <div className="w-full  border border-gray-200 rounded-lg shadow bg-body dark:border-gray-700 mt-2">
        <h2 className="px-4 py-2 border-b border-gray-200 rounded-t-lg bg-header dark:border-gray-700 dark:bg-header">
          Output
        </h2>
        <div className="p-2">
          <OutputFields obj={run.outputs} type={run.name} />
        </div>
      </div>
    </div>
  );
}
