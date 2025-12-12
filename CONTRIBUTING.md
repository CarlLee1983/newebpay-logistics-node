# 貢獻指南

感謝您對 NewebPay Logistics Node.js SDK 的興趣！我們歡迎各種形式的貢獻。

## 如何貢獻

### 回報問題

如果您發現了 bug 或有功能建議，請透過 [GitHub Issues](https://github.com/your-username/newebpay-logistics-node/issues) 回報。

在建立 Issue 前，請先搜尋是否已有相關問題。

### 提交 Pull Request

1. **Fork 專案**
   ```bash
   git clone https://github.com/your-username/newebpay-logistics-node.git
   cd newebpay-logistics-node
   ```

2. **建立分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **安裝依賴**
   ```bash
   bun install
   ```
   
   安裝完成後，`simple-git-hooks` 會自動設置 git hooks：
   - **pre-commit**: 自動執行程式碼檢查（`bun run check`）
   - **commit-msg**: 驗證 commit message 格式是否符合規範

4. **進行開發**
   - 遵循現有的程式碼風格
   - 確保通過所有測試
   - 新增必要的測試
   - 更新相關文件

5. **執行測試與檢查**
   ```bash
   # 執行測試
   bun test
   
   # 檢查程式碼風格
   bun run lint
   
   # 自動修復程式碼問題
   bun run check:fix
   ```
   
   **注意**：
   - 在 commit 前，git hooks 會自動執行 `bun run check` 進行程式碼檢查
   - commit message 會自動驗證格式，必須符合 `<type>：[ <scope> ] <subject>` 格式
   - 如果檢查失敗，commit 會被阻止
   - 您可以使用以下方式跳過檢查（不建議）：
     ```bash
     SKIP_SIMPLE_GIT_HOOKS=1 git commit -m "your message"
     ```

6. **提交變更**
   ```bash
   git add .
   git commit -m "feat: 描述您的變更"
   ```

   請遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範：
   - `feat`: 新功能
   - `fix`: Bug 修復
   - `docs`: 文件變更
   - `style`: 程式碼格式（不影響功能）
   - `refactor`: 重構
   - `test`: 測試相關
   - `chore`: 建置或工具變更

7. **推送並建立 Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

   然後在 GitHub 上建立 Pull Request。

## 開發規範

### 程式碼風格

- 使用 TypeScript
- 遵循 Biome 規則（linting 和 formatting）
- 撰寫繁體中文註解

### 測試

- 新增功能時請同時新增測試
- 確保測試覆蓋率不降低
- 測試應該清晰且易於理解

### 文件

- 更新相關的 README 文件
- 新增或更新 API 文件
- 更新 CHANGELOG.md

### Commit Message 格式

請遵循以下格式：

```
<type>：[ <scope> ] <subject>

<body>

<footer>
```

範例：

```
feat: [client] 新增環境配置支援

- 新增 Environment enum
- 支援測試/正式環境切換
- 更新所有 Request 類別以支援環境參數

Closes #123
```

## 問題與討論

如果您有任何問題或想討論功能，歡迎：
- 建立 GitHub Issue
- 參與現有 Issue 的討論

## 授權

透過提交 Pull Request，您同意您的貢獻將在 MIT 授權下發布。

