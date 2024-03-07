import * as React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useUpdateArticleMutation } from '@/store/article/article.api';

type IArticle = {
    title: string;
    link: string;
    pubDate: string;
    author: string;
    content: string;
    contentSnippet: string;
    _id: string;
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '600px',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};
interface UpdateBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    item?: IArticle;
}
type Inputs = {
    title: string;
    author: string;
    content: string;
    link: string;
};

export default function UpdateBookModal({
    isOpen,
    onClose,
    item,
}: UpdateBookModalProps) {

    const [updateArticle] = useUpdateArticleMutation();
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await updateArticle({
            _id: item?._id,
            id: crypto.randomUUID(),
            content: data?.content || item?.content,
            link: data?.link || item?.link,
            title: data?.title || item?.title,
            author: data?.author || item?.author,
            pubDate: item?.pubDate

        })
        onClose()
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpen}>
                <Box sx={style}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                        Edit this article
                    </h2>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 1 }}
                    >
                        <Controller
                            defaultValue={item?.title}
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="title"
                                    type="text"
                                    label="Title"
                                    name="title"
                                />
                            )}
                        />

                        <Controller
                            name="author"
                            defaultValue={item?.author}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    name="author"
                                    label="Author"
                                    type="text"
                                    id="author"
                                />
                            )}
                        />

                        <Controller
                            name="link"
                            defaultValue={item?.link}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    name="link"
                                    label="Link to source"
                                    type="link"
                                    id="link"
                                />
                            )}
                        />

                        <Controller
                            name="content"
                            defaultValue={item?.content}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    name="content"
                                    label="Content"
                                    type="text"
                                    id="content"
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{
                                borderRadius: '10px',
                                color: '#FF4500',
                                mt: 3,
                                py: 1.5,
                            }}
                        >
                            Save changes
                        </Button>

                        {/* <LoadingButton
                            loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined"
                            >
                            Save
                            </LoadingButton> */}
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}
