export type Callback = () => void;

//>: Not Completed we need to infer the return type:
// export type GenCallback<T = unknown, K = unknown> = (data?: T) => K extends unknown ? void : K;

export type PartialRequired<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type HTMLElementEvent<T extends Element> = Event & { target: T; currentTarget: T };
