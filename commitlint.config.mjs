export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "refactor",
        "style",
        "test",
        "chore",
        "perf",
        "ci",
        "revert",
      ],
    ],
    "subject-case": [0],
    "body-max-line-length": [0],
  },
};
