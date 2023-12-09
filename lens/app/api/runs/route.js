import { insertRuns, getRootRuns } from "../../../database/client";

export async function POST(req) {
  const data = await req.json();
  const runId = data.id;
  const parentRunId = data.parent_run_id;
  const executionOrder = data.execution_order;
  const id = await insertRuns(runId, data, parentRunId, executionOrder);
  return Response.json({ message: id });
}

export async function GET() {
  const runs = await getRootRuns();
  runs.forEach((run) => {
    run.data = JSON.parse(run.data);
  });
  return Response.json({ runs });
}
