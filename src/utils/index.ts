import { toast } from 'react-toastify'

export const shortenAddress = (address: string | undefined) => {
	if (address) {
		return address.slice(0, 5) + '...' + address.slice(-4)
	}
	return ''
}

export const convertToBase64 = (file: any) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.readAsDataURL(file)
		fileReader.onload = () => {
			resolve(fileReader.result)
		}
		fileReader.onerror = (error) => {
			reject(error)
		}
	})
}

export const errorToast = (err: any) => {
	console.log(err)
	toast.error(err?.response?.data?.message || err?.data?.message || err?.message)
}

export const removeSpaceAndSplit = (arg: string) => {
	const _words = arg.replaceAll(' ', '').split(',')
	if (arg[arg.length - 1] === ',') _words.pop()

	const words = _words.filter((word) => word !== '')

	return words
}

export const saveToLocalStorage = (flag: string, data: any) => {
	const jsonString = JSON.stringify(data)
	localStorage.setItem(flag, jsonString)
}

export const getFromLocalStorage = (flag: string) => {
	return JSON.parse(localStorage.getItem(flag) as string)
}