export const state = () => ({
    searchResults: null
})


export const mutations = {
    setSearchResultsData(state, data) {
        state.searchResults = data
    },
}


export const getters = {
    getSearchResults: state => state.searchResults
}