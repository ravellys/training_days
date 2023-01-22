import axios from "axios";

const USER_DEFAULT = "ravellys";
const API_URL = `https://x7xed6myytwuxdimthkufflm6q0iwomk.lambda-url.us-east-1.on.aws/`;
const headers = {
    'access-control-allow-Origin': '*',
    'Content-Type': 'application/json'
}
const generateApiUrl = (method, value, user) => {
    user = user ? user : USER_DEFAULT
    let url = `${API_URL}?user=${user}&method=${method}`
    if (method !== 'get') {
        url = `${url}&value=${value}`
    }
    return url
}

export const fetchData = async (setSelectedDates, user) => {
    try {
        const result = await axios.get(generateApiUrl('get', undefined, user), {
            headers: headers
        });
        const data = {};
        for (const [year, dates] of Object.entries(result.data)) {
            data[year] = new Set(dates);
        }
        setSelectedDates(data);
    } catch (error) {
        console.log(error);
    }
};

export const insertDate = async (value, user) => {
    try {
        await axios.get(generateApiUrl('insert', value, user), {
            headers: headers
        });
    } catch (error) {
        console.log(error);
    }
};


export const deleteDate = async (value, user) => {
    try {
        await axios.get(generateApiUrl('delete', value, user), {
            headers: headers
        });
    } catch (error) {
        console.log(error);
    }
};