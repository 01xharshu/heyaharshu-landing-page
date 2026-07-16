
<!-- BEGIN:jsx-syntax-rule -->
# Rule: JSX and Syntax Replacement Precision

When using `replace_file_content` or `multi_replace_file_content` in React/JSX files, you MUST ALWAYS ensure that the replacement chunk perfectly preserves the syntactic boundaries (like `return (`, `</>`, closing braces `}`, etc). Never blindly replace the opening or closing of a block without including its equivalent in the replacement string. Double-check your diffs to prevent 'Expression expected' or 'Unexpected token' parsing errors.
<!-- END:jsx-syntax-rule -->
