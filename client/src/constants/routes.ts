export const Routes = {
    adsList: '/ads',
    adDetails: (id: string | number) => `/ads/${id}`,
    adEdit: (id: string | number) => `/ads/${id}/edit`
}