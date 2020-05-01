import { useState, useEffect } from 'react'

export default httpClient => {
    const [error, setError] = useState(null)


    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null)
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err)
    });

    useEffect(() => {
        //cleanup funkcija
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
        //kad se mjenjaju ova 2 dependency onda uradi cleanup?
    }, [reqInterceptor, resInterceptor])

    const errorConfirmedHandler = () => {
        setError(null);
    }
    //vratimo error objekat i funkciju kojom ocistimo error
    return [error, errorConfirmedHandler]

}