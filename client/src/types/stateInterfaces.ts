export interface IAdsFilters {
    q: string;
    categories: string[];
    needsRevision: boolean;
    sortColumn: 'title' | 'createdAt' | 'price';
    sortDirection: 'asc' | 'desc';
    page: number;
}
export interface IAppState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    filters: IAdsFilters;
    setFilters: (newFilters: Partial<IAdsFilters>) => void;
    resetFilters: () => void;

    drafts: Record<string, any>;
    setDraft: (id: string, data: any) => void;
    clearDraft: (id: string) => void;
}