import { useParams, useNavigate } from "react-router-dom";
import { Routes } from "../constants/routes";
import { useForm } from "@mantine/form";
import { Button, Divider, Group, Loader, NumberInput, Paper, Popover, PopoverDropdown, PopoverTarget, Select, Textarea, TextInput, Title, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { fetchAdById, putAdEdit } from "../api/ads";
import { useEffect, useState } from "react";
import AdditionalAutoSpec from "../components/AdditionalAutoSpec";
import AdditionalElectroSpec from "../components/AdditionalElectroSpec";
import AdditionalEstateSpec from "../components/AdditionalEstateSpec";
import { checkPrice, createDescription } from "../api/aiRequests";

export default function AdEditPage() {
    const { id } = useParams();
    const navigator = useNavigate();


    const form = useForm({
        initialValues: {
            title: '',
            price: 0,
            category: 'auto',
            description: '',
            params: {
                brand:'',
                type: '',
                model: '',
                address: '',
                floor: 1,
                area: 0,
                yearOfManufacture: 2000,
                color: '',
                mileage: 0,
                transmission: '',
                enginePower: 0,
                state: '',
            }
        },
        validate: {
            title: (value) => (value.length < 3 ? 'Название должно быть заполнено' : null),
            price: (value) => (value <= 0 ? 'Цена должна быть больше нуля' : null), 
        }
    });
   
    
    const {data, isLoading, isError, error } = useQuery({
        queryKey: ['ad', id],
        queryFn: () => fetchAdById(id),
        enabled: !!id
    })
    
    const [open, setOpen] = useState(false);
    const [context, setContext] = useState('');

    useEffect(() => {
        if (data) {
            form.setValues({
                title: data.title || '',
                price: data.price || 0,
                category: data.category || 'auto',
                description: data.description || '',
                params: data.params || {brand: '', model: '', color: '', bodywork: '', state: ''}
            })
        }
    }, [data]);

    if (isLoading) return <Loader />
    if (isError) return <div style={{color: 'red'}}>Ошибка: {error.message}</div>


    const getWarningStyle = (fieldName: string) => {
        const value = form.values.params[fieldName];
        if (!value) { 
            return {input: {borderColor: 'orange'}}
        }
        return{};
    }

    const handleSubmit = (values: typeof form.values) => {
        putAdEdit(values, id);
        navigator(Routes.adDetails(id || ''));
    }

    const handleCancel = () => {
        navigator(Routes.adDetails(id || ''))
    };
    const dparam = form.values
     
    return(
        <div>
                <Paper withBorder shadow={'md'} p={30} mt={30} radius={'md'}>
                    <Title order={2} mb={'lg'}>Редактирование объявления</Title>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Select label="Категория" withAsterisk data={[
                            {value: 'auto', label: 'Транспорт'},
                            {value: 'electronics', label: 'Электроника'},
                            {value: 'real_estate', label: 'Недвижимость'}
                        ]} {...form.getInputProps('category')} maw={'256px'}/>
                        <Divider my={"lg"} />
                        <TextInput withAsterisk label="Название" placeholder="Например, велосипед" {...form.getInputProps('title')} mb={"sm"} w={'456px'} />
                        <Divider my={"lg"} />
                        <Group>
                            <NumberInput withAsterisk label="Цена" placeholder="299000" {...form.getInputProps('price')} mb={'md'} hideControls w={'456px'} />
                            <Popover 
                                opened={open}
                                onChange={setOpen}
                                withArrow
                                position='top-start' 
                                >
                            <PopoverTarget><Button size="xs" mt={'xs'} onClick={async () => {
                                if (!open) setOpen(true);
                                const content = await checkPrice(dparam.title, dparam.params.brand, dparam.params.model, dparam.params.type, dparam.params.yearOfManufacture, dparam.params.transmission, dparam.params.mileage, dparam.params.state );
                                setContext(content)}
                                }>
                                    {open ? 'Попробовать ещё' : 'Узнать цену'}
                                </Button>
                                </PopoverTarget>
                        <PopoverDropdown style={{textWrap: 'wrap'}} w={'500px'}>
                            <Text>Ответ AI:</Text>
                            <Text>{context}</Text>
                        </PopoverDropdown>
                        </Popover>
                        </Group>
                        <Divider my={"lg"} />
                        <Title order={3} mb={'lg'} >Характеристики</Title>
                            {/* Динамические поля для категории Автомобилей*/}
                        {form.values.category === 'auto' && AdditionalAutoSpec(form, getWarningStyle)}
                            {/* Динамические поля для категории Техники*/}  
                        {form.values.category === 'electronics' && AdditionalElectroSpec(form, getWarningStyle)}
                            {/* Динамические поля для категории Недвижимости*/}
                        {form.values.category === 'real_estate' && AdditionalEstateSpec(form, getWarningStyle)}
                        <Divider my={"lg"} />
                        <Group>
                        <Textarea label='Описание' w={'456px'} mb={'lg'} {...form.getInputProps('description')} style={{}} rows={5}/>
                        <Button size="xs" onClick={async () => {
                             const data = await createDescription(dparam.title, dparam.params.brand, dparam.params.model, dparam.params.type, dparam.params.yearOfManufacture, dparam.params.transmission, dparam.params.mileage, dparam.params.state, dparam.description);
                             form.setFieldValue('description', data);
                        }}>Придумать описание</Button>        
                        </Group>
                        <Button type="submit"> Сохранить</Button>
                        <Button onClick={handleCancel} w={'100px'} >Отмена</Button>
                    </form>
                </Paper>
        </div>
    )
}