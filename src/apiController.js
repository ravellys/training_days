import axios from "axios";

const API_URL = "https://x7xed6myytwuxdimthkufflm6q0iwomk.lambda-url.us-east-1.on.aws/";
const headers = {
    'access-control-allow-Origin': '*',
    'Content-Type': 'application/json'
}
const generateApiUrl = (method, value, user) => {
    let url = `${API_URL}?user=${user}&method=${method}`
    if (value) {
        url = `${url}&value=${value}`
    }
    return url
}

export const fetchUsers = (setUsers) => {
           axios.get(generateApiUrl('get_users', undefined, undefined), {headers: headers})
               .then(response => setUsers(response.data.users))
               .catch(error => console.log(error));
       };

export const fetchData = async (setSelectedDates, user) => {
        axios.get(generateApiUrl('get', undefined, user), {headers: headers})
            .then(response => setSelectedDates(
                Object.fromEntries(Object.entries(response.data).map(([year, dates]) => [year, new Set(dates)])))
            )
            .catch(error => console.log(error))

};

export const insertDate = async (value, user) => {
    axios.get(generateApiUrl('insert', value, user), {headers: headers})
    .catch(error => console.log(error))
};


export const deleteDate = async (value, user) => {
    axios.get(generateApiUrl('delete', value, user), { headers: headers})
       .catch(error => console.log(error))
};