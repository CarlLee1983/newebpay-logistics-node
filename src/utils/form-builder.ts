import type { BaseRequest } from "../requests/base.request.js";

/**
 * 為 NewebPay 請求建立 HTML 表單的工具類別。
 */
export class FormBuilder {
    /**
     * 轉義 HTML 屬性值，防止 XSS 攻擊。
     *
     * @param value - 要轉義的字串。
     * @returns 轉義後的字串。
     */
    private escapeHtmlAttribute(value: string): string {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;");
    }

    /**
     * 為指定的請求建立 HTML 表單。
     *
     * @param request - 請求物件。
     * @param options - 表單生成選項。
     * @param options.withScript - 是否包含自動提交表單的腳本。預設為 true。
     * @returns 表單的 HTML 字串。
     */
    public build(
        request: BaseRequest,
        options: { withScript?: boolean } = { withScript: true }
    ): string {
        const payload = request.getPayload();
        const url = request.getUrl();

        // 轉義 URL 和屬性值
        const escapedUrl = this.escapeHtmlAttribute(url);

        let html = `<form id="newebpay-form" action="${escapedUrl}" method="post">`;

        for (const [key, value] of Object.entries(payload)) {
            const escapedKey = this.escapeHtmlAttribute(String(key));
            const escapedValue = this.escapeHtmlAttribute(String(value));
            html += `<input type="hidden" name="${escapedKey}" value="${escapedValue}">`;
        }

        html += '<button type="submit">Submit</button>';
        html += "</form>";

        if (options.withScript) {
            html += '<script>document.getElementById("newebpay-form").submit();</script>';
        }

        return html;
    }
}
