type Action = {
    type: string;
    meta?: any;
    payload: any;
    error?: boolean;
};

export { Action };
