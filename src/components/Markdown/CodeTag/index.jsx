/*
 * @Author: 柒叶
 * @Date: 2020-04-16 06:35:02
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-05-13 16:32:50
 */

import React from 'react'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import SyntaxHighlighter from 'react-syntax-highlighter'

import {
  coy,
  dark,
  funky,
  okaidia,
  twilight,
  solarizedlight,
  tomorrow,
  prism,
  atomDark,
  base16AteliersulphurpoolLight,
  cb,
  darcula,
  duotoneDark,
  duotoneEarth,
  duotoneForest,
  duotoneLight,
  duotoneSea,
  duotoneSpace,
  ghcolors,
  hopscotch,
  pojoaque,
  vs,
  xonokai,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

import {
  docco,
  a11yDark,
  a11yLight,
  agate,
  anOldHope,
  arduinoLight,
  ascetic,
  github,
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
// import {
//   json,
//   jsx,
//   javascript,
//   python,
//   c,
//   sass,
//   scss,
//   go,
//   java,
//   css,
//   sql,
//   cpp,
//   nginx,
//   rust,
//   ruby,
//   php
// } from 'react-syntax-highlighter/dist/esm/languages/prism'

const CodeTag = props => {
  const { value, language } = props
  if (!value) return null
  return (
    <SyntaxHighlighter
      language={language}
      style={github}
      // showLineNumbers={true}
    >
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeTag
