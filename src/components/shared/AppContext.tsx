import { createContext } from "react";
import { Handlers, State } from "../../App";

export type AppContextType = {
    state: State;
    handlers: Handlers;
};

export const AppContext = createContext({
    state: {},
    handlers: {},
} as AppContextType);

// NOTE:
// - For future noob, like me, on why createAppContextValue is exported
// - yet no file seems to be importing it
// - this is used internally by the AppContext (React context object)
// - to create the context value to consuming components
// - via useContext hook. Stay curious.
export const createAppContextValue = (
    state: State,
    handlers: Handlers,
): AppContextType => ({
    state,
    handlers,
});
