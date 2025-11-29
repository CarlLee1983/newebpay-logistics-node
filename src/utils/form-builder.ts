import { BaseRequest } from "../requests/base.request.js";

/**
 * Utility class for building HTML forms for NewebPay requests.
 */
export class FormBuilder {
  /**
   * Builds an HTML form for the given request.
   *
   * @param request - The request object.
   * @param options - Options for form generation.
   * @param options.withScript - Whether to include a script to auto-submit the form. Defaults to true.
   * @returns The HTML string of the form.
   */
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
