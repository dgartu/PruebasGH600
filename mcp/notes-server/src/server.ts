// mcp/notes-server/src/server.ts
// MCP server con dos tools: list_notes (sin secretos) y read_note (id explícito).
// Por diseño NO exposeamos write tools. El agente puede leer, nunca modificar.
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import Database from "better-sqlite3";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.NOTES_DB ?? resolve(here, "..", "notes.db");
const db = new Database(dbPath, { readonly: true, fileMustExist: true });

const server = new Server(
  { name: "notes-server", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_notes",
      description:
        "Lista los títulos de las notas no-secretas. Devuelve id y title.",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "read_note",
      description:
        "Lee el body de una nota por id. Tira error si la nota está marcada como secreta.",
      inputSchema: {
        type: "object",
        properties: { id: { type: "integer" } },
        required: ["id"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;

  if (name === "list_notes") {
    const rows = db
      .prepare("SELECT id, title FROM notes WHERE is_secret = 0")
      .all();
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
    };
  }

  if (name === "read_note") {
    const id = Number((args as { id?: number }).id);
    const row = db
      .prepare("SELECT id, title, body, is_secret FROM notes WHERE id = ?")
      .get(id) as { id: number; title: string; body: string; is_secret: number } | undefined;

    if (!row) {
      throw new Error(`Note ${id} not found`);
    }
    if (row.is_secret === 1) {
      throw new Error(
        `Note ${id} is marked as secret and cannot be read by the agent.`,
      );
    }
    return {
      content: [
        { type: "text", text: JSON.stringify({ id: row.id, title: row.title, body: row.body }, null, 2) },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

await server.connect(new StdioServerTransport());