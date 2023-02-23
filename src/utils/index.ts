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
