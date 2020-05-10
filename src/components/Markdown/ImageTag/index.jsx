/*
 * @Author: 柒叶
 * @Date: 2020-04-16 20:08:54
 * @Last Modified by: 柒叶
 * @Last Modified time: 2020-04-16 20:35:46
 */

import React from 'react';
import Zmage from 'react-zmage';

const ImageTag = props => {
  const { src } = props;
  return (
    <Zmage
      src={src}
      style={{ width: '100%' }}
      controller={{
        rotate: false,
        zoom: false,
      }}
    />
  );
};

export default ImageTag;
