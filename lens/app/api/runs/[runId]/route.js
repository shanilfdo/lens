import {
  getRunData,
  updateRunData,
  getRunTreeByParentRunId,
  runExists,
} from "../../../../database/client";

async function updateData(runId, data, retryCount = 1) {
  const exists = await runExists(runId);
  if (exists) {
    let previousData = await getRunData(runId);
    const newData = { ...previousData, ...data };
    await updateRunData(runId, newData);
  } else if (retryCount < 6) {
    await new Promise((resolve) => setTimeout(resolve, retryCount * 1000));
    await updateData(runId, data, retryCount + 1);
  } else {
    console.log("Maximum retry count (5) reached. Unable to update data.");
  }
}

export async function PATCH(req, { params: { runId } }) {
  const data = await req.json();
  updateData(runId, data);
  return Response.json({ message: "success" });
}

export async function GET(req, { params: { runId } }) {
  const runs = await getRunTreeByParentRunId(runId);
  const data = transformRunsArrayIntoTree(runs);
  return Response.json({ data });
}

function transformRunsArrayIntoTree(runs) {
  const runsById = runs.reduce((acc, run) => {
    run.children = [];
    run.data = JSON.parse(run.data);
    acc[run.runid] = run;
    return acc;
  }, {});
  const rootRuns = [];
  runs.forEach((run) => {
    if (run.parentrunid) {
      const parent = runsById[run.parentrunid];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(run);
    } else {
      rootRuns.push(run);
    }
  });
  return rootRuns;
}
