import { Select, TextInput } from "@mantine/core";

export default function AdditionalElectroSpec(form, getWarningStyle) {
    return (
        <>
            <Select label='Тип' data={[
                {value:'phone', label: 'Телефон'},
                {value:'laptop', label: 'Ноутбук'},
                {value:'misc', label: 'Микрофон'}
            ]} withAsterisk {...form.getInputProps('params.type')}  maw={'456px'} />
            <TextInput label='Бренд' placeholder="Например, Ноутбук" {...form.getInputProps('params.brand')} styles={getWarningStyle('brand')}  maw={'456px'} />
            <TextInput label='Модель' placeholder="Например, 3310-C" {...form.getInputProps('params.model')}  styles={getWarningStyle('model')}  maw={'456px'} />
            <Select label='Состояние' data={[
                {value:'new', label: 'Новый'},
                {value:'used', label: 'б/у'}
            ]} {...form.getInputProps('params.condition')} styles={getWarningStyle('condition')}  maw={'456px'} />
            <TextInput label='Цвет' placeholder="Например, зелёный" {...form.getInputProps('params.color')} styles={getWarningStyle('color')}  maw={'456px'} />                        
        </>
    )
}