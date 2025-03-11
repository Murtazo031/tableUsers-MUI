import { createSlice } from "@reduxjs/toolkit";
import profil from "../../../../assets/img/Avatar.png";

const usersSlice = createSlice({
  name: "users",
  initialState:{ 
    data:[
    {
      id: 1,
      avatar: profil,
      name: "Jacob Jones",
      email: "jackson.graham@example.com",
      city: "Dushanbe",
      status: false,
      phone: "888999200",
    },
    {
      id: 2,
      avatar: profil,
      name: "Jenny Wilson",
      email: "jessica.hanson@example.com",
      city: "Kulob",
      status: true,
      phone: "888999111",
    },
  ],
  close : null
},
  reducers: {
    changeStatus: (state, action) => {
      const user = state.data.find((user) => user.id === action.payload);
      if (user) {
        user.status = !user.status;
      }
    },
    deleteUser : (state,action)=> {      
      state.data = state.data.filter((user)=>user.id!== action.payload);
    },
    editUser: (state, action) => {
      state.data = state.data.map((user) =>
        user.id === action.payload.id
          ? { ...user, ...action.payload }
          : user
      );
    },
    addUser: (state, action) => {
      state.data = [...state.data, action.payload];
    } ,
    searchByName: (state, action) => {
      state.filteredData = state.data.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    selectByCity : (state,action) => {
      state.filteredData = state.data.filter((user)=>
      user.city.includes(action.payload))
    },
    selectByStatus : (state,action) => {      
      state.filteredData = state.data.filter((user)=>
      user.status.toString().includes(action.payload))
    }
    
  },
});

export const { changeStatus,deleteUser, close , editUser, addUser,searchByName,selectByCity,selectByStatus} = usersSlice.actions;
export default usersSlice.reducer;
    