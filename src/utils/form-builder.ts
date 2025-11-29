import { BaseRequest } from "../requests/base.request.js";

export class FormBuilder {
  public build(
    request: BaseRequest,
    options: { withScript?: boolean } = { withScript: true }
  ): string {
    const payload = request.getPayload();
    const url = request.getUrl();

    let html = `<form id="newebpay-form" action="${url}" method="post">`;

    for (const [key, value] of Object.entries(payload)) {
      html += `<input type="hidden" name="${key}" value="${value}">`;
    }

    html += '<button type="submit">Submit</button>';
    html += "</form>";

    if (options.withScript) {
      html +=
        '<script>document.getElementById("newebpay-form").submit();</script>';
    }

    return html;
  }
}
