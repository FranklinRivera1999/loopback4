import axios from 'axios';
const URL = process.env.URL
interface responseData {
  username: string,
  email: string,
  names: string,
  lastname: string,
  dueDate: string,
  role ?: string
}


export const loginService = async (username: string, password: string): Promise<responseData | null> => {
  try {
    let response = await axios({
      method: 'POST',
      url: URL,
      data: {
        username,
        password
      }
    })

    return {
      username: response.data.user.username,
      email: response.data.user.email,
      names: response.data.user.name,
      lastname: response.data.user.lastname,
      dueDate: response.data.user.dueDate
    }
  } catch (error) {
    console.log(error)

    return null
  }


}

