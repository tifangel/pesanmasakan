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

export const insertMenu = async(data) =>
    {
        const url = `${defaultAPIURL}/tambahmenu`
        const response = await post(url,data)

        return response
    }

export const editMenu = async(data) =>
    {
        const url = `${defaultAPIURL}/updatemenu`
        const response = await post(url,data)

        return response
    }
    
export const deleteMenu = async(data) =>
    {
        const url = `${defaultAPIURL}/deletemenu`
        const response = await post(url,data)

        return response
    }

export const editProfile = async(data) =>
    {
        const url = `${defaultAPIURL}/editdatawarung`
        const response = await post(url,data)

        return response
    }

export const getOverviewOrder = async(warungId) =>
    {
        const url = `${defaultAPIURL}/overvieworder/${warungId}`
        const response = await get(url)

        return response
    }

export const getOrderSummary = async(warungId) =>
    {
        const url = `${defaultAPIURL}/ordersummary/${warungId}`
        const response = await get(url)
        return response
    }
    
export const insertPesanan = async(data) =>
    {
        const url = `${defaultAPIURL}/tambahorder`
        const response = await post(url,data)

        return response
    }

export const getPembeli = async(data) =>
    {
        const url = `${defaultAPIURL}/getpembeli`
        const response = await post(url, data)
        return response
    }

export const getPenjual = async(data) =>
    {
        const url = `${defaultAPIURL}/getpenjual`
        const response = await post(url, data)
        return response
    }

export const getCooklist = async(id) => {
    const url = `${defaultAPIURL}/cooklist/${id}`;
    const response = await get(url);
    return response;
}

export const getOrderlistPenjual = async(id) => {
    const url = `${defaultAPIURL}/orderlist/penjual/${id}`;
    const response = await get(url);
    return response;
}

export const getHistoryPenjual = async(id) => {
    const url = `${defaultAPIURL}/history/penjual/${id}`;
    const response = await get(url);
    console.log(response);
    return response;
}

export const updateOrder = async(data) => {
    const url = `${defaultAPIURL}/updateorder`;
    const response = await post(url, data);
    return response;
}

export const updateOrderMenu = async(data) => {
    const url = `${defaultAPIURL}/updateordermenu`;
    const response = await post(url, data);
    return response;
}

export const getPesananPembeli = async(username) =>
    {
        const url =`${defaultAPIURL}/orderlist/pembeli/${username}`
        const response = await get(url)

        return response
    }
