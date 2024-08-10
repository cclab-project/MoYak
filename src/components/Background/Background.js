import React from 'react';

import {
    BackgroundDef,
    BackgroundWithWhite
} from './style';

export const Background = ({ children }) => {
    return (
        <BackgroundDef>
            {children}
        </BackgroundDef>
    );
};

export const BackgroundWhite = ({ children }) => {
    return (
        <BackgroundWithWhite>
            {children}
        </BackgroundWithWhite>
    );
};