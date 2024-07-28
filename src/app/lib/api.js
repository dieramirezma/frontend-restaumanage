import axios from 'axios'

export const fetchSuppliersList = async (AccessToken) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}suppliers/list`,
    {
      headers: {
        Authorization: AccessToken
      }
    }
  )
  return res.data.data
}

export const fetchInventoryList = async (AccessToken, limit) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}inventories/list`,
    {
      headers: {
        Authorization: AccessToken
      },
      params: {
        limit
      }
    }
  )
  return res.data.data
}

export const fetchCreateInventory = async (AccessToken, data) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}inventories/create`, data,
    {
      headers: {
        Authorization: AccessToken
      }
    }
  )
  return res.data.data
}
