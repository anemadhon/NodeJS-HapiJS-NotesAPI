'use strict'

const apiResponse = async (res, httpCode, message, data = null) => {
    const httpSuccess = [200, 201] 
    const status = httpSuccess.includes(httpCode) ? 'success' : 'fail'

    if (data === null) {
        return await res.response({ status, message }).code(httpCode)
    }
    
    if (['index', 'show'].includes(message)) {
        return await res.response({ status, data }).code(httpCode)
    }

    return await res.response({ status, message, data }).code(httpCode)
}

export default { apiResponse }