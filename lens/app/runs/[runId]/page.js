"use client";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { fetcher } from "../../../utils/fetcher";
import { RunContext } from "../../../utils/RunContext";
import { RunData } from "../../components/RunData";
import { RunTree } from "../../components/RunTree";

export default function Run({ params: { runId } }) {
  const { data, error } = useSWR(`/api/runs/${runId}`, fetcher);
  const [run, setRun] = useState({});
  useEffect(() => {
    if (data) setRun(data.data[0].data);
  }, [data]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <RunContext.Provider value={{ run, setRun }}>
      <main className="flex min-h-screen flex-row">
        <div className="w-30 flex-none min-h-screen flex-row py-4 px-2">
          <div className="w-full  border border-gray-200 rounded-lg shadow bg-body dark:border-gray-700">
            <h2 className="px-4 py-2 border-b border-gray-200 rounded-t-lg bg-header dark:border-gray-700 dark:bg-header">
              Run
            </h2>
            <div className="px-4 py-2">
              <RunTree runs={data.data} />
            </div>
          </div>
        </div>
        <div className="w-70 flex-auto overflow-y-auto max-h-screen pt-4 py-4 bg-editor min-h-screen">
          <RunData />
        </div>
      </main>
    </RunContext.Provider>
  );
}
