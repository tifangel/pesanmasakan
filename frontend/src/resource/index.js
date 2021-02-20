const { defaultAPIURL } = require("../config");
const { get, post } = require("./helper");

export const getWarungList = async (datasearch, datalocation) => 
    {
        const url = `${defaultAPIURL}/cariwarung?title=${datasearch}&location=${datalocation}`
        const response = await get(url)

        return response
    }

export const getAllWarungList = async () => 
    {
        const url = `${defaultAPIURL}/daftarwarung`
        const response = await get(url)

        return response
    }

export const getCategories = async() =>
    {
        const url = `${defaultAPIURL}/categories`
        const response = await get(url)

        return response
    }

export const getWarung = async (id) =>
    {
        const url =`${defaultAPIURL}/daftarwarung/${id}`
        const response = await get(url)

        return response
    }