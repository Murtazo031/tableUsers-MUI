import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Store/reducers/tableUser/tableUserSlice/tableUserSlice"; // Импортируем наш редюсер
import themeReducer from "./reducers/theme/themeSlice"


export const store = configureStore({
  reducer: {
    users: usersReducer, // Добавляем в store
    theme: themeReducer,
  },
});
