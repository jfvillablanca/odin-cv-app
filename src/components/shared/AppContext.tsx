import { createContext } from "react";
import { State } from "../../App";

export type AppContextType = {
    state: State;
    handleFormInput: (event: React.SyntheticEvent) => void;
    handleOnClickFormField: (dataName: string) => void;
    handleOnBlurFormField: (dataName: string) => void;
    handleOnClickDeleteField: (dataName: string) => void;
    toggleDocumentMode: () => void;
}

export const AppContext = createContext({
    state: {},
    handleFormInput: (_: React.SyntheticEvent) => void 0,
    handleOnClickFormField: (_: string) => void 0,
    handleOnBlurFormField: (_: string) => void 0,
    handleOnClickDeleteField: (_: string) => void 0,
    toggleDocumentMode: () => void 0,
} as AppContextType);

export const createAppContextValue = (
    state: State, 
    handleFormInput: (event: React.SyntheticEvent) => void,
    handleOnClickFormField: (dataName: string) => void,
    handleOnBlurFormField: (dataName: string) => void,
    handleOnClickDeleteField: (dataName: string) => void,
    toggleDocumentMode: () => void,
): AppContextType => ({
  state,
  handleFormInput: handleFormInput,
  handleOnClickFormField: handleOnClickFormField,
  handleOnBlurFormField: handleOnBlurFormField,
  handleOnClickDeleteField: handleOnClickDeleteField,
  toggleDocumentMode: toggleDocumentMode,
});
