import PrivateApi from '../api/privateApi'

export const loadUser = () => {
    console.log('loading user...');
    return PrivateApi.getUser().then(res => res);
}

export const loadSearches = () => {
    console.log('loading searches...');
    return PrivateApi.getSearches().then(res => res);
}

export const loadReports = () => {
    console.log('loading reports...');
    return PrivateApi.getReports().then(res => res);
}
