import { beforeAll, test, vi } from "vitest";
import { mockIPC } from "@tauri-apps/api/mocks"
import { randomFillSync } from "crypto";
import { invoke } from "@tauri-apps/api/core";

beforeAll(() => {
    Object.defineProperty(window, 'crypto', {
        value: {
            // @ts-ignore
            getRandomValues: (buffer) => {
                return randomFillSync(buffer);
            }
        }
    })
})

test("Invoke create a product", async () => {
    mockIPC((cmd, args) => {
        if (cmd === "create_product") {
            return ((product: any) => {
                return product
            })
        }
    })

    // @ts-ignore
    const spy = vi.spyOn(window.__TAURI_INTERNALS__, "invoke");
})