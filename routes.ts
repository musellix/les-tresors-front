export const Routes = {
    HOME: '/',
    ITINERARIES: () => `/itineraries`,
    ITINERARY: (id: number): `/itinerary/${number}` => `/itinerary/${id}`, // Typage explicite
};