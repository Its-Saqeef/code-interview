export interface RunTestCaseInput {
    id: string;
    input: string;
    expectedOutput: string;
}

export interface RunTestCaseResult {
    id: string;
    input: string;
    expectedOutput: string;
    actualOutput: string | null;
    status: "passed" | "failed" | "error" | "skipped";
    runtimeMs: number | null;
    error: string | null;
}

export interface RunCodeResult {
    passed: number;
    total: number;
    results: RunTestCaseResult[];
    stdout: string[];
    stderr: string[];
}

function normalizeOutput(value: unknown): string {
    if (value === null || value === undefined) return String(value);
    if (typeof value === "number") {
        return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(5)));
    }
    if (typeof value === "boolean") return String(value);
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
}

function parseLiteral(raw: string): unknown {
    const trimmed = raw.trim();

    if (!trimmed) {
        return trimmed;
    }

    try {
        return JSON.parse(trimmed);
    } catch {
        // LeetCode-style literals often use single quotes
        try {
            return JSON.parse(trimmed.replace(/'/g, "\""));
        } catch {
            if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
                return Number(trimmed);
            }
            if (trimmed === "true") return true;
            if (trimmed === "false") return false;
            if (trimmed === "null") return null;
            return trimmed;
        }
    }
}

function splitTopLevel(input: string): string[] {
    const parts: string[] = [];
    let current = "";
    let depth = 0;
    let inString = false;
    let stringChar = "";

    for (let index = 0; index < input.length; index += 1) {
        const char = input[index];

        if (inString) {
            current += char;
            if (char === stringChar && input[index - 1] !== "\\") {
                inString = false;
            }
            continue;
        }

        if (char === "\"" || char === "'") {
            inString = true;
            stringChar = char;
            current += char;
            continue;
        }

        if (char === "[" || char === "{" || char === "(") {
            depth += 1;
            current += char;
            continue;
        }

        if (char === "]" || char === "}" || char === ")") {
            depth -= 1;
            current += char;
            continue;
        }

        if (char === "," && depth === 0) {
            if (current.trim()) {
                parts.push(current.trim());
            }
            current = "";
            continue;
        }

        current += char;
    }

    if (current.trim()) {
        parts.push(current.trim());
    }

    return parts;
}

function parseExampleAssignments(input: string): unknown[] {
    const trimmed = input.trim();
    if (!trimmed) {
        return [];
    }

    // Raw JSON array/object input without assignments
    if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
        return [parseLiteral(trimmed)];
    }

    const values: unknown[] = [];

    for (const part of splitTopLevel(trimmed)) {
        const match = part.match(/^([a-zA-Z_][\w]*)\s*=\s*(.+)$/s);
        if (match) {
            values.push(parseLiteral(match[2].trim()));
            continue;
        }

        values.push(parseLiteral(part));
    }

    return values;
}

function outputsEqual(actual: unknown, expected: unknown): boolean {
    const normalizedActual = normalizeForCompare(actual);
    const normalizedExpected = normalizeForCompare(expected);

    if (
        typeof normalizedActual === "object"
        && normalizedActual !== null
        && typeof normalizedExpected === "object"
        && normalizedExpected !== null
    ) {
        return JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
    }

    return normalizeOutput(normalizedActual) === normalizeOutput(normalizedExpected);
}

function normalizeForCompare(value: unknown): unknown {
    if (Array.isArray(value)) {
        return value.map(normalizeForCompare);
    }

    if (typeof value === "number") {
        return Number.isInteger(value) ? value : Number(value.toFixed(5));
    }

    return value;
}

function extractSolutionFunction(code: string, consoleObj: { log: (...args: unknown[]) => void }) {
    const runner = new Function(
        "console",
        `
        "use strict";
        ${code}

        const __candidates = [
            typeof solution !== "undefined" ? solution : null,
            typeof solve !== "undefined" ? solve : null,
            typeof trap !== "undefined" ? trap : null,
            typeof maxArea !== "undefined" ? maxArea : null,
            typeof twoSum !== "undefined" ? twoSum : null,
            typeof lengthOfLongestSubstring !== "undefined" ? lengthOfLongestSubstring : null,
        ].filter((candidate) => typeof candidate === "function");

        if (__candidates.length > 0) {
            return __candidates[0];
        }

        if (typeof Solution !== "undefined") {
            const instance = new Solution();
            const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
                .filter((name) => name !== "constructor" && typeof instance[name] === "function");
            if (methods.length > 0) {
                return instance[methods[0]].bind(instance);
            }
        }

        throw new Error("Could not find a solution function. Define solution(), trap(), or a Solution class method.");
    `,
    );

    return runner(consoleObj) as (...args: unknown[]) => unknown;
}

export function runJavaScriptAgainstTests(
    code: string,
    testCases: RunTestCaseInput[],
): RunCodeResult {
    const stdout: string[] = [];
    const stderr: string[] = [];
    const results: RunTestCaseResult[] = [];

    const consoleProxy = {
        log: (...args: unknown[]) => {
            stdout.push(args.map((arg) => normalizeOutput(arg)).join(" "));
        },
    };

    let callable: (...args: unknown[]) => unknown;

    try {
        callable = extractSolutionFunction(code, consoleProxy);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to compile code";
        stderr.push(message);

        return {
            passed: 0,
            total: testCases.length,
            results: testCases.map((testCase, index) => ({
                id: testCase.id,
                input: testCase.input,
                expectedOutput: testCase.expectedOutput,
                actualOutput: null,
                status: "error",
                runtimeMs: null,
                error: index === 0 ? message : message,
            })),
            stdout,
            stderr,
        };
    }

    for (const [index, testCase] of testCases.entries()) {
        const startedAt = Date.now();

        try {
            const argValues = parseExampleAssignments(testCase.input);
            const expected = parseLiteral(testCase.expectedOutput);
            const actual = argValues.length > 0 ? callable(...argValues) : callable();
            const actualOutput = normalizeOutput(actual);
            const passed = outputsEqual(actual, expected);

            results.push({
                id: testCase.id,
                input: testCase.input,
                expectedOutput: testCase.expectedOutput,
                actualOutput,
                status: passed ? "passed" : "failed",
                runtimeMs: Date.now() - startedAt,
                error: passed ? null : `Expected ${normalizeOutput(expected)}, got ${actualOutput}`,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Execution failed";
            stderr.push(`Test Case ${index + 1}: ${message}`);
            results.push({
                id: testCase.id,
                input: testCase.input,
                expectedOutput: testCase.expectedOutput,
                actualOutput: null,
                status: "error",
                runtimeMs: Date.now() - startedAt,
                error: message,
            });
        }
    }

    const passed = results.filter((result) => result.status === "passed").length;

    return {
        passed,
        total: results.length,
        results,
        stdout,
        stderr,
    };
}

export function runUnsupportedLanguage(
    language: string,
    testCases: RunTestCaseInput[],
): RunCodeResult {
    return {
        passed: 0,
        total: testCases.length,
        results: testCases.map((testCase) => ({
            id: testCase.id,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: null,
            status: "skipped",
            runtimeMs: null,
            error: `Automatic execution for ${language} is not enabled yet. Switch to JavaScript to run code.`,
        })),
        stdout: [],
        stderr: [`Automatic execution for ${language} is not enabled yet. Switch to JavaScript to run code.`],
    };
}
