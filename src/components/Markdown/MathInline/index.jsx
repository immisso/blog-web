/*
 * @Author: 柒叶
 * @Date: 2020-04-17 14:03:03
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-18 06:20:44
 */

import React from 'react';
import MathJax from 'react-mathjax';

const MathInline = props => {
  return <MathJax.Node formula={props.value} inline />;
};

export default MathInline;
