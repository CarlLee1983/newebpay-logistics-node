#!/usr/bin/env bun
/**
 * 驗證 commit message 格式
 * 格式：<type>：[ <scope> ] <subject>
 */
const commitMsgFile = process.argv[2];
if (!commitMsgFile) {
    console.error("❌ 未提供 commit message 文件");
    process.exit(1);
}

const fs = await import("node:fs");
const commitMsg = fs.readFileSync(commitMsgFile, "utf-8");

// 允許的 type
const allowedTypes = [
    "feat",
    "fix",
    "docs",
    "style",
    "refactor",
    "perf",
    "test",
    "chore",
    "revert",
    "build",
    "3rd",
];

// 取得第一行（subject line）
const lines = commitMsg.split("\n");
const subjectLine = lines[0].trim();

// 驗證格式：<type>：[ <scope> ] <subject>
// 或：<type>: <subject> (scope 是可選的)
// 支援多行 commit message（第一行是 subject，後面可以是 body）
const pattern = new RegExp(
    `^(${allowedTypes.join("|")})(\\s*:\\s*(\\[\\s*[^\\]]+\\s*\\])?\\s+.+|\\s+.+)$`
);

if (!pattern.test(subjectLine)) {
    console.error("❌ Commit message 格式錯誤！");
    console.error("");
    console.error("請遵循格式: <type>：[ <scope> ] <subject>");
    console.error("");
    console.error("允許的 type:");
    for (const type of allowedTypes) {
        console.error(`  - ${type}`);
    }
    console.error("");
    console.error("範例:");
    console.error("  feat: [web] implementation login api function");
    console.error("  fix: 修復驗證錯誤");
    console.error("  docs: 更新 README");
    console.error("");
    console.error("您的 commit message (第一行):");
    console.error(`  ${subjectLine}`);
    process.exit(1);
}

// 驗證通過
console.log("✅ Commit message 格式正確");
