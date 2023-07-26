import { Card, CardContent, CardHeader, CardMedia, Stack, Chip } from '@mui/material';

function CardCharacter({name, specie, image, status, gender}) {
    return (
        <Card  sx={{borderRadius: '2rem'}}>
            <CardHeader
            title={name}
            subheader={specie}
            />
            <CardMedia
                component="img"
                image={image}
            />
            <CardContent>
                <Stack direction="row" justifyContent='center' spacing={2}>
                <Chip label={status} />
                <Chip label={gender} />
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CardCharacter;