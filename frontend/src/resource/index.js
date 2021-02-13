const { defaultAPIURL } = require("../config");
const { get, post } = require("./helper");

export const getWarungList = async (data) => 
    {
        const url = `${defaultAPIURL}/cariwarung?title=${data}`
        const response = await get(url)

        return response
    }

export const getAllWarungList = async () => 
    {
        const url = `${defaultAPIURL}/daftarwarung`
        const response = await get(url)

        return response
    }