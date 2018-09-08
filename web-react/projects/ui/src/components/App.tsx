import * as React from 'react';
import { default as User } from '../containers/user';
import { Hello } from './hello';

export const App: React.StatelessComponent<{}> = () => {
    return (
        <div className="top-wrapper">
            <Hello compiler="TypeScript" framework="React" />
            <User />
        </div>
    );
};
