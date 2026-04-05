import { useParams, Link } from "react-router-dom";
import { Routes } from "../constants/routes";
import { Box, Loader, Paper, Title, Text, rem, ActionIcon, NumberFormatter } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { fetchAdById } from "../api/ads";
import  formatDate  from "../utils/formatDate"
import { IconArrowAutofitLeft } from "@tabler/icons-react";

export function AdDetailsPage() {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['ad', id],
        queryFn: () => fetchAdById(id),
        enabled: !!id
    });
    
    if (isLoading) return <Loader color="cian" size={50}/>;


    return(
        <Box>
            <Box style={{display:'flex', alignContent: 'center', justifyContent: 'space-between'}}>
                <Link to={'/ads'}>
                <ActionIcon>
                    <IconArrowAutofitLeft />
                </ActionIcon>
                </Link>
                <Title order={1}>{data.title}</Title>
                <Text fw={"bold"} size={rem(30)}><NumberFormatter suffix="₽" value={data.price} thousandSeparator/></Text>
            </Box>
            <Box style={{display:'flex', alignContent: 'center', justifyContent: 'space-between'}}>
                <Link to={Routes.adEdit(id || '')} style={{textDecoration: 'none'}}>
                    <Paper style={{borderRadius: '8px', width: 'fit-content', backgroundColor: '#1890FF', padding: '8px 12px', color: '#FFF'}}>
                        <Text>Редактировать</Text>
                    </Paper>
                </Link>
                <Box>
                    <Text>Опубликовано: {formatDate(data.createdAt)}</Text>
                    <Text>Обновлено: {formatDate(data.updatedAt)}</Text>
                </Box>
            </Box>
        </Box>
    )
}