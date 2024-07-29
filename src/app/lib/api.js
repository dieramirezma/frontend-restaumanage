import axios from 'axios'

export const fetchSuppliersList = async (AccessToken, limit) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}suppliers/list`,
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

export const fetchCreateSupplier = async (AccessToken, data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}suppliers/create`, data,
      {
        headers: {
          Authorization: AccessToken
        }
      }
    )
    return res.data.data
  } catch (error) {
    if (error.response && error.response.status === 409) return { error: 'Ya existe un proveedor con este correo' }
  }
}

export const fetchEmployeesList = async (AccessToken, limit) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}employees/list`,
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

export const fetchReservationsList = async (AccessToken, limit) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}reservations/list`,
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

export const fetchTablesList = async (AccessToken, limit) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}tables/list`,
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

export const fetchCreateReservation = async (AccessToken, data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}reservations/create`, data,
      {
        headers: {
          Authorization: AccessToken
        }
      }
    )
    return res.data.data
  } catch (error) {
    return error
  }
}

export const fetchUpdateTable = async (AccessToken, id, data) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}tables/update-status/${id}`, data,
      {
        headers: {
          Authorization: AccessToken
        }
      }
    )
    return res.data.data
  } catch (error) {
    return error
  }
}
