import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAds } from "../api/ads";
import { Loader, Box, Text, Title, Pagination, Center, TextInput, Flex, GridCol, Grid, ScrollArea,Card, Checkbox, Divider, Switch, CheckboxGroup } from "@mantine/core";
import ViewToggle from "../components/ViewToggle";
import { useAppStore } from "../store/useAppStore";
import ToggleThemeIcon from "../components/ToggleThemeIcon";
import GridCard from "../components/GridCard";
import ListCard from "../components/ListCard";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";


export default function AdsListPage() {
    const [ activePage, setPage ] = useState(1);
    const [ search, setSearch ] = useState('');
    const [ category, setCategory ] = useState(''); 
    const limit = 10;
    const [debouncedSearch] = useDebouncedValue(search, 500)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['ads', activePage, debouncedSearch, category],
        queryFn: () => fetchAds({page: activePage, limit, q: debouncedSearch , category}),
        placeholderData: keepPreviousData
    });


    const list = () => ({display: 'flex', flexDirection: 'column', gap: '15px'})
    const grid = () => ({display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 350px))', gap: '25px', justifyContent: 'center' })
    const mode = useAppStore((state) => state.viewMode);

    if (isLoading) return <Loader color="cyan" size={50}/>
    if (isError) return <div style={{color: 'red'}}>Ошибка: {error.message}</div>
    console.log(data.items);
    return (
        <Box>
            
                <Title order={2}>Мои объявления <ToggleThemeIcon /></Title>
                
                <Text>{data.total} объявлений</Text>
                <Flex justify={"space-between"} align={"center"} mt={10} mb={20} gap={5}>    
                    <TextInput 
                    flex={1}

                    placeholder="Поиск..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.currentTarget.value);
                        setPage(1);
                    }}
                    />
                    <ViewToggle />
                </Flex>
                <Grid>
                    <GridCol span={3.5}>
                        <Card
                        shadow="sm"
                        withBorder
                        mih={400}
                        maw={350}
                        miw={200}
                        px={'xl'}
                        >

                            <Text mt={5}>Фильтры</Text>
                            <Text mt={10} mb={5}>Категории</Text>
                            <Checkbox.Group maxSelectedValues={1}>
                                <Checkbox label='Авто' value={'auto'} mt={5} mb={10} onChange={() => setCategory(value)} />
                                <Checkbox label='Электроника' value={'electronics'} mt={5} mb={10} onChange={() => setCategory(value)} />
                                <Checkbox label='Недвижимость' value={'real_estate'} mt={5} mb={10} onChange={() => setCategory(value)} />
                            </Checkbox.Group>
                            <Divider mt={'lg'}/>
                            <Switch
                            mt={'lg'}
                            withThumbIndicator={false}
                            labelPosition="left"
                            label='Только требующие доработок'
                            />

                        </Card>
                    </GridCol>
                    <GridCol span={8.5}>
                        <ScrollArea type="hidden" h='calc(100vh - 218px)'>
                            <Box style={mode === 'grid' ? grid : list}>
                            {data.items.map((ad) => (
                                mode === 'grid' ? <GridCard key={ad.id} ad={ad} /> : <ListCard key={ad.id} ad={ad} />  
                            ))}
                            </Box>
                        </ScrollArea>
                    </GridCol>
                </Grid>
                    <Center mt={'sm'} mb={'sm'}>
                <Pagination
                total={Math.ceil((data.total || 0)/limit)}
                onChange={setPage}
                value={activePage}
                />
                </Center>
        </Box>
    )
}