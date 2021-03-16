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

export const getMenuList = async (datamenu) => 
    {
        const url = `${defaultAPIURL}/carimenu?title=${datamenu}`
        const response = await get(url)

        return response
    }

export const getAllMenuList = async() =>
    {
        const url = `${defaultAPIURL}/daftarmenu`
        const response = await get(url)

        return response
    }
    
export const getMenuListByWarungId = async(warungId) =>
    {
        const url = `${defaultAPIURL}/daftarmenu?id_warung=${warungId}`
        const response = await get(url)

        return response
    }

export const getDaysbyMenuId = async(menuid) =>
    {
        const url = `${defaultAPIURL}/daftarharimenu?id=${menuid}`
        const response = await get(url)

        return response
    }