import nextJest from "next/jest";
import type { Config } from "jest";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    testMatch: [
        "<rootDir>/tests/**/*.test.ts"
    ]
}

export default createJestConfig(config)