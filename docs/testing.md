# Testing

Vitest runs the project's unit tests in a Node environment. Tests are discovered
automatically in files named `*.test.ts`, `*.spec.ts`, and their TSX equivalents.
The `@/` import alias resolves to the project root, matching the application.

## Commands

- `yarn test`: run all tests once; suitable for CI.
- `yarn test:watch`: rerun affected tests while developing.
- `yarn test components/dome-geometry.test.ts`: run one test file.

## Adding Tests

Keep tests beside the code they exercise and import `test`, `describe`, and
`expect` from `vitest` as needed. Existing Node assertions remain supported.

```ts
import { expect, test } from "vitest"
import { clamp } from "@/components/dome-geometry"

test("clamps values to the upper bound", () => {
	expect(clamp(12, 0, 10)).toBe(10)
})
```

The current suite covers dome geometry and gesture cancellation. It does not
verify browser scrolling, rendering, or real touch interactions.

For future React component tests, add React Testing Library and a DOM environment
such as jsdom. For end-to-end workflows and touch interactions, add Playwright.
Those dependencies are intentionally not installed yet. Async Server Components
should be tested through end-to-end workflows rather than this unit-test setup.