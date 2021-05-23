import wasiBindings from "@wasmer/wasi/lib/bindings/node";
import { WASI } from "@wasmer/wasi";
import { Client } from "discord.js";
import { getCommands } from "../db";

let wasi = new WASI({
  args: [],
  env: {},
  bindings: {
    ...wasiBindings,
  },
});

let machines: Map<string, WebAssembly.Instance> = new Map();

export default async (client: Client) => {
  const commands = await getCommands();
  await Promise.all(
    commands.map(async ({ name, wasm }) => {
      console.log(name);
      const oldMachine = machines.get(name);
      if (oldMachine) {
        const stopOldMachine = oldMachine.exports["stop"];
        if (typeof stopOldMachine === "function") {
          stopOldMachine();
        }
        machines.delete(name);
      }
      const module = await WebAssembly.compile(wasm);
      const instance = await WebAssembly.instantiate(module);

      machines.set(name, instance);
      wasi.start(instance);
    })
  );
};
