import axios from "axios";

const USER = "ravellys";
const API_URL = `https://x7xed6myytwuxdimthkufflm6q0iwomk.lambda-url.us-east-1.on.aws/?user=${USER}`;
const headers = {
    'access-control-allow-Origin': '*',
    'Content-Type': 'application/json'
}
const generateApiUrl = (method, value) => {
    let url = `${API_URL}&method=${method}`
    if (method !== 'get') {
        url = `${url}&value=${value}`
    }
    return url
}

export const fetchData = async (setSelectedDates) => {
    try {
        const result = await axios.get(generateApiUrl('get'), {
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

export const insertDate = async (value) => {
    try {
        await axios.get(generateApiUrl('insert', value), {
            headers: headers
        });
    } catch (error) {
        console.log(error);
    }
};


export const deleteDate = async (value) => {
    try {
        await axios.get(generateApiUrl('delete', value), {
            headers: headers
        });
    } catch (error) {
        console.log(error);
    }
};