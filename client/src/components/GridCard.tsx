import { Badge, Card, CardSection, Image, Stack, Title, Text, Grid, Box, NumberFormatter } from "@mantine/core";
import { Link } from "react-router";
import { whichCategory } from "../utils/whichCategory";

export default function GridCard(props) {

    const { ad } = props;
    return (
        <Link to={`/ads/${ad.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Card
                    shadow="sm"
                    padding='lg'
                    radius='md'
                    withBorder 
                    style={{height: '100%'}}>
                        <CardSection h={180} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Image src="../src/assets/placeholder.webp" alt="placeholder" maw={400} fit="contain"/>
                        </CardSection>
                        <Stack mt={'md'}>
                        <Badge variant="outline" color="gray" radius={"sm"} px={'xs'} py={'xs'} tt={'none'} >
                        {whichCategory(ad.category)}
                        </Badge>
                        <Title order={2} size={'lg'}>{ad.title}</Title>
                        <Text fw={'500'} opacity={'45%'}><NumberFormatter suffix="₽" value={ad.price} thousandSeparator/></Text>
                        {ad.needsRevision === true && (<Badge bg={'#F9F1E6'} c={'#FAAD14'} bdrs={'xs'} tt={'none'} leftSection={
                            <Box style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                backgroundColor: 'currentColor'
                            }} />
                        }>
                            Требует доработок</Badge>)}
                        </Stack>
                    </Card>
                    </Link>
    )
}