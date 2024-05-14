import fetch from 'node-fetch';
const headerBody = {accept: 'application/json', Authorization: `${process.env.ECWID_TOKEN}`};

export const getAll = async () => {
    try {
        const response = await fetch(`${process.env.BASE_URL}`, {
            method: 'GET',
            headers: headerBody
        });
        return await response.json();
    } catch (error) {
        console.log('Service Error: ', error);
        throw error;
    }
};

export const getOne = async (id: number) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/${id}`, {
            method: 'GET',
            headers: headerBody
        });
        return await response.json();
    } catch (error) {
        console.log('Service Error: ', error);
        throw error;
    }
};