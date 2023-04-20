export const getters = {
    getDestinationBySlug: (state) => (slug) => {
        return state.destinations.find(destination => destination.slug === slug)
    }
}