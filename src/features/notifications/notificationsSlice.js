import React from 'react';
import { client } from '../../api/client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fecthNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, {getState}) => {
        const allNotifications = selectAllNotifications(getState())
        const [latestNotification] = allNotifications
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const response = await client.get(
            `fakeApi/notifications?since= ${latestTimestamp}`
        )
        return response.date
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers:{},
    extraReducers(builder){
        builder
            .addcase(fecthNotifications.fulfilled, (state, action) => {
                state.push(...action.payload)
                state.sort((a,b) => b.date.localeCompare(a.date))
            })
    }
})

export default notificationsSlice.reducer;

export const selectAllNotifications = state => state.notifications
