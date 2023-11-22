import axios from 'axios';

function axiosInterceptor() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location = '/sign-in';
      }
      return Promise.reject(error);
    }
  );
}

export default axiosInterceptor;
