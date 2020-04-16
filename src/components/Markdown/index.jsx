/*
 * @Author: 柒叶
 * @Date: 2020-04-16 06:32:48
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-16 06:46:31
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

const Markdown = props => {
  const { markdown } = props;
  return (
    <ReactMarkdown
      source={markdown}
      escapeHtml={false}
      renderers={{
        code: CodeBlock,
      }}
    ></ReactMarkdown>
  );
};

export default Markdown;
