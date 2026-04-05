import { Badge, Card, Image, Stack, Title, Text, Box, Group, NumberFormatter } from "@mantine/core";
import { Link } from "react-router";
import { whichCategory } from "../utils/whichCategory";

export default function ListCard(props) {

    const { ad } = props;

    return (
        <>
        <Link to={`/ads/${ad.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Card
                    shadow="sm"
                    padding='xs'
                    radius='md'
                    withBorder 
                    style={{height: '132px', display: 'flex', justifyContent: 'center'}}>
                        <Group wrap="nowrap">
                            <Box>
                                <Image src="../src/assets/placeholder.webp" alt="placeholder" w={178}  h={132}/>
                            </Box>
                            <Stack style={{flex: 1}} gap={8}>
                                <Text color="gray" size="xs">{whichCategory(ad.category)}</Text>
                                <Title order={2} size={'md'}>{ad.title}</Title>
                                <Text fw={'500'} opacity={'45%'}><NumberFormatter suffix="₽" value={ad.price} thousandSeparator/></Text>
                                {ad.needsRevision === true && (<Badge bg={'#F9F1E6'} c={'#FAAD14'} bdrs={'xs'} tt={'none'}>Требует доработок</Badge>)}
                        </Stack>
                        </Group>
                    </Card>
                    </Link>
        </>
    )
}