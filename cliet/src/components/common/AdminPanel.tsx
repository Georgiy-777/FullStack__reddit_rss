/**
 * The code defines a React component for an admin panel form to create new articles with input fields
 * for title, author, content, and link.
 */
'use client';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Grid, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useCreateArticleMutation } from '@/store/article/article.api';
import Button from '@mui/material/Button';

interface IArticle {
    title: string;
    link: string;
    pubDate: string;
    author: string;
    content: string;
    contentSnippet: string;
    id: string;
}


type Inputs = {
    title: string;
    author: string;
    content: string;
    link: string;
};

const AdminPanel = () => {
    const [createArticle] = useCreateArticleMutation();
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            content: '',
            link: '',
            title: '',
            author: '',
        },
    });
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res = await createArticle({
            id: crypto.randomUUID(),
            content: data?.content,
            link: data?.link,
            title: data?.title,
            author: data?.author,
            pubDate: new Date().toISOString(),
        })
    
        reset()
    };

    return (
        <Grid
            item
            xs={12}
            md={4}

        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',

                    borderRadius: '19px',
                    bgcolor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(24px)',
                    maxHeight: 600,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: `0 0 1px rgba(246,99,14, 0.1), 1px 1.5px 2px -1px rgba(246,99,14, 0.15), 4px 4px 12px -2.5px rgba(246,99,14, 0.15)`,
                }}
            >
                <h2 id="unstyled-modal-title" className="modal-title">
                    New article
                </h2>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 1 , width: '100%',px: 3, py: 3}}
                >
                    <Stack flexDirection="column" gap={"3px"}>
                        <Controller
                            name="title"
                            rules={{ required: true }}
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
                        {errors.title && <Typography color="red" fontSize={'13px'} letterSpacing={'1px'}>This field is required</Typography>}
                    </Stack>
                    <Stack flexDirection="column" gap={"3px"}>
                        <Controller
                            name="author"
                            rules={{ required: true }}
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
                        {errors.author && <Typography color="red" fontSize={'13px'} letterSpacing={'1px'}>This field is required</Typography>}
                    </Stack>
                    <Stack flexDirection="column" gap={"3px"}>
                        <Controller
                            name="link"
                            rules={{ required: true }}
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
                        {errors.link && <Typography color="red" fontSize={'15px'} letterSpacing={'1px'}>This field is required</Typography>}
                    </Stack>
                    <Stack flexDirection="column" gap={"3px"}>
                        <Controller
                            name="content"
                            rules={{ required: true }}
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
                        {errors.content && <Typography color="red" fontSize={'13px'} letterSpacing={'1px'}>This field is required</Typography>}
                    </Stack>

                    <Button
                        type="submit"
                        fullWidth      
                        variant="outlined"
                        sx={{ borderRadius: '10px', color: '#FF4500', mt: 3, py: 1.5 }}
                    >
                        Create article
                    </Button>

                </Box>
            </Box>
        </Grid>
    );
};

export default AdminPanel;
