import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

interface Props {
	defaultImage: string
	setFile: (_file: any) => void
}

const ImageDropzone = (props: Props) => {
	const { defaultImage, setFile } = props
	const [preview, setPreview] = useState<any>(null)

	const onDrop = useCallback((acceptedFiles: any) => {
		if (acceptedFiles[0] === undefined) {
			toast.error('Please select vaild image')
			return
		}
		if (acceptedFiles[0].size > 5 * 1024 * 1024) {
			toast.error('Please upload image smaller than 5MB')
			return
		}
		setPreview(URL.createObjectURL(acceptedFiles[0]))
		setFile(acceptedFiles[0])
	}, []) //eslint-disable-line

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png'],
		},
		onDrop,
	})

	return (
		<div {...getRootProps()} className="image-dropzone">
			<input {...getInputProps()} />
			<img src={preview || defaultImage} alt="" />
		</div>
	)
}

export default ImageDropzone
