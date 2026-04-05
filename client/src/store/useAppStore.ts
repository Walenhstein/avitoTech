import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IAppState } from "../types/stateInterfaces.js";

export const useAppStore = create<IAppState>()(
    persist(
        (set) => ({
            theme: 'light',

            filters: {
                q: '',
                categories: [],
                needsRevision: false,
                sortColumn: 'createdAt',
                sortDirection: 'desc',
                page: 1
            },

            drafts: {},

            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),

            viewMode: 'list',
            setViewMode: (mode) => set({viewMode: mode}),

            setFilters: (newFilters) => set((state) => {
                const isChangeFilter = !newFilters.page

                return {
                    ...state.filters,
                    ...newFilters,
                    page: isChangeFilter ? 1 : (newFilters.page || state.filters.page) 
                }
            }),
           
            resetFilters: () => set((state) => ({
                filters: {
                    ...state.filters,
                    q: '',
                    categories: [],
                    needsRevision: false,
                    page: 1
                }
            })),

            setDraft: (id, data) => set((state) => ({
                drafts: {...state.drafts, [id]: data}
            })),

            clearDraft: (id) => set((state) => {
                const newDrafts = {...state.drafts};
                delete newDrafts[id];
                return {drafts: newDrafts};
            }),
        }),
        {name: 'storageAvito',
        partialize: (state) => ({
            theme: state.theme,
            drafts: state.drafts,
            viewMode: state.viewMode,
        })}
    )
)