import React from 'react';
import Editor from 'react-simple-code-editor';
import { Highlight, Language } from 'prism-react-renderer';

const CodeEditor = () => {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={code => code}
    //   highlight={(code) => highlight(code, languages.js, 'javascript')}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
  );
};

export default CodeEditor;
