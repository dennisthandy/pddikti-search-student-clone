import { createContext, useReducer } from "react";

interface Props {
  children: JSX.Element;
}

interface StateType {
  university: {
    data: [];
    loading: boolean;
    error: boolean;
  };
  students: {
    data: [];
    loading: boolean;
    error: boolean;
  };
  studentQuery: {
    nama: string;
    nipd: string;
    pt: string;
    prodi: string;
  };
  openDropdown: boolean;
}

type ActionType =
  | { type: "SET_STUDENTS_DATA"; payload: [] }
  | { type: "SET_STUDENTS_LOADING"; payload: boolean }
  | { type: "SET_STUDENTS_ERROR"; payload: boolean }
  | { type: "SET_UNIVERSITY_DATA"; payload: [] }
  | { type: "SET_UNIVERSITY_LOADING"; payload: boolean }
  | { type: "SET_UNIVERSITY_ERROR"; payload: boolean }
  | {
      type: "SET_STUDENT_QUERY";
      payload: { nama: string; nipd: string; pt: string; prodi: string };
    }
  | { type: "SET_OPEN_DROPDOWN"; payload: boolean };

const initialState: StateType = {
  students: {
    data: [],
    loading: false,
    error: false,
  },
  university: {
    data: [],
    loading: false,
    error: false,
  },
  studentQuery: { nama: "", nipd: "", pt: "", prodi: "" },
  openDropdown: false,
};

const initialDispatch: React.Dispatch<ActionType> = () => initialState;

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_STUDENTS_DATA": {
      return {
        ...state,
        students: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };
    }
    case "SET_STUDENTS_LOADING": {
      return {
        ...state,
        students: {
          ...state.students,
          loading: action.payload,
        },
      };
    }
    case "SET_STUDENTS_ERROR": {
      return {
        ...state,
        students: {
          data: [],
          loading: false,
          error: action.payload,
        },
      };
    }
    case "SET_UNIVERSITY_DATA": {
      return {
        ...state,
        university: {
          data: action.payload,
          loading: false,
          error: false,
        },
      };
    }
    case "SET_UNIVERSITY_LOADING": {
      return {
        ...state,
        university: {
          ...state.university,
          loading: action.payload,
        },
      };
    }
    case "SET_UNIVERSITY_ERROR": {
      return {
        ...state,
        university: {
          data: [],
          loading: false,
          error: action.payload,
        },
      };
    }
    case "SET_STUDENT_QUERY": {
      return {
        ...state,
        studentQuery: action.payload,
      };
    }
    case "SET_OPEN_DROPDOWN": {
      return {
        ...state,
        openDropdown: action.payload,
      };
    }
    default: {
      throw new Error();
    }
  }
}

export const Context = createContext({
  state: initialState,
  dispatch: initialDispatch,
});

export function AppContextProvider({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
    reducer,
    initialState
  );
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}
