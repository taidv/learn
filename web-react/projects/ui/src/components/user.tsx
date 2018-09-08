import * as React from 'react';

export interface UserProps {
    id: number;
    name: string;
    isLoading: boolean;
    hasError: boolean;
    refresh: () => void;
}

export const User: React.StatelessComponent<UserProps> = props => {
    return (
        <div>
            <h1>Hello {props.name}!</h1>
            <input type="hidden" name="user" value={props.id} />
            <button onClick={props.refresh}>Refresh</button>
        </div>
    );
};
