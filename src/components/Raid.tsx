import { useRef, useState } from "react"
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import Button from '@mui/material/Button'
import { Modal, Stack, TextareaAutosize, Typography } from "@mui/material"
import { toast } from "react-toastify"

import { apiSetComment, apiSetFavorite, apiSetReTweet } from "utils/twitter"

interface Props {
	data: {
		userId: string,
		raidId: string,
		twitterId: string,
		avatar?: string
		twitterDisplayName?: string
		twitterUserName?: string
		twitterContent?: string
		raidsLeft?: number
		value?: number
		communityName?: string
		raidStatus?: boolean,
		requiredWords: string[],
		ineligibleWords: string[]
	}
}

const Raid = ({ data }: Props) => {
	const [open, setOpen] = useState<boolean>(false)
	const commentRef = useRef<HTMLTextAreaElement>(null);
	const requireWordsPlaceHolder = data.requiredWords?.join(", ")
	const ineligibleWordsPlaceHolder = data.ineligibleWords?.join(", ")

	const closeModal = () => {
		setOpen(false)
	}

	const openModal = () => {
		setOpen(true)
	}

	const setComment = async() => {
		if (commentRef.current?.value === "" || !commentRef.current?.value) {
			toast.warn("Please input the comment correctly.")
			return
		}
		let isInclude = true
		let isExclude = true
		data.requiredWords.forEach((item: string) => {
			if (!commentRef.current?.value.includes(item)) {
				isInclude = false
				return
			}
		})
		data.ineligibleWords.forEach((item: string) => {
			if (commentRef.current?.value.includes(item)) {
				isExclude = false
				return
			}
		})
		if (!isInclude) {
			toast.warn("Please write the comment including required words.")
			return
		}
		if (!isExclude) {
			toast.warn("Please write the comment excluding ineligible words.")
			return
		}
		const result = await apiSetComment({ userId: data.userId, raidId: data.raidId, description: commentRef.current?.value })
		toast.success(result.data.message)
		closeModal()
	}

	const setReNew = async() => {
		const result = await apiSetReTweet({ userId: data.userId, raidId: data.raidId })
		toast.success(result.data.message)
	}

	const setFavorite = async() => {
		const result = await apiSetFavorite({ userId: data.userId, raidId: data.raidId })
		if (result.data.status === 409) {
			toast.warn(result.data.message)
		} else {
			toast.success(result.data.message)
		}
	}

	return (
		<div className="content-wrapper raid-component">
			<div className="raid__header">
				<div className="user-info">
					<img src={data.avatar} alt="" />
					<div>
						<p>{data.twitterDisplayName}</p>
						<span>{data.twitterUserName}</span>
					</div>
				</div>
				<div className="raid-info">
					<div className="community-name">{data.communityName}</div>
					<div className="status">{data.raidStatus ? 'Incomplete' : 'complete'}</div>
				</div>
			</div>
			<div className="raid__body">
				<p>{data.twitterContent}</p>
			</div>
			<div className="raid__footer">
				<div className="button-group">
					<IconButton size="small" sx={{ backgroundColor: 'var(--success)' }} onClick={setFavorite}>
						<FavoriteIcon fontSize="small" sx={{ fill: '#FFF' }} />
					</IconButton>
					<IconButton size="small" sx={{ backgroundColor: 'var(--success)' }} onClick={setReNew}>
						<AutorenewIcon fontSize="small" sx={{ fill: '#FFF' }} />
					</IconButton>
					<Button className="comment" onClick={openModal}>Comment</Button>
				</div>
			</div>

			<Modal open={open} onClose={closeModal}>
				<div className="modal modal__community-info-edit" style={{ width: "fit-content", maxWidth: "none"}} >
					<Typography variant="h6" fontWeight="semi-bold" >Comment
						<Typography variant="caption" >&nbsp;&nbsp;&nbsp;*ineligible words: {ineligibleWordsPlaceHolder}</Typography>
					</Typography>
					<TextareaAutosize
						style={{ width: "400px", height: "200px", border: "1px solid black", borderRadius: "10px", fontSize: "16px", padding: "8px" }}
						placeholder={`required words: ${requireWordsPlaceHolder}`}
						ref={commentRef}
					/>
					<Stack flexDirection="row-reverse" gap={1} marginTop={2}>
						<Button className="btn-gradient" sx={{ width: "fit-content" }} onClick={closeModal}>cancel</Button>
						<Button className="btn-gradient" sx={{ width: "fit-content" }} onClick={setComment}>ok</Button>
					</Stack>
				</div>
			</Modal>
		</div>
	)
}

export default Raid
