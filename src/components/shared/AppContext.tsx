import { createContext } from "react";
import { State } from "../../App";

export type AppContextType = {
    state: State;
    handleFormInput: (event: React.SyntheticEvent, fieldId: string) => void;
    handleOnClickFormField: (fieldId: string) => void;
    handleOnBlurFormField: (fieldId: string) => void;
    handleOnClickDeleteField: (fieldId: string) => void;
    handleOnClickInsertField: (fieldId: string) => void;
    toggleDocumentMode: () => void;
}

export const AppContext = createContext({
    state: {},
    handleFormInput: (_: React.SyntheticEvent, __: string) => void 0,
    handleOnClickFormField: (_: string) => void 0,
    handleOnBlurFormField: (_: string) => void 0,
    handleOnClickDeleteField: (_: string) => void 0,
    handleOnClickInsertField: (_: string) => void 0,
    toggleDocumentMode: () => void 0,
} as AppContextType);

// NOTE:
// - For future noob, like me, on why createAppContextValue is exported
// - yet no file seems to be importing it
// - this is used internally by the AppContext (React context object)
// - to create the context value to consuming components
// - via useContext hook. Stay curious.
export const createAppContextValue = (
    state: State, 
    handleFormInput: (event: React.SyntheticEvent) => void,
    handleOnClickFormField: (fieldId: string) => void,
    handleOnBlurFormField: (fieldId: string) => void,
    handleOnClickDeleteField: (fieldId: string) => void,
    handleOnClickInsertField: (fieldId: string) => void,
    toggleDocumentMode: () => void,
): AppContextType => ({
  state,
  handleFormInput: handleFormInput,
  handleOnClickFormField: handleOnClickFormField,
  handleOnBlurFormField: handleOnBlurFormField,
  handleOnClickDeleteField: handleOnClickDeleteField,
  handleOnClickInsertField: handleOnClickInsertField,
  toggleDocumentMode: toggleDocumentMode,
});
