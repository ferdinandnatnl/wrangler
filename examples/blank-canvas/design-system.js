(function () {
const { createElement: h, useId, useState } = React;

function ChatbotSparkIcon() {
  return h(
    "svg",
    {
      className: "ds-chatbot-input__spark",
      viewBox: "0 0 30 30",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      focusable: "false",
    },
    [
      h("path", { key: "stem", d: "M16.9992 26.9995H12.9995L12.9995 11.0012L9.00625 11.0012L9.00625 7.00103L13.006 7.00103V11.0012L16.9914 11.0012L16.9914 7.00103L20.9911 7.00103L20.9911 11.0012H16.9992L16.9992 26.9995Z", fill: "currentColor" }),
      h("path", { key: "left", d: "M8.99974 15.0002L5 15.0002L5 10.9999H8.99974L8.99974 15.0002Z", fill: "currentColor" }),
      h("path", { key: "right", d: "M25 15.0002L21.0003 15.0002V10.9999L25 10.9999V15.0002Z", fill: "currentColor" }),
      h("path", { key: "top", d: "M16.9992 6.99973H12.9995L12.9995 2.99951L16.9992 2.99951V6.99973Z", fill: "currentColor" }),
    ],
  );
}

function ChatbotSpinner() {
  return h("span", {
    className: "ds-chatbot-input__spinner",
    "aria-hidden": "true",
  });
}

function ChatbotInput({
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  placeholder = "Ask me anything...",
  label = "Chat message",
  submitLabel = "Send message",
  disabled = false,
  loading = false,
  error = false,
  errorMessage = "",
  id,
  name,
  className = "",
  inputProps = {},
  submitIcon,
}) {
  const generatedId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value ?? "") : uncontrolledValue;
  const errorText = typeof error === "string" ? error : errorMessage;
  const isError = Boolean(error || errorMessage);
  const inputId = id || inputProps.id || `chatbot-input-${generatedId.replace(/:/g, "")}`;
  const formId = `${inputId}-form`;
  const errorId = `${inputId}-error`;
  const state = disabled ? "disabled" : loading ? "loading" : isError ? "error" : currentValue ? "filled" : "empty";
  const inputAttributes = { ...inputProps };
  delete inputAttributes.id;
  delete inputAttributes.value;
  delete inputAttributes.defaultValue;
  delete inputAttributes.disabled;
  delete inputAttributes.onChange;

  function handleChange(event) {
    if (!isControlled) {
      setUncontrolledValue(event.target.value);
    }
    onChange?.(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (disabled || loading) {
      return;
    }
    onSubmit?.(currentValue, event);
  }

  return h(
    "div",
    {
      className: ["ds-chatbot-input", className].filter(Boolean).join(" "),
      "data-component": "chatbot-input",
      "data-state": state,
      "aria-busy": loading ? "true" : undefined,
    },
    h(
      "div",
      { className: "ds-chatbot-input__content" },
      h(
        "form",
        {
          id: formId,
          className: "ds-chatbot-input__form",
          onSubmit: handleSubmit,
          noValidate: true,
        },
        h("label", { className: "ds-visually-hidden", htmlFor: inputId }, label),
        h("input", {
          ...inputAttributes,
          id: inputId,
          name,
          type: "text",
          value: currentValue,
          placeholder,
          disabled,
          "aria-label": label,
          "aria-invalid": isError ? "true" : undefined,
          "aria-describedby": errorText ? errorId : undefined,
          onChange: handleChange,
        }),
      ),
      h(
        "button",
        {
          className: "ds-chatbot-input__submit",
          type: "submit",
          form: formId,
          disabled: disabled || loading,
          "aria-label": loading ? "Sending message" : submitLabel,
          title: loading ? "Sending message" : submitLabel,
        },
        loading ? h(ChatbotSpinner) : submitIcon || h(ChatbotSparkIcon),
      ),
    ),
    errorText
      ? h(
          "p",
          {
            className: "ds-chatbot-input__error",
            id: errorId,
            role: "alert",
          },
          errorText,
        )
      : null,
  );
}

window.BlankCanvasDesignSystem = Object.freeze({
  ChatbotInput,
  ChatbotSparkIcon,
});
})();
