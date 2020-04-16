/*
 * @Author: 柒叶
 * @Date: 2020-04-16 06:35:02
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-16 07:25:16
 */

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import {
  coy,
  dark,
  funky,
  okaidia,
  twilight,
  solarizedlight,
  tomorrow,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  json,
  jsx,
  javascript,
  python,
  c,
  sass,
  scss,
  go,
  java,
  css,
  sql,
  cpp,
  nginx,
  rust,
  ruby,
  php,
} from 'react-syntax-highlighter/dist/esm/languages/prism';

const CodeBlock = props => {
  const { value, language } = props;
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      showLineNumbers={true}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
