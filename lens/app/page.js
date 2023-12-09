"use client";
import useSWR from "swr";
import Link from "next/link";
import { formatDate } from "../utils/formatDate";
import { fetcher } from "../utils/fetcher";

const TableRow = ({ run }) => (
  <tr
    className="bg-body hover:bg-background border-y-4 border-background"
    key={run.id}
  >
    <td className="px-6 py-4">{formatDate(run.data.start_time)}</td>
    <td className="px-6 py-4">
      <Link href={`/runs/${run.runid}`}>{run.runid}</Link>
    </td>
    <td className="px-6 py-4">{JSON.stringify(run.data.inputs.input)}</td>
    <td className="px-6 py-4">{JSON.stringify(run.data.outputs?.output)}</td>
    <td className="px-6 py-4">
      <Link href={`/runs/${run.runid}`}>View</Link>
    </td>
  </tr>
);

export default function Home() {
  const { data, error } = useSWR("api/runs", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <table className="table-auto mt-12 overflow-y-auto max-h-screen">
        <thead className="text-sm uppercase bg-header dark:bg-header">
          <tr className="border-y-4 border-background">
            <th className="px-6 py-3 ">Start Time</th>
            <th className="px-6 py-3">Run ID</th>
            <th className="px-6 py-3">Input</th>
            <th className="px-6 py-3">Output</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.runs.map((run, i) => (
            <TableRow key={i} run={run} />
          ))}
        </tbody>
      </table>
    </main>
  );
}
