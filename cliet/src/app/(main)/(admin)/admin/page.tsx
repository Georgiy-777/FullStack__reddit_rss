/**
 * The above function is a TypeScript React component for an admin sign-in form that utilizes
 * Material-UI components and React Hook Form for form validation and submission.
 * @param {any} props - The `props` parameter in the `Copyright` component function represents any
 * additional props that may be passed to the component. In this case, it is used to spread these
 * additional props onto the `Typography` component within the `Copyright` component. This allows for
 * flexibility in customizing the `Typography`
 * @returns The code snippet provided is a React functional component named `SignIn` that represents a
 * sign-in form for admin users. It includes form fields for entering a nickname and password, a submit
 * button for signing in, and error handling for required fields. The component also utilizes
 * Material-UI components for styling and form elements.
 */
'use client';
import Logo from '@/components/common/Logo';
import { useLoginAdminMutation } from '@/store/auth/auth.api';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
interface IResponce {
    error: boolean;
    status: number;
    message: string;
}
function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="https://reddit.com">
                REDDIT
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


type Inputs = {
    nickname: string;
    password: string;
};

interface ResponceType {
    token: string;
    nickname: string;
}
export default function SignIn() {
    const router = useRouter();
    const [login] = useLoginAdminMutation();
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            nickname: '', 
            password: '', 
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const res: any = await login({
            nickname: data?.nickname,
            password: data?.password,
        });
        if (res?.data?.message === 'Admin authorized') {
        
          router.push('/');
        }
        reset();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'white' }}>
                    <Logo />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Admin Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 1 }}
                >
                    <Controller
                        rules={{ required: true }}
                        name="nickname"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                id="nickname"
                                label="Nickname"
                                name="nickname"
                                autoComplete="nickname"
                                autoFocus
                            />
                        )}
                    />
                    {errors.nickname && <span>This feld is required</span>}
                    <Controller
                        name="password"
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        )}
                    />
                    {errors.password && <span>Password field is required</span>}

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
                        Sign In
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
