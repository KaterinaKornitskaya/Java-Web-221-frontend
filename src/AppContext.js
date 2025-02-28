import { createContext } from "react";

// AppContext - для Provider
// Provider - для глобальних змінних,
// щоб тримати залогіненого юзера
const AppContext = createContext();
// AppContext - це глобальний проект (один на весь обєкт),
// до якого ми можемо звертатися


export default AppContext;