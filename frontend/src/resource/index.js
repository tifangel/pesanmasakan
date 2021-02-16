const { defaultAPIURL } = require("../config");
const { get, post } = require("./helper");

export const getWarungList = async (datasearch, datalocation) => 
    {
        const url = `${defaultAPIURL}/cariwarung?title=${datasearch}&location=${datalocation}`
        const response = await get(url)

        return response
    }

export const getWarungListLimit = async (datasearch) => 
    {
        // const url = `${defaultAPIURL}/cariwarunglimit?title=${datasearch}&location=${datalocation}&offset=${offset}`
        const url = `${defaultAPIURL}/cariwarunglimit`
        const response = await post(url,datasearch)

        return response
    }

export const getAllWarungList = async () => 
    {
        const url = `${defaultAPIURL}/daftarwarung`
        const response = await get(url)

        return response
    }