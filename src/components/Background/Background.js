import React from 'react';

import { BackgroundImg } from './style';

const Background = ({ children }) => {
    return (
        <BackgroundImg>
            {children}
        </BackgroundImg>
    );
};

export default Background;