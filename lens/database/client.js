import { openDb } from "./db";

export async function insertRuns(runId, data, parentRunId, executionOrder) {
  const db = await openDb();
  const { lastID } = await db.run(
    `
    INSERT INTO executions (runid, data, parentrunid, executionorder) VALUES (?,?,?,?)
  `,
    runId,
    JSON.stringify(data),
    parentRunId,
    executionOrder
  );
  return lastID;
}

export async function getRunData(runId) {
  const db = await openDb();
  const execution = await db.get(
    `
    SELECT data FROM executions WHERE runid = ?
  `,
    runId
  );
  return JSON.parse(execution.data);
}

export async function updateRunData(runId, data) {
  const db = await openDb();
  const { changes } = await db.run(
    `
    UPDATE executions SET data = ? WHERE runid = ?
  `,
    JSON.stringify(data),
    runId
  );
  return changes;
}

export async function getRootRuns() {
  const db = await openDb();
  const executions = await db.all(`
    SELECT * FROM executions WHERE parentrunid is NULL ORDER BY id DESC
  `);
  return executions;
}

export async function getRunTreeByParentRunId(parentRunId) {
  const db = await openDb();
  const executions = await db.all(
    `
    WITH RECURSIVE
    parent_runs(runid, parentrunid, data, executionorder) AS (
      SELECT runid, parentrunid, data, executionorder FROM executions WHERE runid = ?
      UNION
      SELECT executions.runid, executions.parentrunid, executions.data, executions.executionorder FROM executions
      JOIN parent_runs ON parent_runs.runid = executions.parentrunid
    )
    SELECT * FROM parent_runs ORDER BY executionorder ASC
  `,
    parentRunId
  );
  return executions;
}

// check if the run exists in the database by runId and return true if it does
export async function runExists(runId) {
  const db = await openDb();
  const execution = await db.get(
    `
    SELECT * FROM executions WHERE runid = ?
  `,
    runId
  );
  return execution ? true : false;
}
