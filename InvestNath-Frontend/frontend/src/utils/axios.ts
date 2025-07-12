// import axios from 'axios'

// const api= axios.create({
//     baseURL:'http://localhost:8000/api/',
//     withCredentials:false,
// })

// //Automatically attach token

// api.interceptors.request.use(
//     config=>{
//         const token=typeof window !=='undefined' ? localStorage.getItem('access'):null
//         if(token){
//             config.headers.Authorization=`Bearer ${token}`
//         }
//         return config
//     },
//     error=>Promise.reject(error)
// )

// export default api


import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: false,
})

// Automatically attach token to every request
api.interceptors.request.use(
  config => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

export default api
