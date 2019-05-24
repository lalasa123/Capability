import React from 'react';
import Menu from './components/menu';

export const Layout = (props) => {
    return (
        <div>
            <Menu />
            {props.children}
        </div>
    )
}
