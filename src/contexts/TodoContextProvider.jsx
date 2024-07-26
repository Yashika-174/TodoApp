import { TodoContext } from './todoContext';

export default function TodoContextProvider({ children, value }) {
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}
