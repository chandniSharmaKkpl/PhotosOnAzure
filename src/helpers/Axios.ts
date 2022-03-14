/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import {BASE_URL} from '../Redux-api/endPoints';

// export const BASE_URL = 'https://staging.2excel.com.au/onlinephoto/api/v1.0'

export async function Axios(
	method: any,
	url: string,
	body: any,
	callback: any,
	headers?: any
) {

	if (method !== 'GET') {
		await axios({
			method,
			url: `${BASE_URL}${url}`,
			data: body,
			headers: {
				...headers
			}
		})
			.then((res: any) => {
				if (res.status >= 200 && res.status < 300) {
					callback(res)
				}
			})
			.catch((e) => {
				return Promise.reject(e.response)
			})
	} else {
		await axios({
			method,
			url: `${BASE_URL}${url}`,
			params: body,
			headers: {
				...headers
			}
		})
			.then((res: any) => {
				if (res.status >= 200 && res.status < 300) {
					callback(res)
				}
			})
			.catch((e) => {
				return Promise.reject(e.response)
			})
	}
}
