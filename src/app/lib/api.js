import axios from 'axios'

export const fetchSuppliersList = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}suppliers/list`,
    {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjhlODk0NmNiYTkxNTFjYWM2OTkyOTMiLCJ1c2VybmFtZSI6ImRpZWdvIiwicm9sZUlkIjoiNjZhNTYwODA5YWI1ZGI0ODNmZGVlYzYyIiwiaWF0IjoxNzIyMTQyODM2LCJleHAiOjE3MjIxNDY0MzZ9.d--t0i4-rDEhMo_7GkVHTzizTuMbY8ctlvXfrQKdopA'
      }
    }
  )
  return res.data.data
}
